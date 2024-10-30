import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import RecuperaraSenha from "./pages/RecuperarSenha/RecuperarSenha";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdicionarUmNovoEgresso from "./pages/AdicionarUmNovoEgresso/AdicionarUmNovoEgresso";
import AdicionarListaEgressos from "./pages/AdicionarListaEgressos/AdicionarListaEgressos";
import HistoricoSurveys from "./pages/HistoricoSurveys/HistoricoSurveys";
import AdicionarSurveyForm from "./pages/AdicionarSurvey/AdicionarSurveyForm";
import ResetPassword from "./pages/ResetPassword/ResetPassword";




export default function RoutesApp() {


  return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-senha" element={<RecuperaraSenha />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Rotas protegidas */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/adicionar-survey"
            element={<AdicionarSurveyForm />}
          />
          <Route
            path="/adicionar-um-novo-egresso"
            element={<AdicionarUmNovoEgresso />}
          />
          <Route
            path="/adicionar-lista-egressos"
            element={<AdicionarListaEgressos />}
          />
          <Route
            path="/historico-surveys"
            element={<HistoricoSurveys />}
          />
        </Routes>

  );
}
