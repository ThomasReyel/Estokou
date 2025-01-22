import React, { useState } from 'react';
import Navbar from "./Navbar";
import BaseBoard from './BaseBoard';
import '../css/Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import api from '../servico/App';
import Profile from './Profiles';


const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function logarUsuario(e) {
        e.preventDefault();

        try {
            // Aguarda a resposta da API
            const response = await api.get(`/api/usuarios?email=${email}`);
            const usuario = response.data[0];
            // Verifica se o e-mail e senha correspondem
            if (usuario.email === email && usuario.senha === password) {
                Profile.setId(usuario.id);
                Profile.setName(usuario.nome);
                navigate('/usuario');


            } else {
                alert("Email ou senha incorretos");
                console.log(response.data)
                console.log(email)
                console.log(`/api/usuarios?email=${email}`)
            }
        } catch (error) {
            console.error("Erro ao encontrar usuário: ", error);
            alert("Erro ao encontrar usuário");

        }
    }

    return (
        <div className='loginBody'>
            <Navbar />
            <div className='loginForm'>
                <Form onSubmit={logarUsuario}>
                    <Form.Group className="mb-3" controlId="Email" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Insira o email aqui" value={email} onChange={(e) => setEmail(e.target.value)} name='email' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Password" >
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Insira a sua senha aqui" value={password} onChange={(e) => setPassword(e.target.value)} name='password' />
                        <Form.Text className="text-muted">
                            Não compartilhe essa senha com estranhos
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Entrar
                    </Button>
                </Form>
            </div>

            <BaseBoard />
        </div>
    );
};

export default Login;