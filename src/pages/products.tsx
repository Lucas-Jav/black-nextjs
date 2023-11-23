import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { ReactNode, useState } from 'react'
import { Button, Container, FormFeedback, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Header from '../components/Header'
import ProductsList from '../components/ProductsList'
import { createProduct, fetchProducts, ProductType } from '../services/products'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { maskMoney } from '@/utils/MasksOutputs'
import { convertPriceStringToNumber } from '@/utils/RemoveMasks'

export const getStaticProps: GetStaticProps = async () => {
    const products = await fetchProducts()
    return { props: { products } }
}

const Products: NextPage = (props: {
    children?: ReactNode;
    products?: ProductType[];
}) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const methods = useForm({
        defaultValues: {
            name: "",
            price: 0,
            description: "",
            quantity: 0,
            img: ""
        }
    })

    const {control, handleSubmit, watch} = methods;


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
        const product = await createProduct(data);
        toggle()
        window.location.reload();
    }
    return (
        <>
            <Head>
                <title>Nossos Produtos</title>
                <meta name="description" content="Conheça todos os nossos produtos" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main>
                <Container className="mb-5">
                <h1 className="my-5">
                    Nossos Produtos
                </h1>

                {<ProductsList products={props.products!} />}
    
                    <Button style={{marginLeft: "auto", marginRight: "0", display: "block"}} color="primary" onClick={toggle}>
                        Criar produto
                    </Button>
                    <Modal isOpen={modal} toggle={toggle}>
                        <FormProvider {...methods}>
                            <ModalHeader toggle={toggle}>Criar produto</ModalHeader>
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
                                Adicionar produto
                            </Button>{' '}
                        
                        </ModalFooter>
                    </FormProvider>
                    </Modal>
                </Container>
            </main>
        </>
    )
}

export default Products;