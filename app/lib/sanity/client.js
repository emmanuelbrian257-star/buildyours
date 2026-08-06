import {createClient, type ClientConfig} from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

const config:ClientConfig={
    projectId:"56y0sr7e",
    dataset:'production',
    apiVersion:"2024-01-01",
    useCdn: false
}

const client=createClient(config);

const adminConfig={
    ...config,
    token: process.env.SANITY_API_TOKEN
}
export const adminClient=createClient(adminConfig)
const builder=imageUrlBuilder(client)

export const urlFor=(source)=>builder.image(source)
export default client;
