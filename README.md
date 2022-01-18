# Sistema De Ponto
O projeto consiste em um sistema de marcação de horários com 02 perfis: funcionário e administrador.<br/>
<br/>
No perfil de funcionário, ao efetuar o login, este usuário poderá realizar sua marcação de ponto onde será capturada sua geolocalização. Além da tela de lançamento dos horários de início de trabalho/almoço e término de trabalho/almoço, este perfil possui acesso à um relatório com todas suas marcações.<br/>
<br/>
Já no perfil de administrador do sistema, será apresentado um relatório de todas as marcações, de todos os funcionário que estão sob o guarda-chuva de sua empresa (possui filtragem por funcionário), assim como a possibilidade de edição/exclusão, em caso de alguma marcação incorreta.

### Pontos importantes sobre o projeto:
* Criei mascaras personalizadas para CPF e CNPJ;
* Criei validadores personalizados para CPF e CNPJ;
* A aplicação coleta GeoLocalização no momento de registro das marcações;
* Criação de paginação (*lazy loading* para o relatório de lançamentos no perfil de administrador e *eager loading* para o relatório de lançamentos no perfíl de funcionário) e ordenação nos relatórios de lançamento;
* Utilizei protetor de rotas com a finalidade de impedir que o perfil de funcionário tivesse acesso as funcionalidades do perfil de administrador;
* Criei pipes para uma melhor visualização das datas/horas e tipos de lançamento, tendo em vista a formatação utilizada na API.
* Pude utilizar e aprender um pouco sobre o Angular Material, onde utilizei em alguns recursos do projeto;
* Trabalhei com decode do Base64 no token retornado pela API;
* Para as datas/horas trabalhei com a API [Moment.js](https://momentjs.com/docs/);

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
