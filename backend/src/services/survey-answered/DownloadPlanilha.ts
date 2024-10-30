import puppeteer from "puppeteer";
import path from "path";
import cryptor from "crypto";
import fs from "fs";
import * as ExcelJS from "exceljs";


export async function convertExcelToJSON(excelFilePath: string): Promise<string> {
  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.readFile(excelFilePath);
    const worksheet = workbook.getWorksheet(1);
    const jsonData: any[] = [];

    const columnHeaders: string[] = [];
    worksheet.getRow(1).eachCell((cell) => {
      columnHeaders.push(cell.value?.toString() ?? '');
    });

    // Iterar pelas linhas e mapear os valores para objetos JSON
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        const rowData: any = {};

        columnHeaders.forEach((header, index) => {
          const cellValue = row.getCell(index + 1).value;

          if (cellValue && typeof cellValue === 'object') {
            if (cellValue instanceof Date) {
              // If the cell value is a Date, set the rowData directly
              rowData[header] = cellValue;
            } else if ('richText' in cellValue) {
              // If the cell value is a CellRichTextValue, extract the 'text' property
              rowData[header] = cellValue.richText.map((textObj) => textObj.text).join('') || '';
            } else if ('hyperlink' in cellValue) {
              // If the cell value is an object, extract the 'hyperlink' property
              rowData[header] = {
                hyperlink: cellValue.hyperlink || '',
              };
            }
          } else {
            // If the cell value is not an object, set the rowData directly
            rowData[header] = cellValue || '';
          }
        });

        jsonData.push(rowData);
      }
    });

    const jsonString = JSON.stringify(jsonData, null, 2); // Converte o array JSON em uma string formatada
    return jsonString;
  } catch (error) {
    throw error;
  }
}



function delay(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export async function downloadPlanilha(linkSheet: string) {
  const fileHash = cryptor.randomBytes(16).toString("hex");
  const outputPath = `./tmp/respostas_surveys/Cópia de Avaliação do curso (respostas) - para testar o backendd.xlsx`;
  const browser = await puppeteer.launch({
    headless: "new",
    devtools: false,
    args: ["--disable-infobars", "--no-first-run", "--no-sandbox"],
  });

  const page = await browser.newPage();
  console.log();
  const client = await page.target().createCDPSession();
  await client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "tmp",
      "respostas_surveys"
    ),
  });

  // Navegue até a página com o link para a planilha
  await page.goto(linkSheet);

  await delay(8000);

  // Localize o elemento que leva ao download da planilha
  await page.click("#docs-file-menu");
  await delay(2000);

  await page.keyboard.press("ArrowDown");
  await delay(500);

  await page.keyboard.press("ArrowRight");

  await page.keyboard.press("Enter");
  await delay(5000);

  await page.close();
  await browser.close();

  // await convertExcelToJSON(
  //   outputPath,
  //   "./tmp/respostas_surveys/planilhaResposta.json"
  // );
}
