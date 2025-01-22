import React, { useState } from 'react';
import BaseBoard from './BaseBoard';
import '../css/DiscountProduct.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserNavbar from './UserNavbar';
import { useNavigate } from 'react-router-dom';
import api from "../servico/App";
import profile from './Profiles';
import Checker from './Checker';

const DiscountProduct = () => {

    const navigate = useNavigate()
    const [id, setId] = useState()
    const [amount, setAmount] = useState()

    const DescontarProduto = async (e) => {
        e.preventDefault()
        const dataAtual = new Date();
        const dia = dataAtual.getDate();
        const mes = dataAtual.getMonth() + 1;
        const ano = dataAtual.getFullYear();

        try {
            const response = await api.get(`/api/produtos/${id}`)
            await api.post("/api/movimentacaos", {
                id_estoque: profile.getStorageId(), 
                id_prod: id,
                data: `${dia}/${mes}/${ano}`,
                quantidadeMovi: amount,
                valorTotal: amount * response.data.valorVenda,
                operacao: 0,
            });

            alert("Produto descontado com sucesso!");
            navigate("/usuario")
        } catch (err) {
            console.error("Erro ao Descontar Produto: ", err);
            alert(err.response.data.error);
        }
    }

    return (

        <div className='DiscountProductBody'>
            <Checker/>
            <UserNavbar />
            <div className='form'>
                <Form onSubmit={DescontarProduto}>
                    <Form.Group className="mb-3" controlId="Id" value={id} onChange={(e) => setId(e.target.value)} name='Id'>
                        <Form.Label>Insira o seu nome Id do produto</Form.Label>
                        <Form.Control type="text" placeholder="1" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} name='amount'>
                        <Form.Label>Insira a Quantidade a ser removida</Form.Label>
                        <Form.Control type='number' placeholder="130" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Descontar
                    </Button>
                </Form>
            </div>
            <BaseBoard></BaseBoard>
        </div>
    );
};

export default DiscountProduct;