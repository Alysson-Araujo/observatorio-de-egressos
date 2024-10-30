import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import "./AdicionarUmNovoEgresso.css";
import { EgressoFormData } from "../../interfaces/EgressoInterface";
import {
  fetchAdicionarUmEgresso,
  fetchIsAuthenticated,
} from "../../services/apiService";

const AdicionarUmNovoEgresso: React.FC = () => {
  const [formData, setFormData] = useState<EgressoFormData>({
    name: "",
    email: "",
    year_of_entry: "",
    year_of_conclusion: "",
    matricula: "",
    course: "Engenharia de Software",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const response = async () => {
      await fetchIsAuthenticated();
    };

    return () => {
      response();
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.name) {
      errors.name = "O nome é obrigatório.";
    }
    if (!formData.email) {
      errors.email = "O email é obrigatório.";
    }
    if (!formData.year_of_entry) {
      errors.year_of_entry = "O ano de ingresso é obrigatório.";
    }
    if (!formData.year_of_conclusion) {
      errors.year_of_conclusion = "O ano de conclusão é obrigatório.";
    }
    if (!formData.matricula) {
      errors.matricula = "A matrícula é obrigatória.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      (async () => {
        await fetchAdicionarUmEgresso(formData);
      })();
      setFormData({
        name: "",
        email: "",
        year_of_entry: "",
        year_of_conclusion: "",
        matricula: "",
        course: "Engenharia de Software",
      });
    }
  };

  return (
    <>
      <div className="form-one-egresso" style={{ minHeight: 'calc(100vh - 62px)'  }}>
        <Form className="form" onSubmit={handleSubmit}>
          <h4 className="centered-text-with-line-break">
            Cadastro de um novo Egresso
          </h4>
          <FormGroup className="form-row">
            <FormLabel className="form-group col" htmlFor="name">*Nome:</FormLabel>
            <FormControl
              className="form-group col"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome do egresso"
              required
            />
            <p className="error-message">{formErrors.name}</p>
          </FormGroup>

          <FormGroup className="form-row">
            <FormLabel className="form-group col" htmlFor="email">*Email:</FormLabel>
            <FormControl
              className="form-group col"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email do egresso"
              required
            />
            <p className="error-message">{formErrors.email}</p>
          </FormGroup>

          <FormGroup className="form-row">
            <FormLabel className="form-group col" htmlFor="year_of_entry">*Ano de Ingresso:</FormLabel>
            <FormControl
              className="form-group col"
              type="text"
              id="year_of_entry"
              name="year_of_entry"
              value={formData.year_of_entry}
              onChange={handleChange}
              placeholder="Ex: 2016.1"
              required
            />
            <p className="error-message">{formErrors.year_of_entry}</p>
          </FormGroup>

          <FormGroup className="form-row">
            <FormLabel className="form-group col" htmlFor="year_of_conclusion">*Ano de Conclusão:</FormLabel>
            <FormControl
              className="form-group col"
              type="text"
              id="year_of_conclusion"
              name="year_of_conclusion"
              value={formData.year_of_conclusion}
              onChange={handleChange}
              placeholder="Ex: 2020.2"
              required
            />
            <p className="error-message">{formErrors.year_of_conclusion}</p>
          </FormGroup>

          <FormGroup className="form-row">
            <FormLabel className="form-group col" htmlFor="matricula">*Matrícula:</FormLabel>
            <FormControl
              className="form-group col"
              type="text"
              id="matricula"
              name="matricula"
              value={formData.matricula}
              onChange={handleChange}
              placeholder="Ex: 999999"
              required
            />
            <p className="error-message">{formErrors.matricula}</p>
          </FormGroup>

          <FormGroup className="form-row">
            <FormLabel className="form-group col">
              *Nome do Curso:
              <Form.Select
                className="form-control"
                as="select"
                value={formData.course}

                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
              >
                <option value="Engenharia de Software">
                  Engenharia de Software
                </option>
                <option value="Ciência da Computação">
                  Ciência da Computação
                </option>
                <option value="Engenharia de Computação">
                  Engenharia de Computação
                </option>
                <option value="Sistemas de Informação">
                  Sistemas de Informação
                </option>
                <option value="Design Digital">Design Digital</option>
                <option value="Redes de Computadores">
                  Redes de Computadores
                </option>
              </Form.Select>
            </FormLabel>
          </FormGroup>

          <Button type="submit">Cadastrar</Button>
        </Form>
      </div>
    </>
  );
};

export default AdicionarUmNovoEgresso;
