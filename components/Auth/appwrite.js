import { Client, Account } from "appwrite";

const client = new Client();
client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("66e283f4001beae4921a");

export const account = new Account(client);
