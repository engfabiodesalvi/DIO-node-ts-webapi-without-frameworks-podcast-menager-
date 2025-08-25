# Podcast Manager

> **Modificado por:** Fabio Toledo Bonemer De Salvi para o bootcamp da DIO meu tudo Mobile Developer.\
> **Versão base:** Felie Aguiar - Instrutor na DIO.

## Descrição

O Podcast Manager é uma aplicação inspirada no estilo da Netflix, que permite centralizar os podcasts e seus episódios separados por critérios como: nome, categoria, descrição, visualizações, curtidas, data de criação, etiqueta ou idioma do vídeo.\
Este projeto visa facilitar o acesso e a organização de episódios de podcasts em formato de vídeo, proporcionando uma experiência de navegação intuitiva e agradável para os usuários.

## Funcionalidades

- **Verifica usuário:** A API verifica usuário e login do solicitante antes de realizar uma ação.
- **Listar os padcasts:** Permite listar e organizar os podcasts através das informações de id do canal, nome do canal, autor ou autores, descrição do conteúdo apresentado no podcast, url da imagem de capa do podcast e categorias que descrevem a apresentação do conteúdo do podcast.
- **Filtrar a lista de podcasts:** Os usuários podem realizar buscas utilizando os seguintes campos: id do canal, nome do canal, autor, descrição do conteúdo, url da imagem de capa ou categrias. Pode ser escolhido mais de um capo para realizar a busca. A API faz um uma comparação parcial do valor a ser buscado com o valor armazenado, ou seja, se o valor armazenado no banco de dados conter todos os caracteres, na mesma ordem, ele retornará este valor a usuário.
- **Listar os episódios de podcasts:** Os episódios dos podcasts podem ser listados e organizados em categorias como saúde, bodybuilder, mentalidade e humor, permitindo aos usuários explorar facilmente os conteúdos disponíveis. Podem ser listados também utilizando as informações de título do podcast, descrição do episódio, duração do episódio, data de envio, número de views, número de likes, etiquetas e idioma de apresentação.
- **Filtrar a lista de episódios de podcasts:** Os usuários podem realizar buscas utilizando os seguintes campos: id do vídeo, id do podcast, título do vídeo, descrição do vídeo, tempo de duração do vídeo, data de lançamento, número de visualizações, número de curtidas, etiquetas e idioma do vídeo.


## Implementação

### Listar os podcasts 

- **Endpoint:** `GET api/podcast/list`
- **Token:** Envie o token de autorização no formato JSON dentro do campo de dados.
```json
{"token": "user1234abcd"}
```
- **Descrição:** Retorna uma lista de podcasts.
- **Exemplo de resposta:** Abaixo está listado os dois primeiros itens da solicitação em formato JSON.

```json
[
  {
    "id": "@FlowPodcast",
    "name": "Flow Podcast",
    "author": [
      "Igor Coelho - Igor 3k"
    ],
    "description": "Podcast sobre tecnologia e inovação em conversas abertas.",
    "cover_url": "https://yt3.googleusercontent.com/ytc/AIdro_kEF_Lu8DNUpCOHSE9xZZRFjXy9kH_G8O9yDP3K9J6o14g=s176-c-k-c0x00ffffff-no-rj-mo",
    "categories": [
      "cultura",
      "entretenimento",
      "ciência",
      "tecnologia",
      "inovação",
      "saúde",
      "esporte",
      "bodybuilder",
      "desenvolvimento pessoal",
      "negócio",
      "empreendedorismo"
    ]
  },
  {
    "id": "@venuspdc",
    "name": "Venus Podcast",
    "author": [
      "Criss Paiva",
      "Yasmin Ali"
    ],
    "description": "Podcast é focado em apresentar a visão feminina sobre temas atuais e temáticas diversas.",
    "cover_url": "https://yt3.ggpht.com/8i3GiRMxI1ujPmStPzFjG59OWMFoho64iHdK67PoBWPqiL6cwY59LMCzAZ0ORt9ejxYodoplrw=s176-c-k-c0x00ffffff-no-rj-mo",
    "categories": [
      "cultura pop",
      "entretenimento",
      "ciência",
      "espiritualidade",
      "ufologia",
      "educação",
      "criadores de conteúdo",
      "humor",
      "bastidores pessoais",
      "true crime",
      "investigações",
      "relações pessoais",
      "reflexões"
    ]
  },
  ...
]
```

### Buscar os podcasts

- **Endpoint:** `GET /api/podcast/list?id={id}t&name={nome}&author={autor}&description={descrição}&cover_url={url_da_capa}&categories={categoria}`
- **Token:** Envie o token de autorização no formato JSON dentro campo de dados.
```json
{"token": "user1234abcd"}
```
- **Descrição:** Retorna uma lista de podcasts desejados conforme os critérios da busca. Utilize apenas os campos necessários.
- **Exemplo de resposta:** Para uma busca pelo podcast do autor Sergio e da categoria astronomia.\
O **endpoint** será:\
 `GET /api/podcast/list?author=sergio&categories=astronomia`\
