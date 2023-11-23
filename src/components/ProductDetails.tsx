// src/components/ProductDetails.tsx

import Image from "next/image";
import React, { useState } from "react";
import { Button, Col, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { ProductType, deleteProduct, updateProduct } from "../services/products";
import SuccessToast from "./SuccessToast";
import { useCart } from "@/hooks/useCart";
import { maskMoney } from "@/utils/MasksOutputs";
import { useRouter } from "next/router";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { convertPriceStringToNumber } from "@/utils/RemoveMasks";

type ProductDetailsProps = {
    product: ProductType;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const [toastIsOpen, setToastIsOpen] = useState(false);
    const {cart, addProduct, removeProduct} = useCart();
    const [modal, setModal] = useState(false);

    const router = useRouter();

    const deleteProductWithId = async (id: any) => {
        await deleteProduct(id)
        router.push("/products");
    }

    const toggle = () => setModal(!modal);

    const methods = useForm({
        defaultValues: {
            name: product.name,
            price: product.price,
            description: product.description,
            quantity: product.quantity,
            img: product.img
        }
    })

    const {control, handleSubmit, watch} = methods;
    const {img} = watch()


    const convertToBase64 = async (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
        
            reader.onload = function (e) {
                const base64Content = e.target.result.split(',')[1];
                resolve(base64Content);
            };
        
            reader.onerror = function (error) {
                reject(error);
            };
        

            reader.readAsDataURL(file);
        });
    };

    const onSubmit = async (data: {
        name: string;
        price: number;
        description: string;
        quantity: number;
        img: string;
    }) => {
        try {
            await updateProduct( product._id,data)
            toggle();
            router.reload();
        } catch(err) {
            console.error(err)
        }
    }
    return (
        <Row>
            <Col lg={6}>
                <Image
                src={product.img}
                alt={product.name}
                height={500}
                style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "auto"
                }}
                width={600}
                />
            </Col>

            <Col lg={6}>
                <h1>{product.name}</h1>

                <h2 className="text-muted">{maskMoney(product.price)}</h2>

                <p className="my-3">
                <span className="d-block font-weight-bold">Descrição:</span>
                {product.description}
                </p>

                <p className="text-muted">Em estoque: {product.quantity}</p>

                <Button 
                    color="dark" 
                    className="my-3 pb-2"
                    onClick={() => {
                        addProduct(product)
                        setToastIsOpen(true)
                        setTimeout(() => setToastIsOpen(false), 1000 * 3)
                    }}>
                Compre agora
                </Button>
                <div>
                    <Button style={{width: "max-content", height: "max-content"}}  color="primary" onClick={toggle}>
                            Editar produto
                    </Button>
                    <Button
                        color="danger"
                        className="my-3 pb-2 mx-2"

                        onClick={ () => {
                            deleteProductWithId(product._id)
                        }}
                        >
                            EXCLUIR PRODUTO
                    </Button>
                </div>

                <SuccessToast
                toastIsOpen={toastIsOpen}
                setToastIsOpen={setToastIsOpen}
                />
            </Col>
            <Modal isOpen={modal} toggle={toggle}>
                <FormProvider {...methods}>
                    <ModalHeader toggle={toggle}>Editar produto</ModalHeader>
                    <ModalBody>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormGroup>
                                    <Label for="name">
                                        Nome do produto
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="ex: pc gamer"
                                        type="text"
                                        value={value}
                                        onChange={onChange}
                                    />
                                </FormGroup>
                            )}
                        />

                        <Controller
                            name="description"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormGroup>
                                    <Label for="exampleText">
                                        Descrição do produto
                                    </Label>
                                    <Input
                                        id="exampleText"
                                        name="text"
                                        type="textarea"
                                        value={value}
                                        onChange={onChange}
                                    />
                                    <FormFeedback>
                                        Oh noes! that name is already taken
                                    </FormFeedback>
                                </FormGroup>
                            )}
                        />
                        <Controller
                            name="quantity"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormGroup>
                                    <Label for="exampleText">
                                        Quantos produtos adicionara ao estoque
                                    </Label>
                                    <Input
                                        id="exampleText"
                                        name="text"
                                        type="number"
                                        value={value}
                                        min={1}
                                        max={50}
                                        onChange={onChange}
                                    />
                                </FormGroup>
                            )}
                        />
                        <Controller
                            name="price"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormGroup>
                                    <Label for="exampleText">
                                        Preço de seu produto
                                    </Label>
                                    <Input
                                        id="exampleText"
                                        name="text"
                                        type="text"
                                        value={maskMoney(value)}
                                        onChange={(e) => onChange(convertPriceStringToNumber(e.target.value))}
                                    />
                                </FormGroup>
                            )}
                        />
                        {img && (
                            <Image
                                src={img}
                                alt={product.name}
                                height={200}
                                style={{
                                    objectFit: "cover",
                                    display: "block",
                                    margin: "0 auto",
                                    height: "auto"
                                }}
                                width={200}
                                />
                        )}
                        <Controller
                            name="img"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormGroup>
                                    <Label for="exampleFile">
                                        Imagem do produto
                                    </Label>
                                    <Input
                                        id="exampleFile"
                                        name="file"
                                        type="file"
                                        onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const base64Content = await convertToBase64(file);
                                                onChange(`data:image/jpeg;base64,${base64Content}`);
                                            }
                                        }}
                                    />
                                    
                                </FormGroup>
                            )}
                        />
                        
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit(onSubmit)}>
                        salvar alterações
                    </Button>{' '}
                
                </ModalFooter>
            </FormProvider>
            </Modal>
        </Row>
    );
};

export default ProductDetails;
