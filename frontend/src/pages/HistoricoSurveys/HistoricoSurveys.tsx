import React, { useEffect, useState } from "react";
import SurveyList from "../../components/SurveyList/SurveyList";
import { fetchListSurveys } from "../../services/apiService";
import { SurveyListData } from "../../interfaces/SurveysInterface";


function HistoricoSurveys() {
  const [surveys, setSurveys] = useState<SurveyListData[]>([]); // Estado para armazenar os dados dos surveys



  useEffect(() => {

      const fetchData = async () => {
        const surveysData = await fetchListSurveys();
        if (surveysData) {
          setSurveys(surveysData);
          
        }
      };
      return () => {fetchData();}
    }
  , []);

  if (!surveys) {
    return <div>Carregando...</div>;
  }


  return (
    <>
      <div className="survey-page">

        <h2 style={{marginTop:'70px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >Histórico de Surveys enviados</h2>
        <SurveyList surveys={surveys} />{" "}
        {/* Renderize o componente SurveyList com os dados dos surveys */}
      </div>
    </>
  );
}

export default HistoricoSurveys;
