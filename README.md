# Streetcred's API Example

## Steps to issue a business card: 
 - clone the repository
 `git clone https://github.com/streetcred-id/biz-card-demo`
 
 - navigate into the directory
 `cd biz-card-demo`
 
 - install the dependencies
 `npm install .`

 - rename the .env-template file to .env

 - go to the Streetcred [developer portal](https://developer.streetcred.id) and create an account

 - In the Subscriptions tab, create a sandbox subscription

 - In the Keys and Secrets tab, add a subscription key
 
 - Copy your access token & subscription key by using the copy icon to the left of the keys
 
 - Paste your access token & subscription key into your .env file

- From the developer portal, click the "API Reference" link on the upper-right of the toolbar

- Click the "Authorize" button and paste "bearer" + your access token in the access token field & your subscription key into its field to gain access to the API

- Back in the developer portal, go to the "My Agency" tab 

- Register a new organization
 - add details for seed here

- Add the tenant_id to your .env file

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


 
