require('dotenv').config();

const AgencyServiceClient = require("@streetcred.id/service-clients").AgencyServiceClient;
const Credentials = require("@streetcred.id/service-clients").Credentials;
const client = new AgencyServiceClient(new Credentials(process.env.ACCESSTOK, process.env.SUBKEY));

async function createCredDef(tenant_id) {
    var credDef = client.createCredentialDefinition(tenant_id, {
        credentialDefinitionParameters: {
            schemaID: process.env.SCHEMA_ID,
            supportRevocation: false,
            maxCount: 0,
            tag: "2"
        }
    })   
}

createCredDef(process.env.TENANT_ID);