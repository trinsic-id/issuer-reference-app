const express = require('express');
const router = express.Router();
const cors = require('cors');
const { AgencyServiceClient, Credentials } = require("@streetcred.id/service-clients");
const cache = require('../model');
require('dotenv').config();

const client = new AgencyServiceClient(
    new Credentials(process.env.ACCESSTOK, process.env.SUBKEY),
    { noRetryPolicy: true });

const getInvite = async () => {
  try {
    return await client.createConnection({ connectionInvitationParameters: {} });
  } catch (e) {
    console.log(e.message || e.toString());
  }
}

router.post('/issue', cors(), async function (req, res) {
  const invite = await getInvite();
  const attribs = JSON.stringify(req.body);

  cache.add(invite.connectionId, attribs);
  res.status(200).send({ invite_url: invite.invitation });
});

module.exports = router;
