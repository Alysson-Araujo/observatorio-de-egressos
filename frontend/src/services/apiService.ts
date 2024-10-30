import axios from "../config/axios-config"; // Importe o arquivo de configuração
import { SurveyForm, SurveyListData } from "../interfaces/SurveysInterface";
import Cookies from "js-cookie";
import {
  ForgotPassword,
  LoginUser,
  ResetPasswordForm,
} from "../interfaces/UserInterface";
import { AxiosResponse } from "axios";
import * as ax from "axios";
import { EgressoFormData } from "../interfaces/EgressoInterface";

interface DashboardData {
  tokenMetabase: string;
}

async function fetchDashboard() {
  try {
    const response = await axios.get("/home-dashboard");
    const data: DashboardData = response.data;
    return data.tokenMetabase;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
}

async function fetchLogin(email: string, password: string) {
  try {
    const response: AxiosResponse<LoginUser> = await axios.post("/login", {
      email,
      password,
    });

    if (response.status === 400) {
      return alert("Usuário ou senha inválidos!");
    }
    const oneHour = 60 * 60; // 1 hour in seconds
    const now = new Date();
    now.setTime(now.getTime() + oneHour * 1000);
    Cookies.set("auth", response.data.token, { secure: true, expires: now });
    const data = response.data;
    console.log(Cookies.get("auth"));
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
}

async function fetchListSurveys() {
  try {
    const response: AxiosResponse<SurveyListData[]> = await axios.get(
      "/surveys/historico",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth")}`, // Inclui o token de autenticação no cabeçalho
        },
      }
    );

    return response.data;
  } catch (error) {
    if (ax.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.log("Status 401 - Redirecionando para a página de login");
        Cookies.remove("auth");
        window.location.href = "/login";
        return;
      }
      if (error.response?.status === 500) {
        alert("Não foi possível carregar a lista de surveys enviados.");
        return;
      }
    }
    console.error("Erro ao buscar dados da API:", error);
  }
}

async function fetchAdicionarListaEgressos(surveyData: FormData) {
  try {
    const authToken = Cookies.get("auth");
    const response = await axios.post("/egressos/pdf", surveyData, {
      headers: {
        Authorization: `Bearer ${authToken}`, // Inclui o token de autenticação no cabeçalho
      },
    });

    if (response.status === 201) {
      alert("Lista de egressos adicionada com sucesso!");
    }
  } catch (error) {
    if (ax.isAxiosError(error)) {
      if (error.response?.status === 401) {
        alert(
          "Você não tem permissão para adicionar egressos! Faça login novamente."
        );
        console.log("Status 401 - Redirecionando para a página de login");
        Cookies.remove("auth");
        window.location.href = "/login";
        return;
      }
      if (error.response?.status === 500) {
        alert("Erro ao adicionar e enviar o survey!");
        return;
      }
    }
  }
}

async function fetchAdicionarUmEgresso(formData: EgressoFormData) {
  try {
    const authToken = Cookies.get("auth");
    const response = await axios.post("/egressos", formData, {
      headers: {
        Authorization: `Bearer ${authToken}`, // Inclui o token de autenticação no cabeçalho
      },
    });

    if (response.status === 201) {
      alert("Egresso adicionado com sucesso!");
    }
  } catch (error) {
    if (ax.isAxiosError(error)) {
      console.log(error.response?.status);
      if (error.response?.status === 401) {
        alert(
          "Você não tem permissão para adicionar egressos! Faça login novamente."
        );
        console.log("Status 401 - Redirecionando para a página de login");
        Cookies.remove("auth");
        window.location.href = "/login";
        return;
      }
      if (error.response?.status === 500) {
        alert("Erro ao adicionar e enviar o survey!");
        return;
      }
    }
  }
}

//Ainda não implementado no backend
async function fetchLogout() {
  try {
    const response = await axios.post("/logout");
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
}

async function fetchRecuperarSenha(formForgotPassword: ForgotPassword) {
  try {
    const response = await axios.post("/forgot-password", formForgotPassword);
    console.log(response.data);
    if (response.status === 200) {
      alert(
        "Um email foi enviado para você com o link para redefinir sua senha!"
      );
      return true;
    } else return false;
  } catch (error) {
    if (ax.isAxiosError(error)) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      if (error.response?.status === 500) {
        alert("Não foi possível enviar o email de recuperação de senha!");
        return false;
      }
    }
  }
}

async function fetchAlterarSenha(
  token: string,
  resetPasswordForm: ResetPasswordForm
) {
  try {
    const response = await axios.post(
      `/reset-password/:${token}`,
      resetPasswordForm
    );

    const data = response.data;
    if (response.status === 200) {
      return true;
    } else return false;
    console.log(data);
  } catch (error) {
    if (ax.isAxiosError(error)) {
      if (error.response?.status === 500) {
        alert("Não foi possível alterar a senha!");
        return false;
      }
    }
  }
}

async function fetchAdicionarUmaPesquisa(surveyData: SurveyForm) {
  try {
    const authToken = Cookies.get("auth");
    const response: AxiosResponse<SurveyForm> = await axios.post(
      "/surveys",
      surveyData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Inclui o token de autenticação no cabeçalho
        },
      }
    );

    if (response.status === 201) {
      alert("O egresso foi adicionado com sucesso!");
    }
  } catch (error) {
    if (ax.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.log("Status 401 - Redirecionando para a página de login");
        Cookies.remove("auth");
        window.location.href = "/login";
        return;
      }
      if (error.response?.status === 400) {
        console.log("Status 400 - Redirecionando para a página de login");

        window.location.href = "/login";
        return;
      }
      if (error.response?.status === 500) {
        alert("Erro ao adicionar e enviar o survey!");
        return;
      }
    }
    console.error("Erro ao enviar os dados via requisição:", error);
  }
}

async function fetchIsAuthenticated(): Promise<boolean> {
  try {
    const response = await axios.get("/isauthenticated", {
      headers: {
        Authorization: `Bearer ${Cookies.get("auth")}`,
      },
    });

    if (response.status === 200) {
      return true;
    } else {
      throw new Error("Falha na autenticação"); // Lança um erro em vez de retornar false
    }
  } catch (error) {
    if (ax.isAxiosError(error)) {
      if (error.response?.status === 500) {
        alert("Serviço indisponível");
        throw new Error("Erro interno do servidor");
      }
      if (error.response?.status === 401) {
        alert("Você não está autenticado! Faça login novamente.");
        Cookies.remove("auth");
        window.location.href = "/login";
        throw new Error("Não autenticado");
      }
    }
    throw error; // Lança outros erros não tratados
  }
}


export {
  fetchDashboard,
  fetchListSurveys,
  fetchAdicionarListaEgressos,
  fetchAdicionarUmEgresso,
  fetchLogin,
  fetchLogout,
  fetchRecuperarSenha,
  fetchAlterarSenha,
  fetchAdicionarUmaPesquisa,
  fetchIsAuthenticated,
};
