export interface SurveyListData {
  id: string;
  linkSurvey: string;
  linkSheet: string;
  surveyType: SurveyType;
  courseName: string;
  timeAvailable: number;
  textEmail?: string;
  dateSent: Date;
  dateEnd: Date;
  survey_answered: SurveyAnsweredData[];
}

export interface SurveyAnsweredData {
  id: string;
}

enum SurveyType {
  NewEgresso = "NewEgresso",
  UpdateEgresso = "UpdateEgresso",
}


export interface SurveyForm {
  linkSurvey: string;
  linkSheet: string;
  surveyType: string;
  courseName: string;
  textEmail: string;
  dateSent: string;
  dateEnd: string;
}