import { ServiceClientCredentials, WebResource, ServiceClientOptions } from "@azure/ms-rest-js";
import { CredentialsServiceClientOptions } from "./credentials/models"
import { WalletServiceClientOptions } from "./wallet/models"
import { ProviderServiceClientOptions } from "./provider/models"

export class TrinsicCredentialsClientOptions implements CredentialsServiceClientOptions {
    noRetryPolicy?: boolean;
    baseUri?: string;
}

export class TrinsicWalletClientOptions implements WalletServiceClientOptions {
    noRetryPolicy?: boolean
    baseUri?: string;
}

export class TrinsicProviderClientOptions implements ProviderServiceClientOptions {
    noRetryPolicy?: boolean
    baseUri?: string;
}

export class TrinsicClientCredentials implements ServiceClientCredentials {
    accessToken: string

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    signRequest(webResource: WebResource): Promise<WebResource> {
        webResource.headers.set("Authorization", `Bearer ${this.accessToken}`);
        return Promise.resolve(webResource);
    }
}

export class TrinsicProviderCredentials implements ServiceClientCredentials {
    providerKey: string

    constructor(providerKey: string) {
        this.providerKey = providerKey;
    }

    signRequest(webResource: WebResource): Promise<WebResource> {
        webResource.headers.set("Authorization", `Bearer ${this.providerKey}`);
        return Promise.resolve(webResource);
    }
}