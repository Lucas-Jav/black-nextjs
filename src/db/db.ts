import { MongoClient, MongoClientOptions } from "mongodb";

const url = "mongodb://127.0.0.1:27017"
const urlServer = "mongodb+srv://jotaalexandrejas:Q4QkYnuVMf5WxKeE@next.np4dibk.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(urlServer, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as MongoClientOptions);

export default async function connectDB() {
    await client.connect();
    
    const db = client.db("next");
    
    return {db, client};
}


