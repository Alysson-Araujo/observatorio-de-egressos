import { UserInterface } from "../interfaces/UserInterface";

export interface SendMailData{
    subject:string;
    body:string;
}

export interface MailAdapterForgotPassword{
    sendMail:(user: UserInterface, resetPasswordToken: string) => Promise<void>;
}

export interface MailAdapterSendSurveyEgresso{
    sendMail:(linkSurvey:string, emails:string[], textEmail: string) => Promise<void>;
}
