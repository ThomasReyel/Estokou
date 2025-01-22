import React, { useState } from 'react';
import BaseBoard from './BaseBoard';
import '../css/RegisterProduct.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserNavbar from './UserNavbar';
import { useNavigate } from 'react-router-dom';
import api from "../servico/App";
import profile from './Profiles';
import Checker from './Checker';
import { CheckerStorage } from './Checker'

const RegisterProduct = () => {

    const navigate = useNavigate()
    const [name, setName] = useState()
    const [supplier, setSupplier] = useState()
    const [amount, setAmount] = useState()
    const [purchaseValue, setPurchaseValue] = useState()
    const [saleValue, setSaleValue] = useState()
    const [checkbox, setCheckbox] = useState()

    function handleCheckbox(e) {
        setCheckbox(e.target.checked);
    };

    const CadastrarProduto = async (e) => {
        e.preventDefault()

        const dataAtual = new Date();
        const dia = dataAtual.getDate();
        const mes = dataAtual.getMonth() + 1;
        const ano = dataAtual.getFullYear();
        try {
            const response = await api.post("/api/produtos", {
                nome: name,  // Envia o valor diretamente
                quantidade: amount - amount, // por algum motivo divino ele tava somando 2 vezes, não consegui resolver tive que fazer 
                fornecedor: supplier,
                valorCompra: parseFloat(purchaseValue),
                valorVenda: parseFloat(saleValue),
                fragilidade: checkbox,
            })
            console.log("data:", response.data.quantidade);
            console.log("config:", response.config);
            var location = response.data.location.substring(api.getUri().length);
            var produtoID = ((await api.get(location)).data.id)
            console.log("depois:", amount)
            await api.post("/api/movimentacaos", {
                id_estoque: profile.getStorageId(),  // Envia o valor diretamente
                id_prod: produtoID,
                data: `${dia}/${mes}/${ano}`,
                quantidadeMovi: amount,
                valorTotal: amount * purchaseValue,
                operacao: 1,
            });

            alert("Produto cadastrado com sucesso!");
            navigate("/usuario")
        } catch (err) {
            console.error("Erro ao cadastrar Produto: ", err);
            alert("Ocorreu um erro ao cadastrar o Produto.");
        }

    }

    return (

        <div className='RegisterProductBody'>
            <Checker />
            <CheckerStorage />
            <UserNavbar />
            <div className='form'>
                <Form onSubmit={CadastrarProduto}>
                    <Form.Group className="mb-3" controlId="Name" value={name} onChange={(e) => setName(e.target.value)} name='name'>
                        <Form.Label>Insira o seu nome do produto</Form.Label>
                        <Form.Control type="text" placeholder="Feijão" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Supplier" value={supplier} onChange={(e) => setSupplier(e.target.value)} name='supplier'>
                        <Form.Label>Insira o seu nome do fornecedor</Form.Label>
                        <Form.Control type="text" placeholder="Slup" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} name='amount'>
                        <Form.Label>Insira a Quantidade</Form.Label>
                        <Form.Control type='number' placeholder="130" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="PurchaseValue" value={purchaseValue} onChange={(e) => setPurchaseValue(e.target.value)} name='purchaseValue'>
                        <Form.Label>Insira o valor unitário pelo qual o produto foi comprado</Form.Label>
                        <Form.Control type="text" placeholder="120,00" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="SaleValue" value={saleValue} onChange={(e) => setSaleValue(e.target.value)} name='saleValue'>
                        <Form.Label>Insira o valor unitário pelo qual ele será vendido</Form.Label>
                        <Form.Control type="text" placeholder="120,00" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox" value={checkbox} onChange={handleCheckbox}>
                        <Form.Check type="checkbox" label="O produto é frágil?" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Cadastrar
                    </Button>
                </Form>
            </div>
            <BaseBoard/>
        </div>
    );
};

export default RegisterProduct;