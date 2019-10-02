# Streetcred's API Example

## Steps to issue a business card: 
 1. If you are using iOS, download the [streetcred identity agent](https://apps.apple.com/us/app/streetcred-identity-agent/id1475160728)

 1. If you are using android, download the [Mattr Proton Wallet](#)

 1. clone the repository
 `git clone https://github.com/streetcred-id/biz-card-demo`
 
 - navigate into the directory
 `cd biz-card-demo`
 
 - install the dependencies
 `npm install .`

 1. Open up the repository in a code editor of your choice

 1. rename the .env-template file to .env

 1. go to the Streetcred <a href="https://developer.streetcred.id" target="_blank">developer portal</a> and create an account

 - In the Keys and Secrets tab, add a subscription key
 
 - Copy your access token & subscription key by using the copy icon to the left of the keys
 
 - Paste your access token & subscription key into your .env file

- From the developer portal, click the "API Reference" link on the upper-right of the toolbar

- Click the "Authorize" button and paste "bearer" + your access token in the access token field & your subscription key into its field to gain access to the API

- Back in the developer portal, go to the "My Agency" tab 

- Register a new organization
 - add details for seed here

## Get an issuer seed on an organization
 1. Choose a Sovrin staging net seed with your name by it [google doc](https://docs.google.com/spreadsheets/d/1ZxLmIFy3HDimy9zMv6um_7V9DdHnDP9rP-s-fvNhsgA/edit?ts=5d8e86dd#gid=0)
 
 1. Go to the `My Agency` tab

- Create a credential definition with the swaggerhub documents
 - paste the tenant_id into the first field "X-Streetcred-Tenant-Id" 
 - in the next field "credentialDefinitionParameters" add the schema ID from the .env file to the `schema_id` value
 - change revocation to false
 - click "execute"
 
- Once the code has executed, you will see "curl", "request URL", and "server response" - copy the `id` value from that section and add it to your .env file for the CRED_DEF_ID value

- run the application
`npm run start`

- On the web app, add the fields of the credential

- click issue credential

- scan with your iOS device

- receive your business card


 