E será retornado o seguinte arquivo JSON:
```json
[
  {
    "id": "@SpaceToday",
    "name": "SpaceToday",
    "author": [
      "Sergio Sacani"
    ],
    "description": "Portal de conteúdo sobre astronomia e ciência onde apresenta notícias, análises e vídeos sobre o universo de forma acessível.",
    "cover_url": "https://yt3.ggpht.com/JA39FTXDNDI86qOEzL8pI5EmYBvuQamyP7iJHnR0DexKjrc9mGijSc0BVkOYZx6QmczLixY0OfU=s176-c-k-c0x00ffffff-no-rj-mo",
    "categories": [
      "astronomia",
      "astrofísica",
      "cosmologia",
      "exploração espacial",
      "missções históricas",
      "habitabilidade",
      "vida extraterrestre",
      "tecnologia ciêntífica",
      "observação"
    ]
  }
```

### Listar os episódios de podcasts

- **Endpoint:** `GET /api/episode/list`
- **Token:** Envie o token de autorização no formato JSON dentro do campo de dados.
```json
{"token": "user1234abcd"}
```
- **Descrição:** Retorna uma lista com todos os episódios de podcasts.
- **Exemplo de resposta:** Abaixo está listado os dois primeiros itens da solicitação em formato JSON.

```json
[
	{
		"videoId": "tHbFukPmM9s",
		"podcastId": "@FlowPodcast",
		"title": "Vitor Metaforando - Flow Podcast #154",
		"description": "Flow Podcast é uma conversa descontraída, longa e livre, como um papo de boteco entre amigos. No Flow garantimos um espaço onde o convidado pode desenvolver suas ideias sem qualquer tipo de pauta ou as restrições normais de outras mídias, como agenda política/filosófica.",
		"duration": 9192,
		"release_date": "2020-07-05T00:00:00Z",
		"views": 7831283,
		"likes": 361000,
		"tags": [
			"vitor metaforando",
			"entrevista"
		],
		"language": "pt-BR"
	},
	{
		"videoId": "qOer7KEMHIo",
		"podcastId": "@FlowPodcast",
		"title": "Lucas Inutilismo - Flow Podcast #212",
		"description": "Flow Podcast é uma conversa descontraída, longa e livre, como um papo de boteco entre amigos. No Flow garantimos um espaço onde o convidado pode desenvolver suas ideias sem qualquer tipo de pauta ou as restrições normais de outras mídias, como agenda política/filosófica.",
		"duration": 10322,
		"release_date": "2020-10-02T00:00:00Z",
		"views": 7831283,
		"likes": 361000,
		"tags": [
			"lucas inutilismo",
			"entrevista"
		],
		"language": "pt-BR"
	},
  ...
]
```

### Buscar os episódios de podcasts

- **Endpoint:** `GET /api/episode/list?videoId={videoId}&podcastId{podcastId}=&title={titulo}&description{descrição}=&duration={tempo_seg}&release_date{data_ISO_8601}=&views{visualizações}=&likes{curtidas}=&tags{rótulo}=&language={idioma}`
- **Token:** Envie o token de autorização no formato JSON dentro do campo de dados.
```json
{"token": "user1234abcd"}
```
- **Descrição:** Retorna uma lista de episódios de podcasts desejados conforme os critérios da busca. Utilize apenas os campos necessários.
- **Exemplo de resposta:** 
O **endpoint** será:\
 `GET /api/episodes/list?name=spacetoday&author=sergio`\
E será retornado o seguinte arquivo JSON:
```json

```

## Tecnologias Utilizadas

- **[TypeScript](https://www.typescriptlang.org/):** Linguagem de programação utilizada para o desenvolvimento do projeto.
- **[Tsup](https://github.com/egoist/tsup):** Ferramenta de construção e empacotamento para projetos TypeScript.
- **[Tsx](https://github.com/egoist/tsx):** Compilador TypeScript que suporta a construção de projetos.
- **[Node.js](https://nodejs.org/):** Ambiente de execução JavaScript que permite executar código JavaScript do lado do servidor.
- **[@types/node](https://www.npmjs.com/package/@types/node):** Pacote de definições de tipos para Node.js para auxiliar no desenvolvimento com TypeScript.

## Como Utilizar

1. Clone este repositório.
2. Instale as dependências usando `npm install`.
3. Inicie o servidor executando `start:dev`.
4. Acesse os endpoints fornecidos para listar os episódios de podcasts ou filtrá-los por nome de podcast.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas ou enviar solicitações de recebimento (pull requests) para melhorar este projeto.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
