import nodemailer from "nodemailer";
import {MailAdapterForgotPassword, MailAdapterSendSurveyEgresso} from "./mail-adapter";
import { UserInterface } from "../interfaces/UserInterface";

class NodemailerMailAdapterForgotPassword implements MailAdapterForgotPassword {
  public async sendMail(user: UserInterface, resetPasswordToken: string) {

    

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5c35f113cbfbba",
          pass: "1483d744cb1fa1"
        }
    });

    transporter.sendMail({
        from: '"Equipe Egressos" <8bf1af0b50-f059f5@inbox.mailtrap.io>',
        to: user.email,
        subject: "Redefinição de senha",
        text: `Olá, ${user.name}! Segue o link para realizar a redefinição de sua senha: http://localhost:3000/reset-password/${resetPasswordToken}`,
        html: `<p>Olá, ${user.name}!</p>
        <p>Segue o link para realizar a redefinição de sua senha: http://localhost:3000/reset-password/${resetPasswordToken}</p>`
        
    }).then(message => {
        console.log(message);
    }
    ).catch(err => {
        console.log(err);
    });
  }
}

class NodemailerMailAdapterSendSurveyEgressoNew implements MailAdapterSendSurveyEgresso {
  public async sendMail(linkSurvey:string, emails: string[], textEmail: string){
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5c35f113cbfbba",
          pass: "1483d744cb1fa1"
        }
    });

    transporter.sendMail({
      from: '"Equipe Egressos"  <8bf1af0b50-f059f5@inbox.mailtrap.io>',
      to: emails,
      subject: "Pesquisa de Egressos",
      text: `${textEmail} 
      Segue o link do formulário: ${linkSurvey}`,

  }
    ).then(message => {
        console.log(message);
    }
    ).catch(err => {
        console.log(err);
    });
  }
}

class NodemailerMailAdapterSendSurveyEgressoUpdate implements MailAdapterSendSurveyEgresso {
  public async sendMail(linkSurvey:string, emails: string[], textEmail: string){
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5c35f113cbfbba",
          pass: "1483d744cb1fa1"
        }
    });

    transporter.sendMail({
        from: '"Equipe Egressos"  <8bf1af0b50-f059f5@inbox.mailtrap.io>',
        to: emails,
        subject: "Pesquisa de Egressos",
        text: `${textEmail} 
        Segue o link do formulário: ${linkSurvey}`,

  }
    ).then(message => {
        console.log(message);
    }
    ).catch(err => {
        console.log(err);
    });
  }
}




export { NodemailerMailAdapterForgotPassword, NodemailerMailAdapterSendSurveyEgressoNew, NodemailerMailAdapterSendSurveyEgressoUpdate };