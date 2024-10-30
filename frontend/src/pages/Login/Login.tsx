
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cookie from 'js-cookie';
import image from '../../assets/images_ufc/foto_da_ufc.png';

import { fetchLogin } from '../../services/apiService';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetchLogin(email, password);
      
      console.log(response);
      if(response){
        cookie.set('auth', response.token, { expires: 1 });
        window.location.href = '/dashboard';
      }

    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
    <div style={{backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',}}>
      <Container className="d-flex align-items-center justify-content-center" style={{
        minHeight: 'calc(100vh - 62px)' 
      }}>
        <Card style={{ width: '42rem', padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Card.Body className="text-center" style={{ width: '36rem', padding: '20px' }}>
            <Card.Title style={{ paddingBottom: '23px' }}>Login</Card.Title>
            <Form onSubmit={handleLogin} style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
              <Form.Group controlId="formBasicEmail" >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" style={{marginTop:'50px'}} >
                Login
              </Button>
            </Form>
            <p>
              Esqueceu sua senha? <Link to="/recuperar-senha">Clique aqui</Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
      </div>
      
    </>
  );
}

export default Login;
