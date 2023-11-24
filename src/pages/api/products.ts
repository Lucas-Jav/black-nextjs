import connectDB from "@/db/db";
import { WithId, Document, InsertOneResult } from "mongodb";

import Cors from "cors";
import initMiddleware from "@/utils/initmidleware";

const cors = initMiddleware(
    Cors({
        methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PATCH'],
    })
);

export default async function handler(req: { method: string; body: { name: any; price: any; description: any; quantity: any; img: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: WithId<Document>[] | InsertOneResult<Document>): void; new(): any; }; }; }) {
    await cors(req, res);
    const { db, client } = await connectDB();

    try {
        const collection = db.collection("products");

        if (req.method === 'GET') {
            const response = await collection.find().toArray();
            res.status(200).json(response);
        } else if (req.method === 'POST') {
            const { name, price, description, quantity, img } = req.body;
            const result = await collection.insertOne({ name, price, description, quantity, img });
            res.status(201).json(result);
        } else {
            res.status(405)
        }

    } catch (error) {
        console.error("Erro durante a execução da rota API:", error);

        const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
        
        res.status(500)

    } finally {
        await client.close();
    }
}
