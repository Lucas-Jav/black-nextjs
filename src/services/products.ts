

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
        const products: ProductType[] = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/products`).then(res => res.json())
        console.log('Products:');
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export const fetchProduct = async (id: string | number) => {
    try {
        const product: ProductType = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/product/${id}`).then(res => res.json())
        console.log('Product:', product);
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
        console.log('Produto criado:', createdProduct);

        return createdProduct;
    } catch (error) {
        console.error('Erro ao criar o produto:', error);
        throw error;
    }
};
