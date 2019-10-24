# Streetcred's API Quickstart
This demo shows how to add Streetcred API calls into a nodejs app with our service client. It also shows a webhook implementation can create automated workflows in your app. 

## Use Case
In this simple use case, you control a (very simple) issuer portal for your organization, which can issue a business card to anyone with a mobile wallet in your organization. Once a business card is issued, that holder can do business card verifications to other peers using the Streetcred mobile app. 

## Prerequisites:
- [npm](https://www.npmjs.com/get-npm)
## Install mobile wallet

### iOS
 1. If you are using iOS, download the [streetcred identity agent](https://apps.apple.com/us/app/streetcred-identity-agent/id1475160728)
 
### Android
 1. If you are using Android, download the [Mattr Proton Wallet](https://redir.streetcred.id/lRaAnnBiSkZx)

## Steps to issue a business card: 

### Prepare issuer portal
 1. clone the repository
 `git clone https://github.com/streetcred-id/iiw-demo`
 
 1. navigate into the directory
 `cd iiw-demo`
 
 1. install the dependencies
 `npm install .`

 1. Open up the repository in a code editor of your choice

 1. rename the .env-template file to .env

 1. go to the Streetcred <a href="https://developer.streetcred.id" target="_blank">developer portal</a> and create an account

 1. Add a sandbox subscription

### Add Subscription Keys
 1. In the Keys and Secrets tab, add a subscription key
 
 1. Copy and paste your access token & subscription key into your .env file

### Get an issuer seed on an organization

#### If you are using the Streetcred Identity Agent on iOS:
Choose a Sovrin staging net seed and put your name by it [google doc](https://docs.google.com/spreadsheets/d/1ZxLmIFy3HDimy9zMv6um_7V9DdHnDP9rP-s-fvNhsgA/edit?ts=5d8e86dd#gid=0)
 
#### If you are using the Mattr Global Agent on Android:
Add a transaction endorser on the BCovrin Test network by registeringa 32 byte seed to register your did on the BCovrin network: http://test.bcovrin.vonx.io/
Here are 32 ascii characters, replace some characters to make it unique.
    `00000000000000000000000000000000`

### Register your organization
1. Go to the [`My Agency`](https://developer.streetcred.id/orgs) Tab
1. Create a new organization with the correct network and your seed

### Create a credential definition with Swaggerhub
1. Navigate to the [`POST /credential/definitions`](https://app.swaggerhub.com/apis-docs/Streetcred/agency/v1#/Credentials/CreateCredentialDefinition) endpoint
1. Click the lock button and authorize swaggerhub by pasting "bearer" + your access token in the access token field & your subscription key into its field
1. Click the `Try it out` button to prepare the API call to write the credential definition to the ledger
1. In the next field, add the following credential definition object:
```json
{
  "schema_id": "<- ENTER HERE ->",
  "support_revocation": false,
  "tag": "tag1"
}
```
1. In the .env file, find the ledger you're using and remove the `#` from before that SCHEMA_ID line.
1. Copy that schema ID into the `schema_id` field in swagger hub. 
1. Click "execute" and after a couple seconds you will see "curl", "request URL", and "server response".  Copy the `id` value from the "server response" section and add it to your .env file for the CRED_DEF_ID value
 
### Running the application
Assuming everything still works correctly, you are ready to run the application. 

- Run with npm
`npm run start`

- On the web app, fill in the details and click issue credential

- If you're using the Streetcred Wallet, make sure your agent is configured to the Sovrin Staging network (upper-left on the home tab)

- Scan the QR with your mobile wallet

This is a connection invitation. Webhooks will automatically issue you a credential once this is scanned

- Accept the credential offer

- Receive a business card! 

- If you are on iOS, you can use the Streetcred Identity Agent to connect with others and send verified email and phone number between each other. 


 
