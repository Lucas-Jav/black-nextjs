import connectDB from "@/db/db";
//@ts-ignore
export default async function handler(req, res) {
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
            res.status(405).json({ message: 'Método não permitido' });
        }

    } catch (error) {
        console.error("Erro durante a execução da rota API:", error);

        const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
        
        res.status(500).json({ error: errorMessage});

    } finally {
        await client.close();
    }
}
