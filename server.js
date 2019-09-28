var http = require('http');
var parser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var {createTerminus} = require('@godaddy/terminus');
var express = require('express');
var ngrok = require('ngrok');
var redis = require('redis');

require('dotenv').config();

const AgencyServiceClient = require("@streetcred.id/service-clients").AgencyServiceClient;
const Credentials = require("@streetcred.id/service-clients").Credentials;
const Models = require("@streetcred.id/service-clients").Models;
const client = new AgencyServiceClient(new Credentials(process.env.ACCESSTOK, process.env.SUBKEY));

var app = express();
app.use(cors());
app.use(parser.json());


redisClient = redis.createClient();
redisClient.on("error", function (err) {
    console.log("Error " + err);
});

// WEBHOOK ENDPOINT
app.post('/webhook', async function (req, res) {
    try {
        console.log(req.body);
        if(req.body === null || req.body.data === null)  {
            console.log("request has null values in required params");
            console.log(req.body);
            
        }

        if(req.body.message_type === 'new_connection') {
            var params = 
            {
                credentialOfferParameters: 
                {
                    definitionId: process.env.CRED_DEF_ID, 
                    connectionId: req.body.object_id
                }
            }
            await client.createCredential(process.env.TENANT_ID, params);            
        }
        else if(req.body.message_type === 'credential_request') {
            const connectionId = req.body.data.ConnectionId;
            var param_obj;
            redisClient.get(connectionId, async function (err, result) {
                if(result){
                    console.log("REDIS RES:");
                    console.log(result);
                    param_obj = JSON.parse(result);
                    const params = {
                        values: {
                            "Full Name": param_obj["name"],
                            "Title": param_obj["title"],
                            "Company Name": param_obj["org"],
                            "Phone Number": param_obj["phone"],
                            "Email": param_obj["email"]
                        }
                    }
                    await client.issueCredential(req.body.object_id, process.env.TENANT_ID, params);
                }
            });          
        }
        else {
            console.log("message type not recognized... yet");
        }
    } catch (e) {
        console.log(e.message || e.toString());
    }
});

//FRONTEND ENDPOINT
app.post('/api/issue', cors(), async function (req, res) {
    const invite = await getInvite();
    const attribs = JSON.stringify(req.body);

    redisClient.set(invite.connectionId, attribs);
    res.status(200).send({invite_url: invite.invitationUrl});
});


const getInvite = async () => {
    try {
        var result = await client.createConnection(process.env.TENANT_ID, {
            connectionInvitationParameters: {}
        });
        var invite = await client.getConnection(result.id, process.env.TENANT_ID);
        return invite;

    } catch(e) {
        console.log(e.message || e.toString());
    }
}

// for graceful closing
var server = http.createServer(app);

async function beforeShutdown() {
    var webhookId;
    redisClient.get("webhookId", (err, result) => {
        if (result) {
            webhookId = result;
        }
    });
    await client.removeWebhook(webhookId, "jWBf0we4M6UDccwa2NIlsFfE")
}

createTerminus(server, {
    signal: ['SIGINT', 'SIGTERM'],
    healthChecks: {},
    beforeShutdown
});

const PORT = process.env.PORT || 3002;
var serve = server.listen(PORT, async function() {
    const url_val = await ngrok.connect(PORT);
    var response = await client.createWebhook("jWBf0we4M6UDccwa2NIlsFfE", {
        webhookParameters: {
            url: url_val + "/webhook",  // process.env.NGROK_URL
            type: "Notification"
        }
    });
    redisClient.set("webhookId", response.id);
    console.log('Listening on port %d', server.address().port);
}); 

async function removeWebhooks(tenant_id) {
    const webhooks = client.listWebhooks(tenant_id);

}

