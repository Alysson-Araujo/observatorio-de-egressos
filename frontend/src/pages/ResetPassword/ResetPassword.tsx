import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { ResetPasswordForm } from "../../interfaces/UserInterface";
import { useParams } from 'react-router-dom';
import { fetchAlterarSenha } from "../../services/apiService";

function ResetPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passwordsMatch] = useState(true);
  const { token } = useParams();
  const validationSchema = yup.object({
    password: yup
      .string()
      .min(8, "A senha precisa de no mínimo 8 caracteres.")
      .required("Campo obrigatório."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "As senhas não coincidem.")
      .required("Campo obrigatório."),
  });

  return (
    <div className="reset-password-container">
      <h2>Redefinir senha</h2>
      {isSubmitted ? (
        <p className="success-message">Sua senha foi redefinida com sucesso.</p>
      ) : (
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-control">
              <label htmlFor="password">Nova senha:</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" />
            </div>
            <div className="form-control">
              <label htmlFor="confirmPassword">Confirme a nova senha:</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
              />
              <ErrorMessage name="confirmPassword" />
            </div>
            {!passwordsMatch && (
              <p className="error-message">As senhas não coincidem.</p>
            )}
            <button type="submit">Redefinir senha</button>
          </Form>
        </Formik>
      )}
    </div>
  );

  async function handleSubmit(values: { password: string; confirmPassword: string }) {
    const formResetPassword:ResetPasswordForm = {} as ResetPasswordForm;
    formResetPassword.password = values.password;

    if(token !== undefined){
        const response = await fetchAlterarSenha(token,formResetPassword);
        if(response){
            setIsSubmitted(true);
        }
    }
  }
}

export default ResetPassword;
