
# Sistema em docker PIM IV UNIVERSIDADE PAULISTA

Projeto desenvolvido como parte do Projeto Integrado Multidisciplinar IV (PIM), com o propósito de aplicar os conhecimentos adquiridos ao longo do curso de Análise e Desenvolvimento de Sistemas.

Neste repositório, você encontrará o Docker Compose configurado para executar dois sistemas: o Front-end, desenvolvido com NEXT.JS, TypeScript e estilizado com SASS/SCSS; e o Back-end, que consiste em uma API construída em C# com integração do Swagger.


## Instalação


Para rodar o projeto, basta executar o seguinte comando na pasta raiz do projeto:

```bash
  docker-compose up --build
```
Após a execução do comando acima, o Docker construirá automaticamente o container e as imagens do front-end e back-end.
    
## FAQ

#### Como acessar o Front-end?

O Front-end está configurado para operar na porta 3000. Para acessar a interface do Front-end, basta abrir o seu navegador e digitar "http://localhost:3000/" após a conclusão bem-sucedida da execução do docker-compose.

#### Como acessar e testar a API?

A API está configurada para funcionar na porta 8000. Para acessar a interface do Swagger e testar a API, basta abrir seu navegador e inserir "http://localhost:8000/swagger/index.html" assim que o docker-compose concluir com êxito.

## Stack utilizada

**Front-end:** Next.js / React, SASS/SCSS, Axios.

**Back-end:** C#, ASP.NET and Web Development


## Autores

- [@TiagoEstetele](https://github.com/TiagoEstetele) Front-end / Docker
- [@FernandoGigliotti](https://github.com/Nerfandao) Back-end

