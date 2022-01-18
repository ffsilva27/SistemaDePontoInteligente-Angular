# Sistema De Ponto
O projeto consiste em um sistema de marcação de horários com 02 perfis: funcionário e administrador.<br/>
<br/>
No perfíl de funcionário, ao efetuar o login, este usuário poderá realizar sua marcação de ponto onde será capturada sua geolocalização. Além da tela de lançamento dos horários de início de trabalho/almoço e término de trabalho/almoço, este perfíl possui acesso à um relatório com todas suas marcações.<br/>
<br/>
Já no perfíl de administrador do sistema, será apresentado um relatório de todas as marcações, de todos os funcionário que estão sobre o guarda-chuva de sua empresa (possui filtragem por funcionário), assim como a possibilidade de edição/exclusão, em caso de alguma marcação incorreta.

### Pontos importantes sobre o projeto:
* Foram criadas mascaras personalizadas para CPF e CNPJ;
* Foram criados validadores personalizados para CPF e CNPJ;
* Trabalhamos com GeoLocalização junto ao registro das marcações;
* Trabalhamos com paginação (*lazy loading* para o relatório de lançamentos no perfil de administrador e *eager loading* para o relatório de lançamentos no perfíl de funcionário) e ordenação nos relatórios de lançamento;
* Utilizamos protetor de rotas com a finalidade de impedir que o perfíl de funcionário tivesse acesso as funcionalidades do perfíl de administrador;
* Utilizamos pipes para uma melhor visualização das datas/horas e tipos de lançamento, tendo em vista a formatação utilizada na API.
* Foi utilizado Angular Material em alguns recursos do projeto;
* Trabalhamos com decode do Base64;
* Para as datas/horas foi utilizada a API [Moment.js](https://momentjs.com/docs/);

__________________________________________________________________________________________________________

### Angular CLI - version 13.0.0
Esse projeto foi desenvolvido em Angular, portanto para execução realize os seguintes passos:

1. Faça o clone do repositório para sua máquina;
* `git clone url-projeto`
3. Utilizando o prompt de comando, navegue até a pasta do projeto;
* `cd caminho-da-pasta`
5. Ainda no prompt de comando e já dentro da pasta do projeto, você precisará instalar todas as dependências do package.json, sendo assim execute o seguinte comando:
* `npm install`
6. Após finalização da instalação, ainda no prompt de comando, execute:
* `ng serve`
7. O projeto será executado em `http://localhost:4200/`

________________________________________________________________________________________________________________

### API utilizada no projeto
A API utilizada no projeto não foi desenvolvida por mim. A API encontra-se hospedada [aqui](https://github.com/m4rciosouza/ponto-inteligente-api-curso-angular-v2) e foi desenvolvida com Java e Spring Boot. Para execução do projeto, a API precisa estar rodando junto ao projeto, conforme segue:

1. Realize o clone do repositório para sua máquina;
* `git clone url-api`
3. Utilizando prompt de comando, navegue até a pasta da API;
* `cd caminho-da-pasta`
5. Ainda no prompt de comando, digite:
* `mvnw spring-boot:run` (caso esteja executando no windows) ou
* `./mvnw spring-boot:run` (nos demais sistemas operacionais);
6. A API será executada em `http://localhost:8080`
