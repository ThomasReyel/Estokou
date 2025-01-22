import React, { useEffect, useState } from 'react';
import BaseBoard from './BaseBoard';
import '../css/EditProduct.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserNavbar from './UserNavbar';
import { useNavigate } from 'react-router-dom';
import api from "../servico/App";
import profile from './Profiles';
import Checker from './Checker';

const EditProduct = () => {

    const navigate = useNavigate()
    const [name, setName] = useState()
    const [amount, setAmount] = useState()
    const [purchaseValue, setPurchaseValue] = useState()
    const [saleValue, setSaleValue] = useState()
    const [checkbox, setCheckbox] = useState()

    function handleCheckbox(e) {
        setCheckbox(e.target.checked);
    };

    useEffect(() => {

        const fetchProdutos = async () => {
            try {
                const responseProd = await api.get('/api/produtos/'+profile.getProductId());
                setAmount(responseProd.data.quantidade);
                setName(responseProd.data.nome);
                setPurchaseValue(responseProd.data.valorCompra);
                setSaleValue(responseProd.data.valorVenda);
                setCheckbox(responseProd.data.checkbox);
            } catch (err) {
                console.error("Erro ao buscar produtos: ", err);
            }
        };
        fetchProdutos();
    }, []);

    const AtualizarProduto = async (e) => {
        e.preventDefault()

        try {
            await api.put("/api/produtos/"+profile.getProductId(), {
                nome: name,  // Envia o valor diretamente
                quantidade: amount,
                valorCompra: parseFloat(purchaseValue),
                valorVenda: parseFloat(saleValue),
                fragilidade: checkbox,
            })

            alert("Produto atualizado com sucesso!");
            navigate("/usuario")
        } catch (err) {
            console.error("Erro ao atualizar o Produto: ", err);
            alert("Ocorreu um erro ao atualizar o Produto.");
        }


    }

    return (

        <div className='EditProductBody'>
            <Checker/>
            <UserNavbar />
            <div className='form'>
                <Form onSubmit={AtualizarProduto}>
                    <Form.Group className="mb-3" controlId="Name" >
                        <Form.Label>Insira o seu nome do produto</Form.Label>
                        <Form.Control type="text"  placeholder={name} value={name} onChange={(e) => setName(e.target.value)} name='name'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Amount" >
                        <Form.Label>Insira a Quantidade</Form.Label>
                        <Form.Control type='number' placeholder={amount} value={amount} onChange={(e) => setAmount(e.target.value)} name='amount' />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="PurchaseValue" >
                        <Form.Label>Insira o valor unitário pelo qual o produto foi comprado</Form.Label>
                        <Form.Control type="text" placeholder="120,00" value={purchaseValue} onChange={(e) => setPurchaseValue(e.target.value)} name='purchaseValue'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="SaleValue">
                        <Form.Label>Insira o valor unitário pelo qual ele será vendido</Form.Label>
                        <Form.Control type="text" placeholder="120,00"  value={saleValue} onChange={(e) => setSaleValue(e.target.value)} name='saleValue'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox" >
                        <Form.Check type="checkbox" label="O produto é frágil?" value={checkbox} onChange={handleCheckbox}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Atualizar
                    </Button>
                </Form>
            </div>
            <BaseBoard></BaseBoard>
        </div>
    );
};

export default EditProduct;