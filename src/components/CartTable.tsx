// src/components/CartTable.tsx

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import { useCart } from "../hooks/useCart";
import { ProductType } from "../services/products";
import { maskMoney } from "@/utils/MasksOutputs";

type CartEntry = {
    product: ProductType
    quantity: number
}

const CartTableRow = (props: {
    entry: CartEntry
}) => {
    const { addProduct, removeProduct } = useCart()

    return (
        <tr>
            <td>
                <Row className="align-items-center gap-3">
                    <Col xs={4} md={2} lg={1}>
                        <Image
                        src={props.entry.product.img}
                        alt={props.entry.product.name}
                        height={50}
                        width={50}
                        style={{
                            objectFit: "cover"
                        }}
                        />
                    </Col>
                    <Col xs={8} md={10} lg={10}>
                        {props.entry.product.name}
                    </Col>
                </Row>
            </td>
            <td>{maskMoney(props.entry.product.price)}</td>
            <td>{props.entry.quantity}</td>
            <td>{maskMoney((props.entry.product.price * props.entry.quantity))}</td>
            <td>
                <Button
                color="primary"
                size="sm"
                onClick={() => addProduct(props.entry.product)}
                >
                +
                </Button>
                {' '}
                <Button
                color="danger"
                size="sm"
                onClick={() => removeProduct(props.entry.product._id)}
                >
                –
                </Button>
            </td>
        </tr>
    )
}


export default function CartTable() {
    const [cartEntries, setCartEntries] = useState<CartEntry[]>([]);
    const { cart } = useCart();

    useEffect(() => {
        const entriesList = cart.reduce((list, product) => {
            const entryIndex = list.findIndex(entry => entry.product._id === product._id)
    
            if (entryIndex === -1) {
                return [
                    ...list,
                    {
                    product,
                    quantity: 1
                    }
                ]
            }
    
            list[entryIndex].quantity++
            return list
    
        }, [] as CartEntry[])
    
        setCartEntries(entriesList)
    
    }, [cart])
    
    return (
        <Table responsive className="align-middle" style={{ minWidth: '32rem' }}>
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Qtd.</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                    {cartEntries.map(entry => <CartTableRow key={entry.product._id} entry={entry} />)}
            </tbody>
        </Table>
    )
}