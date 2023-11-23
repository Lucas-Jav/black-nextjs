import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails";
import { ProductType, fetchProduct, fetchProducts } from "@/services/products";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import { Container } from "reactstrap";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params?.id;

    if (typeof id === 'string') {
        try {
            const product = await fetchProduct(id);

            return {
                props: {
                    product
                },
            };
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    }

    return {
        redirect: {
            destination: '/products',
            permanent: false
        },
    };
};


const Product: NextPage = (props: {
    children?: ReactNode;
    product?: ProductType;
}) => {
    return (
        <div>
            <Head>
                <title>{props.product!.name}</title>
                <meta name="description" content={props.product!.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <Container className="mt-5">
                <ProductDetails product={props.product!} />
            </Container>
        </div>
    )
}

export default Product;
