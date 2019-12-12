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



### Register your organization
1. Create a new organization and select the Sovrin Staging Network if you are using iOS, and the BCovrin Test network if you are using the Mattr global app.
1. In the .env file, add your organization's subscription key and access token to the respective fields.

#### If you are using the Mattr Global Agent on Android:
Add a transaction endorser on the BCovrin Test network by registering your did and verkey on the BCovrin network: http://test.bcovrin.vonx.io/
Here are 32 ascii characters, replace some characters to make it unique.
    `00000000000000000000000000000000`
    
### Create a credential definition with Swaggerhub
1. Click on your organization's Show Keys button

    <img src="assets/orgsview.png"
        alt="Organizations"
        style="padding-top: 20px; padding-bottom: 20px" 
        width="600"
        height="480"/>

1. Navigate to the <a href="https://app.swaggerhub.com/apis-docs/Streetcred/agency/v1#/Definitions/CreateCredentialDefinitionForSchemaId" target="_blank">`POST /definitions/credentials/{SchemaId}` </a>endpoint
1. Click the lock button on the right hand side and authorize swaggerhub by pasting "bearer " + your access token in the access token field & your subscription key into its field
1. Click the `Try it out` button to prepare the API call to write the credential definition to the ledger
1. In the .env file, find the ledger you're using and remove the `#` from before that SCHEMA_ID line
1. Copy that schema ID into the `schema_id` field in swagger hub

    <img src="assets/postview.png"
        alt="Organizations"
        style="padding-top: 20px; padding-bottom: 20px" 
        width="850"
        height="440"/>

1. Click "execute" and after a couple seconds you will see "curl", "request URL", and "server response".  Copy the `definitionId` value from the "server response" section and add it to your .env file for the CRED_DEF_ID value

    <img src="assets/ideview.png"
        alt="Organizations"
        style="padding-top: 20px; padding-bottom: 20px" 
        width="600"
        height="340"/>

1. If you get a 504 Gateway Timeout error, go to the [GET /definitions/credentials](https://app.swaggerhub.com/apis-docs/Streetcred/agency/v1#/Definitions/ListCredentialDefinitions) endpoint, click `try it out` and then `execute` to get your newly minted credential definition
 
### Running the application
Assuming everything still works correctly, you are ready to run the application. 

- Run with npm
`npm run start`

- On the web app, fill in the details and click issue credential

    <img src="assets/credentialview.png"
        alt="Organizations"
        style="padding-top: 20px; padding-bottom: 20px" 
        width="1000"
        height="300"/>

- If you're using the Streetcred Wallet, make sure your agent is configured to the Sovrin Staging network (upper-left on the home tab)

- Scan the QR with your mobile wallet

    <img src="assets/qrcodeview.png"
        alt="Organizations"
        style="padding-top: 20px; padding-bottom: 20px" 
        width="400"
        height="340"/>

This is a connection invitation. Webhooks will automatically issue you a credential once this is scanned

- Accept the credential offer

- Receive a business card! 

- If you are on iOS, you can also use the Streetcred Identity Agent to connect with others and send verified email and phone number between each other


> Contact <support@streetcred.com> for any questions. 


 
