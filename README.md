# Streetcred's API Example

## Steps to issue a business card: 
 1. If you are using iOS, download the [streetcred identity agent](https://apps.apple.com/us/app/streetcred-identity-agent/id1475160728)

 1. If you are using android, download the [Mattr Proton Wallet](#)

 1. clone the repository
 `git clone https://github.com/streetcred-id/biz-card-demo`

 1. install the dependencies
 `cd biz-card-demo/`
 
 `npm install .`

 1. Open up the repository in a code editor of your choice

 1. rename the .env-template file to .env

 1. go to the Streetcred <a href="https://developer.streetcred.id" target="_blank">developer portal</a> and create an account

 1. In the Subscriptions tab, create a sandbox subscription.

 1. In the Keys and Secrets tab, add a subscription key. 
    Put your expiration date any time in the future.
 

 1. Paste your subscription key and access token into your .env file 

## Get an issuer seed on an organization
 1. Choose a Sovrin staging net seed with your name by it [google doc](https://docs.google.com/spreadsheets/d/1ZxLmIFy3HDimy9zMv6um_7V9DdHnDP9rP-s-fvNhsgA/edit?ts=5d8e86dd#gid=0)
 
 1. Go to the `My Agency` tab

 
 1. Add the tenant_id to your .env file
 `TENANT_ID="..."`

 1. Create a credential definition with the swaggerhub documents
    - authenticate with your api keys. Make sure to add bearer to the beginning of the subscription key
    - add the schema ID from the .env file to the `id` value
    - change revocation to false
    ```
        {
        "schema_id": "5ZtmDq3BwF7vVLcWTejb3M:2:business card:1.0",
        "name": "string",
        "version": "string",
        "attr_names": [
            "string"
        ],
        "support_revocation": false,
        "max_count": 0,
        "tag": "biz-card"
        }
```
 
- Add the credential definition ID to your .env file

- run the application
`npm run start`

- On the web app, add the fields of the credential

- click issue credential

- scan with your iOS device

- receive your business card


 
