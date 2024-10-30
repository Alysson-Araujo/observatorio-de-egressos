## Sistema de Observatório de Egressos da Universidade Federal do Ceará - Campus Quixadá

Copyright (c) 2023, Alysson Araújo

O presente projeto foi desenvolvido pelo Alysson Araújo, graduado em Ciência da Computação pela Universidade Federal do Ceará - Campus Quixadá (UFC), como parte do Trabalho de Conclusão de Curso (TCC).

Para o entendimento do projeto com informações detalhadas e documentação do projeto, consulte o repositório da UFC para ler sobre o [TCC](https://repositorio.ufc.br/handle/riufc/75544).

A descrição do projeto, tecnologias utilizadas, instalação e licença estão descritas abaixo.

## Descrição do Projeto

O Sistema de Observatório de Egressos da Universidade Federal do Ceará - Campus Quixadá é uma aplicação web que tem como objetivo principal a coleta e análise de dados dos egressos do curso de Ciência da Computação da UFC - Campus Quixadá. A aplicação foi desenvolvida com o intuito de auxiliar a coordenação do curso na tomada de decisões, bem como fornecer informações relevantes para os egressos, discentes, docentes do campus e para quem está interessado sobre os dados dos cursos presentes no campus Quixadá.

## Tecnologias Utilizadas

### Front-end

#### Dependências do Projeto

- @emotion/react
- @emotion/styled
- @mui/material
- @mui/styled-engine-sc
- axios
- bootstrap
- buffer
- date-fns-tz
- formik
- history
- js-cookie
- luxon
- patch-package
- postinstall-postinstall
- react
- react-bootstrap
- react-bootstrap-icons
- react-datepicker
- react-dom
- react-jwt
- react-router-dom
- styled-components
- yup

#### Dependências de Desenvolvimento

- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- @vitejs/plugin-react
- autoprefixer
- eslint
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- jsonwebtoken
- postcss
- react-toastify
- tailwindcss
- typescript
- vite

### Back-end

#### Dependências do Projeto

- @prisma/client
- axios
- bcryptjs
- cors
- csvtojson
- date-fns
- dotenv
- exceljs
- express-async-errors
- jsonwebtoken
- multer
- node-cron
- node-fetch
- nodemailer
- pdf-parse
- pdfjs-dist
- puppeteer
- puppeteer-extra
- puppeteer-extra-plugin-stealth

#### Dependências de Desenvolvimento

- express
- nodemon
- prisma
- typescript

## Instalação

É necessário ressaltar que é preciso baixar a ferramenta de BI [Metabase](https://www.metabase.com/) para conseguir visualizar os dados do sistema.
Além disso, é preciso configurar as variaveis de ambiente no Front-end para o Metabase e para o Back-end.

### Front-end
   ```env
   VITE_LINK_SITE_METABASE=""
   VITE_LINK_BACKEND_CLOUD=""
   VITE_LINK_BACKEND=""
   VITE_LINK_PUBLIC_SITE_METABASE=""
   ```

---

## Execução

### Front-end

Para executar o Front-end, basta executar o comando abaixo:

```bash
npm install
npm run dev
```

### Back-end

```bash
npm install
npm run dev
```


## Licença

Este projeto tem seus direitos autorais reservados, veja no arquivo [LICENSE](./LICENSE) para mais informações.


Em caso de dúvidas e ausência de informações, entre em contato com o desenvolvedor do projeto. 

EMAIL: alyssonaraujowork@gmail.com