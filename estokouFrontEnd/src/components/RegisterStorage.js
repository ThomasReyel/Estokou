import React, { useState } from 'react';
import BaseBoard from './BaseBoard';
import '../css/RegisterStorage.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserNavbar from './UserNavbar';
import { useNavigate } from 'react-router-dom';
import profile from './Profiles';
import api from "../servico/App";
import Checker from './Checker';


const RegisterStorage = () => {
    const navigate = useNavigate()
    const [name, setName] = useState()

    const CadastrarEstoque = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/api/estoques", {
                nome: name,
                id_usuario: profile.getId(),
            });

            alert("Estoque cadastrado com sucesso!");

            var location = response.data.location.substring(api.getUri().length);
            profile.setStorageName(name);
            profile.setStorageId((await api.get(location)).data.id)
            navigate("/usuario")
        } catch (err) {
            console.error("Erro ao cadastrar Estoque: ", err);
            alert("Ocorreu um erro ao cadastrar o estoque.");
            console.log(name, profile.getId());
        }

    }

    return (

        <div className='RegisterStorageBody'>
            <Checker />
            <UserNavbar />
            <div className='form'>
                <Form onSubmit={CadastrarEstoque}>
                    <Form.Group className="mb-3" controlId="Name" value={name} onChange={(e) => setName(e.target.value)} name='name'>
                        <Form.Label>Insira o seu nome do estoque</Form.Label>
                        <Form.Control type="text" placeholder="Estoque principal" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Cadastrar
                    </Button>
                </Form>
            </div>
            <BaseBoard></BaseBoard>
        </div>
    );
};

export default RegisterStorage;