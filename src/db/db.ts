import { MongoClient, MongoClientOptions } from "mongodb";

const url = "mongodb://127.0.0.1:27017"

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as MongoClientOptions);

export default async function connectDB() {
    await client.connect();
    
    const db = client.db("next");
    
    return {db, client};
}


