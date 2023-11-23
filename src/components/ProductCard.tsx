import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { Button, Card, CardBody, CardSubtitle } from "reactstrap"
import { ProductType } from "../services/products"
import SuccessToast from "./SuccessToast"
import { useCart } from "@/hooks/useCart"
import { maskMoney } from "@/utils/MasksOutputs"

type ProductCardProps = {
    product: ProductType
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [toastIsOpen, setToastIsOpen] = useState(false);
    const { _id, name, img, price } = product;
    const {cart, addProduct, removeProduct} = useCart();

    return (
        <>
            <Card>
                <Link href={`/products/${_id}`}>
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
                            marginTop: 10,
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

                </CardBody>
            </Card>

            <SuccessToast toastIsOpen={toastIsOpen} setToastIsOpen={setToastIsOpen} />
        </>
    )
}

export default ProductCard