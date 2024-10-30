import React, { useEffect, useState } from "react";
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import "./AdicionarSurveyForm.css";
import { SurveyForm } from "../../interfaces/SurveysInterface";
import {
  fetchAdicionarUmaPesquisa, fetchIsAuthenticated,
} from "../../services/apiService";

function AdicionarSurveyForm() {
  const initialValues: SurveyForm = {
    linkSurvey: "",
    linkSheet: "",
    surveyType: "NewEgresso",
    courseName: "Engenharia de Software",
    textEmail: "",
    dateSent: "",
    dateEnd: "",
  };

  const [surveyData, setSurveyData] = useState<SurveyForm>({ ...initialValues });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const response = async () => {
      await fetchIsAuthenticated();
    }

    return () => {
      response();
    }
  }, []);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    // Verifica se os campos obrigatórios estão preenchidos
    if (!surveyData.linkSurvey) {
      errors.linkSurvey = "O link do formulário/survey é obrigatório.";
    }
    if (!surveyData.linkSheet) {
      errors.linkSheet = "O link da planilha é obrigatório.";
    }
    if (!surveyData.dateSent) {
      errors.dateSent = "A data de envio é obrigatória.";
    }
    if (!surveyData.dateEnd) {
      errors.dateEnd = "A data final é obrigatória.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      (async () => {
        await fetchAdicionarUmaPesquisa(surveyData);
      })();
      setSurveyData({ ...initialValues });
    }
  };

  return (
    <>
      <div className="form-survey" style={{marginTop:'40px'}}>
        <Form onSubmit={handleSubmit}>
          <h4 className="centered-text-with-line-break">
            Enviar Survey para os egressos
          </h4>

          <FormGroup>
            <FormLabel>
              *Link do Formulário/Survey:
              <FormControl
                type="text"
                value={surveyData.linkSurvey}
                onChange={(e) =>
                  setSurveyData({ ...surveyData, linkSurvey: e.target.value })
                }
                required
              />
              <p className="error-message">{formErrors.linkSurvey}</p>
            </FormLabel>
          </FormGroup>

          <FormGroup>
            <FormLabel>
              *Link da Planilha:
              <FormControl
                type="text"
                value={surveyData.linkSheet}
                onChange={(e) =>
                  setSurveyData({ ...surveyData, linkSheet: e.target.value })
                }
                required
              />
              <p className="error-message">{formErrors.linkSheet}</p>
            </FormLabel>
          </FormGroup>

          <FormGroup>
            <FormLabel>
              *Tipo de Avaliação:
              <FormControl
                as="select"
                value={surveyData.surveyType}
                onChange={(e) =>
                  setSurveyData({ ...surveyData, surveyType: e.target.value })
                }
              >
                <option value="NewEgresso">NewEgresso</option>
                <option value="UpdateEgresso">UpdateEgresso</option>
              </FormControl>
            </FormLabel>
          </FormGroup>

          <FormGroup>
            <FormLabel>
              *Nome do Curso:
              <FormControl
                as="select"
                value={surveyData.courseName}
                onChange={(e) =>
                  setSurveyData({ ...surveyData, courseName: e.target.value })
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
              </FormControl>
            </FormLabel>
          </FormGroup>

          <FormGroup>
            <FormLabel>
              *Texto do Email:
              <br />
              <FormControl
                as="textarea"
                value={surveyData.textEmail}
                onChange={(e) =>
                  setSurveyData({ ...surveyData, textEmail: e.target.value })
                }
                required
                style={{ resize: 'none', height:'90px'}}/>
            </FormLabel>
          </FormGroup>

          <FormGroup>
            <FormLabel>
              *Data de Envio:
              <FormControl
                type="text"
                value={surveyData.dateSent}
                onChange={(e) =>
                  setSurveyData({ ...surveyData, dateSent: e.target.value })
                }
                required
              />
              <p className="error-message">{formErrors.dateSent}</p>
            </FormLabel>
          </FormGroup>

          <FormGroup>
            <FormLabel>
              *Data Final:
              <FormControl
                type="text"
                value={surveyData.dateEnd}
                onChange={(e) =>
                  setSurveyData({ ...surveyData, dateEnd: e.target.value })
                }
                required
              />
              <p className="error-message">{formErrors.dateEnd}</p>
            </FormLabel>
          </FormGroup>

          <Button type="submit">Adicionar Pesquisa</Button>
        </Form>
      </div>
    </>
  );
}

export default AdicionarSurveyForm;
