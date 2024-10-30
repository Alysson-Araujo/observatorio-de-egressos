import * as pdfjs from "pdfjs-dist";
import fs from "fs";
const pdfUrl = "./tmp/";
import util from "util";
import path from "path";
import { countWordOccurrencesInFile } from "./getEgressos";

const extractTableInfo = (textContent: any) => {
  const text = textContent.items.map((item: any) => item.str).join(" ");

  const tableRows = text.split("\n").map((row: any) => row.split("\t"));
  return tableRows;
};

const caminhoDoArquivo = "./dados.txt";


const writeFileAsync = util.promisify(fs.appendFile); // Transforma a função de escrita em uma versão promissificada

async function PassarDadosNoTxt() {
  try {
    const caminhoFile = getMostRecentFile(pdfUrl)?.file;
    if (caminhoFile) {
      console.log(caminhoFile);
      const pdfDocument = await pdfjs.getDocument(pdfUrl + caminhoFile).promise;
      const numPages = pdfDocument.numPages;

      for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
        const page = await pdfDocument.getPage(pageNumber);
        const textContent = await page.getTextContent();
        const datas = extractTableInfo(textContent);
        const listInfo = datas[0];
        const textoParaEscrever = listInfo[0].split(" ").join("\n");

        await writeFileAsync(caminhoDoArquivo, textoParaEscrever);

        console.log(`Página ${pageNumber} escrita no arquivo com sucesso!`);
      }

    }
  } catch (error) {
    console.error("Erro ao carregar o PDF:", error);
  }
}


export function getMostRecentFile(dir: string) {
  const files = orderReccentFiles(dir);
  return files.length ? files[0] : undefined;
}

function orderReccentFiles(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
    .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
}

function clearFile() {
  fs.writeFile(caminhoDoArquivo, "", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Arquivo limpo com sucesso!");
  });
}

export { PassarDadosNoTxt,clearFile};
