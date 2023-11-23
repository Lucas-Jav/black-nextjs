import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { Button, Card, CardBody, CardSubtitle } from "reactstrap"
import { ProductType, deleteProduct } from "../services/products"
import SuccessToast from "./SuccessToast"
import { useCart } from "@/hooks/useCart"
import { maskMoney } from "@/utils/MasksOutputs"
import { useRouter } from "next/router"

type ProductCardProps = {
    product: ProductType
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [toastIsOpen, setToastIsOpen] = useState(false);
    const { _id, name, img, price } = product;
    const {cart, addProduct, removeProduct} = useCart();
    const router = useRouter();

    const deleteProductWithId = async (id: any) => {
        await deleteProduct(id)
        router.push("/products");
    }

    return (
        <>
            <Card>
                <Link href={`/products/${_id}`} style={{paddingTop: 20}}>
                    <Image 
                        className="card-img-top" 
                        src={img} alt={product.name} 
                        objectFit="cover"  width={300} height={200} 
                        style={{
                            objectFit: "cover",
                            height: 200,
                            width: 250,
                            display: "block",
                            marginLeft: 0,
                            margin: "auto"
                            }}/>
                </Link>
                <CardBody>
                    <Link href={`/products/${_id}`}>
                    <h5 className="card-title" style={{ cursor: 'pointer' }}>
                        {name}
                    </h5>
                    </Link>

                    <CardSubtitle className="mb-3 text-muted" tag="h6">
                    {maskMoney(price)}
                    </CardSubtitle>

                    <Button
                    color="dark"
                    className="pb-2"
                    block
                    onClick={() => {
                        addProduct(product)
                        setToastIsOpen(true)
                        setTimeout(() => setToastIsOpen(false), 1000 * 3)
                    }}
                    >
                    Adicionar ao Carrinho
                    </Button>
                    <Button
                    color="danger"
                    className="pb-2 mt-2"
                    block
                    onClick={ () => {
                        deleteProductWithId(_id)
                    }}
                    >
                        EXCLUIR PRODUTO
                    </Button>

                </CardBody>
            </Card>

            <SuccessToast toastIsOpen={toastIsOpen} setToastIsOpen={setToastIsOpen} />
        </>
    )
}

export default ProductCard