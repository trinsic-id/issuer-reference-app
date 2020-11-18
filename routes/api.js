const express = require('express');
const router = express.Router();
const cors = require('cors');
const { CredentialsServiceClient, Credentials } = require("@trinsic/service-clients");
const cache = require('../model');
require('dotenv').config();

const client = new CredentialsServiceClient(
    new Credentials(process.env.ACCESSTOK),
    { noRetryPolicy: true });

const getInvite = async () => {
  try {
    return await client.createConnection({});
  } catch (e) {
    console.log(e.message || e.toString());
  }
}

router.post('/issue', cors(), async function (req, res) {
  const invite = await getInvite();
  const attribs = JSON.stringify(req.body);

  cache.add(invite.connectionId, attribs);
  res.status(200).send({ invitation: invite.invitationUrl });
});

module.exports = router;