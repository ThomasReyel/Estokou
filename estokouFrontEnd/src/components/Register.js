import React from 'react';
import Navbar from "./Navbar";
import BaseBoard from './BaseBoard';
import '../css/Register.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import api from "../servico/App";
import { useNavigate } from 'react-router-dom';
import profile from './Profiles';
// import SuapLogin from './SuapLogin';


const Register = () => {
    const navigate = useNavigate()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [checkbox, setCheckbox] = useState()

    const CadastrarUsuario = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post("/api/usuarios", {
                nome: name,  // Envia o valor diretamente
                email: email,
                senha: password,
            });

            alert("Usuário cadastrado com sucesso!");

            var location = response.data.location.substring(api.getUri().length);
            profile.setName(name);
            profile.setId((await api.get(location)).data.id)
            navigate("/usuario")
        } catch (err) {
            console.error("Erro ao cadastrar usuário: ", err);
            alert(err.response.data.error);
        }

    }

    function handleCheckbox(e) {
        setCheckbox(e.target.value);
    };


    return (
        <div className='registerBody'>
            <Navbar></Navbar>
            <div className='form'>
                <Form onSubmit={CadastrarUsuario}>
                    <Form.Group className="mb-3" controlId="Email" name='email' onChange={(e) => setEmail(e.target.value)} value={email}>
                        <Form.Label>Insira o seu email</Form.Label>
                        <Form.Control type="email" placeholder="Insira o seu Email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Name" name='name' onChange={(e) => setName(e.target.value)} value={name}>
                        <Form.Label>Insira um Nome</Form.Label>
                        <Form.Control type='text' placeholder="Seu nome" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Password" name='password' onChange={(e) => setPassword(e.target.value)} value={password}>
                        <Form.Label>Crie uma Senha</Form.Label>
                        <Form.Control type="password" placeholder="*******" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Checkbox" value={checkbox} onChange={handleCheckbox}>
                        <Form.Check type="checkbox" label="Eu concordo com os termos que a empresa não escreveu ainda" />
                    </Form.Group>
                    {/* { <SuapLogin/> } */}
                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>


                </Form>
            </div>

            <BaseBoard />

        </div>
    );
};

export default Register;
