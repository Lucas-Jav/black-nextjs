import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/db/db";
import Product from "@/model/products";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { client, db } = await connectDB();

    const { id } = req.query;
    const objectId = new ObjectId(id as string);

    switch (req.method) {
        case 'GET':
            try {
                const collection = db.collection("products");
                const product = await collection.findOne({ _id: objectId });
                if (!product) {
                    return res.status(404).json({ message: 'Produto não encontrado' });
                }
                res.status(200).json(product);
            } catch (error) {
                console.error('Erro ao obter produto por ID:', error);
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
            break;

        case 'DELETE':
            try {
                const collection = db.collection("products");
                const deleteResult = await collection.deleteOne({ _id: objectId });

                if (deleteResult.deletedCount === 1) {
                    res.status(204).end();
                } else {
                    res.status(404).json({ message: 'Produto não encontrado' });
                }
            } catch (error) {
                console.error('Erro ao excluir produto por ID:', error);
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
            break;

        case 'PATCH':
            try {
                const collection = db.collection("products");
                const { name, price, description, quantity, img } = req.body;
                const updateResult = await collection.updateOne(
                    { _id: objectId },
                    { $set: { name, price, description, quantity, img } }
                );

                if (updateResult.matchedCount === 1) {
                    res.status(200).json({ message: 'Produto atualizado com sucesso' });
                } else {
                    res.status(404).json({ message: 'Produto não encontrado' });
                }
            } catch (error) {
                console.error('Erro ao atualizar produto por ID:', error);
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
            break;

        default:
            res.status(405).json({ message: 'Método não permitido' });
            break;
    }
}
