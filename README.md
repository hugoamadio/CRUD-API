# RestFY Recados
O projeto RestFY Recados é um CRUD de recados desenvolvido em Node.js e Express, focado no aprendizado e aprimoramento das habilidades em backend.<br>
Utiliza diversos recursos como middlewares, bcrypt para criptografia de senhas, cors para permitir requisições de diferentes origens e sucrase para utilização de sintaxe mais moderna do JavaScript.<br>
Também foi utilizado o Postman, uma ferramenta de auxílio para testar APIs. O projeto não possui uma interface frontend, sendo exclusivamente um backend. <br>
Abaixo segue imagem do Postman, mostrando a utilização da ferramenta para testar as funcionalidades da API.<br>

![image](https://github.com/hugoamadio/RestFY-Recados/assets/146294243/af6d00a2-8c68-4714-bfdd-6cbe1130bf5e)

# Como Usar
* Clone o repositório
* Execute o comando "npm i" no terminal para instalar as dependências
* Execute o comando "yarn dev" para iniciar o servidor
* Utilize o postman para fazer requisições nos diferentes endpoints da aplicação
<br>

# Endpoints
* (POST) /singup : Cadastro de usuário, requer Email, Senha e Nome
* (POST) /login: Login de usuário, requer Email e Senha
* (GET) /users: Retorna os usuários cadastrados
* (PUT) /users/:userID : Atualização de senha do usuário, requer ID do usuario passado como parametro e requer nova senha no body da requisição
* (DELETE) /users/:userID : Deletar usuário a partir do ID passado como parametro

  <br><br>
* (GET) /getnote: Retorna os recados cadastrados
* (POST) /note: Cadastro de novo recado, requer Email, Senha e Recado para cadastrar o recado do usuário
* (DELETE) /note/:idAnnotation : Deletar recado apartir do ID do recado
* (PUT) /note/:idAnnotation : Atualização do recado, requer Email, Senha e novo recado para atualização
