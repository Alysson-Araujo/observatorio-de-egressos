import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./AdicionarListaEgressos.css";
import { fetchAdicionarListaEgressos, fetchIsAuthenticated } from "../../services/apiService"; // Importe a função que você mencionou

function AdicionarListaEgressos() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("Engenharia de Software");
  const [fileError, setFileError] = useState<string>("");

  useEffect(() => {
    const response = async () => {
      await fetchIsAuthenticated();
    }

    return () => {
      response();
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileError(""); // Limpa a mensagem de erro se o arquivo for selecionado
    }
  };

  const handleCourseChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const course = e.target.value;
    setSelectedCourse(course);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setFileError("Você deve selecionar um arquivo.");
      return; // Evita que o formulário seja enviado sem um arquivo selecionado
    }

    // Se chegou até aqui, o arquivo foi selecionado
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("course", selectedCourse);

    try {
      await fetchAdicionarListaEgressos(formData);
      // Limpa o estado para a próxima entrada
      setSelectedFile(null);
      setSelectedCourse("Engenharia de Software");
      setFileError(""); // Limpa a mensagem de erro
    } catch (error) {
      console.error('Erro ao enviar os dados via requisição:', error);
    }
  };

  return (
    <>
      <div className="form-lista-egressos">
        <form onSubmit={handleSubmit}>
          <h4 className="centered-text-with-line-break">
            Formulário de Upload de PDF
          </h4>
          <div>
            <label htmlFor="pdfFile">Documento em PDF com os egressos:</label>
            <input
              type="file"
              id="pdfFile"
              accept=".pdf"
              onChange={handleFileChange}
            />
            <p style={{ color: "red" }}>{fileError}</p>
          </div>

          <div>
            <label htmlFor="course">Selecione o curso de graduação:</label>
            <select
              id="course"
              onChange={handleCourseChange}
              value={selectedCourse}
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
            </select>
          </div>

          <button type="submit">Enviar</button>

          <p style={{ color: "gray" }}>
            O arquivo só pode ser no formato PDF e gerado pelo SIGAA.
          </p>
        </form>
      </div>
    </>
  );
}

export default AdicionarListaEgressos;
