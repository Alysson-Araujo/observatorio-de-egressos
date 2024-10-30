import * as readline from "readline";
import * as fs from "fs";
import { Egresso } from "../interfaces/egressoInterface";

const regexEmail = /^\S+@\S+\.\S+$/;
const regexAnoDeIngresso = /\b\d{4}\.[12]\b/g;
const blockWords = [/SIGAA Sistema Integrado de Gestão de Atividades Acadêmicas.*?Matrícula Discente Email/, /Ano-Período de Ingresso:/, /discente\(s\) encontrado\(s\) SIGAA Copyright Superintendência de Tecnologia da Informação UFC si3asprd02.ufc.br/];
const regexData = /\d{2}\/\d{2}\/\d{4},/g


export function countWordOccurrencesInFile(
    filePath: string,
  ): Promise<Egresso[]> {
    return new Promise((resolve, reject) => {

      const listEgressos:Egresso[] = [];

      const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: process.stdout,
        terminal: false,
      });
    
    let currentMatricula = '';
    let currentNome = '';
    let currentEmail = '';
    let currentAnoIngresso = "";

  
      rl.on("line", (line: string) => {
        
        if (regexAnoDeIngresso.test(line.trim())) {
            currentAnoIngresso = line.trim();
            console.log(currentAnoIngresso)
        }
        if (/^\d{6}$/.test(line.trim())) {
            if (currentMatricula) {
                listEgressos.push({ matricula: currentMatricula.trim(), name: currentNome.trim(), email: currentEmail.trim(), year_of_entry: currentAnoIngresso.trim(), course: "" });
            }
            currentMatricula = line.trim();
            currentNome = '';
            currentEmail = '';
          } else if (/[a-zA-Z]/.test(line) && !regexEmail.test(line)) {
            currentNome += ` ${line.trim()}`;
            for (const regex of blockWords) {
                if (regex.test(currentNome)) {
                    currentNome = currentNome.replace(regex, '');
                }
            }
          } else if (regexEmail.test(line)) {
            currentEmail = line.trim().replace(regexData, "");
          }

      });
  
      // Configurar um evento para quando o arquivo for completamente lido
      rl.on("close", () => {
        if (currentMatricula) {
          // Certifique-se de adicionar a última entrada à lista se o arquivo terminar com uma entrada
          listEgressos.push({ matricula: currentMatricula.trim(), name: currentNome.trim(), email: currentEmail.trim(), year_of_entry: currentAnoIngresso.trim(), course: "" });
        }
        resolve(listEgressos);
      });
      // Lidar com erros de leitura de arquivo
      rl.on("error", (error) => {
        reject(error);
      });
    });
  }

// Exemplo de uso da função
const filePath = "./dados.txt";
const regex = /\b\d{4}[0-9][12]\b/g;
