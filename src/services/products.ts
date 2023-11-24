
export interface ProductType {
    _id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
    img: string;
}

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const products: ProductType[] = await response.json();
        console.log('Products:', products);
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export const fetchProduct = async (id: string | number) => {
    try {
        const product: ProductType = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/product/${id}`).then(res => res.json())
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}

export const createProduct = async (productData: any): Promise<ProductType> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });


        const createdProduct: ProductType = await response.json();

        return createdProduct;
    } catch (error) {
        console.error('Erro ao criar o produto:', error);
        throw error;
    }
};

export const deleteProduct = async (productId: string | number): Promise<void> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/product/${productId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir o produto. Status: ${response.status}`);
        }

        console.log('Produto excluído com sucesso');
    } catch (error) {
        console.error('Erro ao excluir o produto:', error);
        throw error;
    }
};

export const updateProduct = async (productId: string | number, updatedData: any): Promise<ProductType> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/product/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            // Se a resposta não estiver no intervalo [200, 299], lança um erro
            throw new Error(`Erro ao atualizar o produto. Status: ${response.status}`);
        }

        const updatedProduct: ProductType = await response.json();
        console.log('Produto atualizado com sucesso:', updatedProduct);

        return updatedProduct;
    } catch (error) {
        console.error('Erro ao atualizar o produto:', error);
        throw error;
    }
};
