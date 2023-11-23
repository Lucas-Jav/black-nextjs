// product/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/db/db";
import Product from "@/model/products";
import { ObjectId } from "mongodb";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {client, db} = await connectDB()


    const { id } = req.query; // Aqui estamos pegando o valor do parâmetro id da URL.
    const objectId = new ObjectId(id as string);

    switch (req.method) {
        case 'GET':
        try {
            const collection = db.collection("products")
            const product = await collection.findOne({_id: objectId});
            if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.status(200).json(product);
        } catch (error) {
            console.error('Erro ao obter produto por ID:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
        break;


        default:
        res.status(405).json({ message: 'Método não permitido' });
        break;
    }
}
