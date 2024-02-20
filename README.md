<h2>Gerenciador dos episódios de Rick and Morty! </h2>
 
O gerenciador de episódios de Rick and Morty foi desenvolvido em React, e consumo em Graphql da API utilizando Apollo Client. "https://rickandmortyapi.com/graphql" acesse o link para mais detalhes da API. 

A ideia do projeto é acessar os episódios, marcar como assistido, favoritar, fitlrar episódios por nome e consultar episódios favoritados;

<h3> Importações:</h3>

- O código importa os módulos necessários do React, bem como alguns componentes e estilos.
- Utiliza o Apollo Client para fazer consultas GraphQL.
- Importa ícones de bibliotecas como react-icons para uso nos botões e elementos da interface.

<h3> Definição da consulta GraphQL:</h3>

- Utiliza hooks do React, como useState para gerenciar o estado.
- Utiliza o hook useQuery do Apollo Client para executar a consulta GraphQL e gerenciar o estado de carregamento, erro e dados.
- Define funções para lidar com interações do usuário, como exibir detalhes de um episódio, marcar como favorito, marcar como assistido, entre outras.
- Renderiza a lista de episódios, permitindo filtrar por nome do episódio e exibindo detalhes dos episódios em uma sobreposição.
- Permite a navegação entre páginas de episódios com os botões de avançar e retroceder.
- Mostra uma mensagem de carregamento enquanto os dados estão sendo buscados e exibe uma mensagem de erro caso ocorra algum problema.

<h3> Estrutura do Render:</h3>

- O componente renderiza uma série de elementos HTML para representar a interface do usuário.
- Inclui a renderização dinâmica dos episódios obtidos da consulta GraphQL.
- Exibe um campo de busca para filtrar os episódios por nome.
- Mostra uma lista de episódios favoritos que podem ser abertos ou fechados.

<h3>Intalando as dependências do projeto</h3>

🚀... Após clonar o repositório com comando "git clone" abra o terminal no repositório rick and morty e faça a instalação do pacote node
com o comando "npm install". Com o gerenciador de pacotes instalado abra o terminal e digite o seguinte comando para iniciar a aplicação em um servidor local "npm start" ou "yarn start".

