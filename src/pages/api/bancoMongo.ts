import connectDB from "@/db/db";
import { MongoClient, MongoClientOptions } from "mongodb"

const url = "mongodb://127.0.0.1:27017"

export default async function handler(req, res) {
    const {client} = await connectDB()

    try {
        await client.connect();
        
        const db =  client.db("next")
        const collection = db.collection("products")

        const response = await collection.find().toArray()

        res.status(200).json(response);

    } catch (error) {
        console.error("Erro durante a execução da rota API:", error);
        res.status(500).json({ error: "Erro interno do servidor" });

    } finally {
        await client.close();
    }
}
