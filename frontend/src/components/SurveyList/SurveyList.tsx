import React, { useState } from "react";
import "./SurveyList.css";
import { SurveyListData } from "../../interfaces/SurveysInterface";
import { parseISO } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

interface SurveyListProps {
  surveys: SurveyListData[];
}

function formatedDate(date: string) {
  const data = new Date(date);
  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

const SurveyList: React.FC<SurveyListProps> = ({ surveys }) => {
  const saoPauloTimeZone = "America/Sao_Paulo"; // Fuso horário de São Paulo
  const [filterType, setFilterType] = useState<string | null>(null);

  const calculateDaysDifference = (startDate: Date, endDate: Date) => {
    const differenceInDays = Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (differenceInDays===0 || differenceInDays===1) return differenceInDays  + " dia"
    else return differenceInDays + " dias";
  };

  const formatDate = (date: Date) => {
    const zonedDate = utcToZonedTime(date, saoPauloTimeZone);

    return formatedDate(
      zonedDate.toISOString().split("T")[0].replace(/-/g, "/")
    );
  };

  const filteredSurveys = surveys
    .filter((survey) => (!filterType || survey.surveyType === filterType));

  return (
    <>
      <div className="survey-list">
        <div className="filter-type">
          <label>
            Filtrar por tipo:
            <select
              onChange={(e) => setFilterType(e.target.value)}
              value={filterType || ""}
            >
              <option value="">Todos</option>
              <option value="NewEgresso">NewEgresso</option>
              <option value="UpdateEgresso">UpdateEgresso</option>
            </select>
          </label>
        </div>
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Link survey</th>
              <th>Quantidade de respostas</th>
              <th>Tempo de disponibilidade do survey</th>
              <th>Data de envio</th>
              <th>Data final</th>
            </tr>
          </thead>
          <tbody>
            {filteredSurveys.map((survey) => (
              <tr key={survey.id}>
                <td>{survey.surveyType}</td>
                <td>
                  <a
                    href={survey.linkSurvey}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir Survey
                  </a>
                </td>
                <td>{survey.survey_answered.length}</td>
                <td>
                  {survey.dateSent && survey.dateEnd
                    ? calculateDaysDifference(
                        zonedTimeToUtc(
                          parseISO(survey.dateSent.toString()),
                          saoPauloTimeZone
                        ),
                        zonedTimeToUtc(
                          parseISO(survey.dateEnd.toString()),
                          saoPauloTimeZone
                        )
                      )
                    : "Data não disponível"}
                </td>
                <td>
                  {survey.dateSent
                    ? formatDate(parseISO(survey.dateSent.toString()))
                    : "Data não disponível"}
                </td>
                <td>
                  {survey.dateEnd
                    ? formatDate(parseISO(survey.dateEnd.toString()))
                    : "Data não disponível"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SurveyList;
