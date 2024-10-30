import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { fetchRecuperarSenha } from "../../services/apiService";
import { ForgotPassword } from "../../interfaces/UserInterface";

const RecuperarSenha: React.FC = () => {
  const [forgotPassword, setforgotPassword] = useState<ForgotPassword>({
    email: "",
    });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetchRecuperarSenha(forgotPassword);
    console.log(response);
    if (response){
        setIsSubmitted(true);
    }
    if(!response){
        setIsSubmitted(false);
    }
    
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Recuperar conta</h2>
          <p className="text-center">
            Digite seu email para recuperar sua conta. Se o email estiver certo, um link para
            alterar a senha será enviado.
          </p>
          {isSubmitted ? (
            <Alert variant="success">Um link de recuperação foi enviado para o seu email.</Alert>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={forgotPassword.email}
                  onChange={(e) => setforgotPassword({ ...forgotPassword, email: e.target.value })}
                  required
                />
              </Form.Group>
              <Button type="submit">Enviar</Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RecuperarSenha;
