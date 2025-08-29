# Podcast Manager

> **Modificado por:** Fabio Toledo Bonemer De Salvi para o bootcamp da DIO meu tudo Mobile Developer.\
> **Versão base:** Felie Aguiar - Instrutor na DIO.

## Descrição

O Podcast Manager é uma aplicação inspirada no estilo da Netflix, que permite centralizar os podcasts e seus episódios separados por critérios como: nome, categoria, descrição, visualizações, curtidas, data de criação, etiqueta ou idioma do vídeo.\
Este projeto visa facilitar o acesso e a organização de episódios de podcasts em formato de vídeo, proporcionando uma experiência de navegação intuitiva e agradável para os usuários.

## Funcionalidades implementadas por Fabio Toledo Bonemer De Salvi

- **Verifica token do usuário:** A API verifica o token do usuário antes de realizar uma ação.
- **Listar os padcasts:** Permite listar e organizar os podcasts através das informações de id do canal, nome do canal, autor ou autores, descrição do conteúdo apresentado no podcast, url da imagem de capa do podcast e categorias que descrevem a apresentação do conteúdo do podcast.
- **Filtrar a lista de podcasts:** Os usuários podem realizar buscas utilizando os seguintes campos: id do canal, nome do canal, autor, descrição do conteúdo, url da imagem de capa ou categrias. Pode ser escolhido mais de um capo para realizar a busca. A API faz um uma comparação parcial do valor a ser buscado com o valor armazenado, ou seja, se o valor armazenado no banco de dados conter todos os caracteres, na mesma ordem, ele retornará este valor a usuário.
- **Listar os episódios de podcasts:** Os episódios dos podcasts podem ser listados e organizados em categorias como saúde, bodybuilder, mentalidade e humor, permitindo aos usuários explorar facilmente os conteúdos disponíveis. Podem ser listados também utilizando as informações de título do podcast, descrição do episódio, duração do episódio, data de envio, número de views, número de likes, etiquetas e idioma de apresentação.
- **Filtrar a lista de episódios de podcasts:** Os usuários podem realizar buscas utilizando os seguintes campos: id do vídeo, id do podcast, título do vídeo, descrição do vídeo, tempo de duração do vídeo, data de lançamento, número de visualizações, número de curtidas, etiquetas e idioma do vídeo.
- **Cadastrar um novo podcast:** A API permite inserir um novo poscast. è necessári enviar todas as informações do podcast no formato JSON.
- **Cadastrat um novo episódio de podcast:** A API permite inserir um novo episódio de podcast. É nesessári enviar tdas as informações do episódio no formato JSON.
- **Atualizar os dados de um podcast:** É possível alterar os dados de  um determinado podcast. É necessári enviar um os novos dados no formato JSON juntamente com o campo **id** do podcast. 
- **Atualizar os dados de um episódio de podcast:** É possível alterar os dados de um episódio de um determinado podcast. É nessário enviar s novos dados no formato *JSON juntamente com o campo **videoId** do episódio.
- **Excluir os dados de um podcast:** É possível excluir os dados de um determinado podast. É necessário enviar o campo **id** do podcasto a ser excluído.
- **Excluir os dados de um determinidado espisódio de podcast:** É possível excluir os dados de um determinado episódio de podcast. É necessário enviar  campo **videoId** do episódio a ser excluído.


## Implementação
Utilize um dos sequintes softwares para enviar as requisições REST para a API:
* **Postman**
* **Insomnia**

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
      "subscribers": 5900000,
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
      "subscribers": 1310000,    
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
  Se a busca **não gerar resultados** a API retornará uma **mensagem sem dados**.

### Buscar os podcasts

- **Endpoint:** `GET /api/podcast/list?id={id}t&name={nome}&author={autor}&subscribers={minimo,maximo}&=description={descrição}&cover_url={url_da_capa}&categories={categoria}`
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
      "subscribers": 2090000,
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
  ]
  ```
  Se a busca **não gerar resultados** a API retornará uma **mensagem sem dados**.

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
      "categories": [
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
      "categories": [
        "lucas inutilismo",
        "entrevista"
      ],
      "language": "pt-BR"
    },
    ...
  ]
  ```

### Buscar os episódios de podcasts

- **Endpoint:** `GET /api/episode/list?videoId={videoId}&podcastId{podcastId}=&title={titulo}&description{descrição}=&duration={tempo_seg}=&release_date{data_inicial,data_final}=&views{minimo,maximo}=&likes{minimo,maximo}=&tags{rotulo}=&language={idioma}`\
O campo **release_date** deve estar no formato ISO_8601: `YYYY-MM-DDTHH:MM:SSZ`
- **Token:** Envie o token de autorização no formato JSON dentro do campo de dados.
```json
{"token": "user1234abcd"}
```
- **Descrição:** Retorna uma lista de episódios de podcasts desejados conforme os critérios da busca. Utilize apenas os campos necessários.
- **Exemplo de resposta:** 
O **endpoint** será:\
 `GET /api/episode/list?release_date=2023-01-20T00%3A00%3A00Z,2025-01-20T00%3A00%3A00Z&views=300000,500000`\
E será retornado o seguinte arquivo JSON:
  ```json
  [
    {
      "videoId": "wCCDkCEFNPw",
      "podcastId": "@venuspdc",
      "title": "Quem não é hétero?",
      "description": "Neste episódio, Criss, Yas, Raquel Real e Letícia Panar se envolvem em um jogo divertido para descobrir quem dos convidados NÃO É HÉTERO! Você consegue descobrir antes que todo mundo quem entre os participantes está tentando esconder o jogo?\nEntre risadas e revelações, aquelas minas debatem tentam identificar o impostor antes que ele se revele. Acompanhe para descobrir se as mulheres são realmente detetives mais experientes da internet!",
      "duration": 1897,
      "release_date": "2025-01-20T00:00:00Z",
      "views": 348561,
      "likes": 21000,
      "categories": [
        "hétero",
        "jogo",
        "impostor"
      ],
      "language": "pt-BR"
    }
  ]
  ```
  Se a busca **não gerar resultados** a API retornará uma **mensagem sem dados**.

### Inserindo um podcast

- **Endpoint:** `POST /api/podcast/add`

- **Token e dados:** Envie o token de autorização e as informações do podcast no formato JSON dentro do campo de dados.
  ```json
  {
    "token": "user1234abcd",
    "newPodcast": {
      "id": "",
      "name": "",
      "author": [
        ""
      ],
      "subscribers": 0,
      "description": "",
      "cover_url": "",
      "categories": [
        ""
      ]    
    }
  }
  ```
- **Descrição:** Adicina um podcast à lista de podcasts.
- **Exemplo de envio e resposta:** 
  - **Envio**:\
    O **endpoint** será:\
    `POST /api/podcast/add`\
    O campo de dados deve conter o **token** e os **dados do podcast** no formato **JSON**:
    ```json
    {
      "token": "user1234abcd",
      "newPodcast": {
          "id": "@PrincipedaBurguesia",
          "name": "Príncipe da Burguesia",
          "author": [
          "Lord Vinheteiro - Fabrício Vinheteiro"
          ],
          "subscribers": 168000,
          "description": "O Príncipe da Burguesia é o canal de notícias mais sincero do Brasil focado para o público da Classe Média Alta Brasileira. Este canal é livre de apedeutas! Inscreva-se!",
          "cover_url": "https://yt3.ggpht.com/RXKPims6v21WeIuEdln2ndrgzx8RbWmqLkB_GvH-weRyK5YhCl5khbdwwnjwuAiGQ3NRpXmmyg=s176-c-k-c0x00ffffff-no-rj-mo",
          "categories": [
          "humor",
          "classe média alta",
          "música eudita",
          "música moderna",
          "análise crítica",
          "polarização",
          "experiências pessoais",
          "eventos inusitados"
          ]    	
      }
    }
    ```
  - **Resposta**:\
    Se o podcast enviado **for adicionado** à lista de podcasts, ou se **já tiver sido cadastrado**, a API **retornará os dados deste podcast** como um objeto **JSON** dentro de uma matriz:

    ```json
    [
      {
        "id": "@PrincipedaBurguesiatyu",
        "name": "Príncipe da Burguesia",
        "author": [
          "Lord Vinheteiro - Fabrício Vinheteiro"
        ],
        "subscribers": 168000,
        "description": "O Príncipe da Burguesia é o canal de notícias mais sincero do Brasil focado para o público da Classe Média Alta Brasileira. Este canal é livre de apedeutas! Inscreva-se!",
        "cover_url": "https://yt3.ggpht.com/RXKPims6v21WeIuEdln2ndrgzx8RbWmqLkB_GvH-weRyK5YhCl5khbdwwnjwuAiGQ3NRpXmmyg=s176-c-k-c0x00ffffff-no-rj-mo",
        "categories": [
          "humor",
          "classe média alta",
          "música eudita",
          "música moderna",
          "análise crítica",
          "polarização",
          "experiências pessoais",
          "eventos inusitados"
        ]
      }
    ]
    ```
    Se os dados do podcast **não forem cadastrados** a API retornará uma **mensagem sem dados**.

### Inserindo um episódio de podcast

- **Endpoint:** `POST /api/episode/add`\

- **Token e dados:** Envie o token de autorização e as informações do espisódio do podcast no formato JSON dentro do campo de dados.
  ```json
  {
    "token": "user1234abcd",
    "newEpisode": {
      "videoId": "",
      "podcastId": "",
      "title": "",
      "description": "",
      "duration": 0,
      "release_date": "YYYY-MM-DDTHH:MM:SSZ",
      "views": 0,
      "likes": 0,
      "categories": [""],
      "language": ""   
    }
  }
  ```
- **Descrição:** Adicina um episódio de podcast à lista de episódios de podcasts.
- **Exemplo de envio e resposta:** 
  - **Envio**\
    O **endpoint** será:\
    `POST /api/episode/add`\
    O campo de dados deve conter o **token** e os **dados do episódio** no formato **JSON**:
    ```json
    {
    "token": "user1234abcd",
    "newEpisode": {
        "videoId": "lfO05ccNMlo",
        "podcastId": "@PrincipedaBurguesia",
        "title": "Como Perdi 2 Milhões em 2 Minutos | Vinheteriro |",
        "description": "Esta é a verdadeira história sobre o que aconteceu com a senha da Wallet do Lord Vinheteiro. Como ele perdeu os 2 milhões de reais em 4 Bitcoins.",
        "duration": 474,
        "release_date": "2024-11-22T00:00:00Z",
        "views": 184499,
        "likes": 13000,
        "categories": [
          "vinheteiro",
          "lorde"
        ],
        "language": "pt-BR"
    } 
    }
    ```
  - **Resposta**\
    Se o episodo enviado **for adicionado** à lista de episódios, ou se **já tiver sido cadastrado**, a API **retornará os dados deste podcast** como um objeto **JSON** dentro de uma matriz:
    ```json
    [
      {
        "videoId": "lfO05ccNMlo",
        "podcastId": "@PrincipedaBurguesia",
        "title": "Como Perdi 2 Milhões em 2 Minutos | Vinheteriro |",
        "description": "Esta é a verdadeira história sobre o que aconteceu com a senha da Wallet do Lord Vinheteiro. Como ele perdeu os 2 milhões de reais em 4 Bitcoins.",
        "duration": 474,
        "release_date": "2024-11-22T00:00:00Z",
        "views": 184499,
        "likes": 13000,
        "categories": [
          "vinheteiro",
          "lorde"
        ],
        "language": "pt-BR"
      }
    ]
    ```
    Se os dados do episódio **não forem cadastrados** a API retornará uma **mensagem sem dados**.

### Editando/inserindo um podcast

- **Endpoint:** `PUT /api/podcast/upsert`
- **Token:** Envie o token de autorização e as informações do podcast no formato JSON dentro do campo de dados.
  ```json
  {
    "token": "user1234abcd",
    "upsertPodcast": {
      "id": "",
      "name": "",
      "author": [
        ""
      ],
      "subscribers": 0,
      "description": "",
      "cover_url": "",
      "categories": [
        ""
      ]    
    }
  }
  ```
- **Descrição:** Edita todos os dados de um podcast. O podcast será inserido caso não esteja cadastrado.

- **Exemplo envio e resposta:** 
  - **Envio**\
    O **endpoint** será:\
    `PUT /api/podcast/upsert`\
    O campo de dados deve conter o **token** e os **dados do podcast** no formato **JSON**:
    ```json
    {
      "token": "user1234abcd",
      "upsertPodcast": {
          "id": "@PrincipedaBurguesia",
          "name": "Príncipe da Burguesia",
          "author": [
          "Lord Vinheteiro - Fabrício Vinheteiro"
          ],
          "subscribers": 168000,
          "description": "O Príncipe da Burguesia é o canal de notícias mais sincero do Brasil focado para o público da Classe Média Alta Brasileira. Este canal é livre de apedeutas! Inscreva-se!",
          "cover_url": "https://yt3.ggpht.com/RXKPims6v21WeIuEdln2ndrgzx8RbWmqLkB_GvH-weRyK5YhCl5khbdwwnjwuAiGQ3NRpXmmyg=s176-c-k-c0x00ffffff-no-rj-mo",
          "categories": [
          "humor",
          "classe média alta",
          "música eudita",
          "música moderna",
          "análise crítica",
          "polarização",
          "experiências pessoais",
          "eventos inusitados"
          ]
      }
    }    
    ```
  - **Resposta**\
    O podcast **será iserido** na lista de podcasts caso **não esteja cadastrado**. Caso **já tenha sido cadastrado**, a API atualizará os dados e **retornará os dados deste podcast** como um objeto **JSON** dentro de uma matriz:
    ```json
    [
      {
        "id": "@PrincipedaBurguesia",
        "name": "Príncipe da Burguesia",
        "author": [
          "Lord Vinheteiro - Fabrício Vinheteiro"
        ],
        "subscribers": 168000,
        "description": "O Príncipe da Burguesia é o canal de notícias mais sincero do Brasil focado para o público da Classe Média Alta Brasileira. Este canal é livre de apedeutas! Inscreva-se!",
        "cover_url": "https://yt3.ggpht.com/RXKPims6v21WeIuEdln2ndrgzx8RbWmqLkB_GvH-weRyK5YhCl5khbdwwnjwuAiGQ3NRpXmmyg=s176-c-k-c0x00ffffff-no-rj-mo",
        "categories": [
          "humor",
          "classe média alta",
          "música eudita",
          "música moderna",
          "análise crítica",
          "polarização",
          "experiências pessoais",
          "eventos inusitados"
        ]
      }
    ]    
    ```
    Se os dados do podcast **não forem cadastrados** a API retornará uma **mensagem sem dados**.

### Editando/inserindo um episódio de podcast

- **Endpoint:** `PUT /api/episodio/upsert`
- **Token:** Envie o token de autorização e as informações do episódio so podcast no formato JSON dentro do campo de dados.
  ```json
  {
    "token": "user1234abcd",
    "upsertEpisode": {
      "videoId": "",
      "podcastId": "",
      "title": "",
      "description": "",
      "duration": 0,
      "release_date": "YYYY-MM-DDTHH:MM:SSZ",
      "views": 0,
      "likes": 0,
      "categories": [""],
      "language": ""   
    }
  }
  ```
- **Descrição:** Edita todos os dados de um episódio de podcast. O episódio será inserido caso não esteja cadastrado.

- **Exemplo envio e resposta:** 
  - **Envio**\
    O **endpoint** será:\
    `PUT /api/episode/upsert`\
    O campo de dados deve conter o **token** e os **dados do episódio** no formato **JSON**:
    ```json
    {
      "token": "user1234abcd",
      "upsertEpisode": {
        "videoId": "4_LBEamyok0",
        "podcastId": "@ancap_su",
        "title": "VICE-PRESIDENTE da ONU pede OFICIALMENTE MUDANÇA de SEDE da COP30: \"DESRESPEITO ao MULTILATERALISMO\"",
        "description": "VICE-PRESIDENTE da ONU pede OFICIALMENTE MUDANÇA de SEDE da COP30: \"DESRESPEITO ao MULTILATERALISMO\"",
        "duration": 882,
        "release_date": "2025-08-25T00:00:00Z",
        "views": 116943,
        "likes": 21000,
        "categories": [
            "dipomacia internaciona & ONU",
            "multilateralismo & cooperação global",
            "segurança climática & COP30",
            "política internacional & geopolítica",
            "críticas institucinais"		],
        "language": "pt-BR"
      }
    }    
    ```
  - **Resposta**\
    O episódio de podcast **será iserido** na lista de episódios caso **não esteja cadastrado**. Caso **já tenha sido cadastrado**, a API atualizará os dados e **retornará os dados deste episódio** como um objeto **JSON** dentro de uma matriz:
    ```json
    [
      {
        "videoId": "4_LBEamyok0",
        "podcastId": "@ancap_su",
        "title": "VICE-PRESIDENTE da ONU pede OFICIALMENTE MUDANÇA de SEDE da COP30: \"DESRESPEITO ao MULTILATERALISMO\"",
        "description": "VICE-PRESIDENTE da ONU pede OFICIALMENTE MUDANÇA de SEDE da COP30: \"DESRESPEITO ao MULTILATERALISMO\"",
        "duration": 882,
        "release_date": "2025-08-25T00:00:00Z",
        "views": 116943,
        "likes": 21000,
        "categories": [
          "dipomacia internaciona & ONU",
          "multilateralismo & cooperação global",
          "segurança climática & COP30",
          "política internacional & geopolítica",
          "críticas institucinais"
        ],
        "language": "pt-BR"
      }
    ]      
    ```
    Se os dados do episódio de podcast **não forem cadastrados** a API retornará uma **mensagem sem dados**.


### Editando parcialmente um podcast

- **Endpoint:** `PATCH /api/podcast/edit`
- **Token:** Envie o token de autorização e as informações do podcast a serem alteradas no formato JSON dentro do campo de dados. O campo **id** é obrigatório e deve conter o id do podcast a ser editado, os outros campos são inseridos conforme a necessidade.
  ```json
  {
    "token": "user1234abcd",
    "editPodcast": {
      "id": "",
      "name": "",
      "author": [
        ""
      ],
      "subscribers": 0,
      "description": "",
      "cover_url": "",
      "categories": [
        ""
      ]    
    }
  }
  ```
- **Descrição:** Edita parcialmente os dados de um podcast.

- **Exemplo envio e resposta:** 
  - **Envio**\
    O **endpoint** será:\
    `PATCH /api/podcast/edit`\
    O campo de dados deve conter o **token** e os **dados do podcast** no formato **JSON**:
    ```json
    {
      "token": "user1234abcd",
      "editPodcast": {
          "id": "@PrincipedaBurguesiatyu",
          "categories": [
          "humor",
          "classe média alta",
          "música eudita",
          "música moderna",
          "análise crítica",
          "polarização",
          "experiências pessoais",
          "eventos inusitados"
          ]
      }
    }
    ```
  - **Resposta**\
    A API atualizará os dados e **retornará os dados do podcast** como um objeto **JSON** dentro de uma matriz:
    ```json
    [
      {
        "id": "@PrincipedaBurguesia",
        "name": "Príncipe da Burguesia",
        "author": [
          "Lord Vinheteiro - Fabrício Vinheteiro"
        ],
        "subscribers": 168000,
        "description": "O Príncipe da Burguesia é o canal de notícias mais sincero do Brasil focado para o público da Classe Média Alta Brasileira. Este canal é livre de apedeutas! Inscreva-se!",
        "cover_url": "https://yt3.ggpht.com/RXKPims6v21WeIuEdln2ndrgzx8RbWmqLkB_GvH-weRyK5YhCl5khbdwwnjwuAiGQ3NRpXmmyg=s176-c-k-c0x00ffffff-no-rj-mo",
        "categories": [
          "humor",
          "classe média alta",
          "música eudita",
          "música moderna",
          "análise crítica",
          "polarização",
          "experiências pessoais",
          "eventos inusitados"
        ]
      }
    ]
    ```
    Caso o podcast **não seja** atualizado a API retornará uma **mensagem sem dados**.

### Editando parcialmente um episódio de posdcast

- **Endpoint:** `PATCH /api/episodio/edit`
- **Token:** Envie o token de autorização e as infomações do episódio do podcast a serem alteras no formato JSON dentro do campo de dados. O campo **videoId** é obrigatório e deve conter o videoId do episódio de podcast a ser editado, os outros campos são inseridos conforme a necessidade.
  ```json
  {
    "token": "user1234abcd",
    "editEpisode": {
      "videoId": "",
      "podcastId": "",
      "title": "",
      "description": "",
      "duration": 0,
      "release_date": "YYYY-MM-DDTHH:MM:SSZ",
      "views": 0,
      "likes": 0,
      "categories": [""],
      "language": ""   
    }
  }
  ```
- **Descrição:** Edita parcialmente os dados de um podcast.

- **Exemplo envio e resposta:** 
  - **Envio**\
    O **endpoint** será:\
    `PATCH /api/episode/edit`\
    O campo de dados deve conter o **token** e os **dados do episódio** do podcast no formato **JSON**:
    ```json
    {
      "token": "user1234abcd",
      "editEpisode": {
        "videoId": "4_LBEamyok0",
        "title": "VICE-PRESIDENTE da ONU pede OFICIALMENTE MUDANÇA de SEDE da COP30: \"DESRESPEITO ao MULTILATERALISMO\"",
        "release_date": "2025-08-25T00:00:00Z",
        "categories": [
            "dipomacia internaciona & ONU",
            "multilateralismo & cooperação global",
            "segurança climática & COP30",
            "política internacional & geopolítica",
            "críticas institucinais"
        ]
      }
    }
    ```
  - **Resposta**\
    A API atualizará os dados e **retornará os dados do podcast** como um objeto **JSON** dentro de uma matriz:
    ```json
    [
      {
        "videoId": "4_LBEamyok0",
        "podcastId": "@ancap_su",
        "title": "VICE-PRESIDENTE da ONU pede OFICIALMENTE MUDANÇA de SEDE da COP30: \"DESRESPEITO ao MULTILATERALISMO\"",
        "description": "VICE-PRESIDENTE da ONU pede OFICIALMENTE MUDANÇA de SEDE da COP30: \"DESRESPEITO ao MULTILATERALISMO\"",
        "duration": 882,
        "release_date": "2025-08-25T00:00:00Z",
        "views": 116943,
        "likes": 21000,
        "categories": [
          "dipomacia internaciona & ONU",
          "multilateralismo & cooperação global",
          "segurança climática & COP30",
          "política internacional & geopolítica",
          "críticas institucinais"
        ],
        "language": "pt-BR"
      }
    ]
    ```
    Caso o episódio de podcast **não seja** atualizado a API retornará uma **mensagem sem dados**.

### Apagando um podcast

- **Endpoint:** `DELETE /api/podcast/delete`
- **Token:** Envie o token de autorização e o **id** do podcast a ser exclído no formato JSON dentro do campo de dados.
  ```json
  {
    "token": "user1234abcd",
    "deletePodcast": {
      "id": ""  
    }
  }
  ```
- **Descrição:** Deleta todos os dados de um podcast que contenham o **id** do episódio a ser excluído..

- **Exemplo envio e resposta:** 
  - **Envio**\
    O **endpoint** será:\
    `DELETE /api/podcast/delete`\
    O campo de dados deve conter o **token** e os **id** do podcast a ser excluído no formato **JSON**:
    ```json
    {
      "token": "user1234abcd",
      "deletePodcast": {
          "id": "@PrincipedaBurguesiatyu"
      }
    }
    ```
  - **Resposta**\
    A API **exluirá os dados** e **retornará os dados do podcast** como um objeto **JSON** dentro de uma matriz:
    ```json
    [
      {
        "id": "@PrincipedaBurguesia",
        "name": "Príncipe da Burguesia",
        "author": [
          "Lord Vinheteiro - Fabrício Vinheteiro"
        ],
        "subscribers": 168000,
        "description": "O Príncipe da Burguesia é o canal de notícias mais sincero do Brasil focado para o público da Classe Média Alta Brasileira. Este canal é livre de apedeutas! Inscreva-se!",
        "cover_url": "https://yt3.ggpht.com/RXKPims6v21WeIuEdln2ndrgzx8RbWmqLkB_GvH-weRyK5YhCl5khbdwwnjwuAiGQ3NRpXmmyg=s176-c-k-c0x00ffffff-no-rj-mo",
        "categories": [
          "humor",
          "classe média alta",
          "música eudita",
          "música moderna",
          "análise crítica",
          "polarização",
          "experiências pessoais",
          "eventos inusitados"
        ]
      }
    ]
    ```
    Caso o podcast **já tenha sido excluído**, ou **se o podcast não for encontrado**, a API retornará uma **mensagem sem dados**.

### Apagando um episódio de podcast

- **Endpoint:** `DELETE /api/episode/delete`
- **Token:** Envie o token de autorização e o **videoId** do episódio do vídeo a ser excluído no formato JSON dentro do campo de dados.
  ```json
  {
    "token": "user1234abcd",
    "deleteEpisode": {
      "videoId": "" 
    }
  }
  ```
- **Descrição:** Deleta todos os dados de um episódio de podcast.

- **Exemplo envio e resposta:** 
  - **Envio**\
    O **endpoint** será:\
    `DELETE /api/episode/delete`\
    O campo de dados deve conter o **token** e os **videoId** do podcast a ser excluído no formato **JSON**:
    ```json
    {	
      "token": "user1234abcd",
      "deleteEpisode": {
          "videoId": "4_LBEamyok0"
      }
    }
    ```
  - **Resposta**\
    A API **exluirá os dados** com o mesmo **videoId** e **retornará os dados do episódio do podcast** como um objeto **JSON** dentro de uma matriz:
    ```json
    [
      {
        "videoId": "4_LBEamyok0",
        "podcastId": "@ancap_su",
        "title": "VICE-PRESIDENTE da ONU pede OFICIALMENTE MUDANÇA de SEDE da COP30: \"DESRESPEITO ao MULTILATERALISMO\"",
        "description": "VICE-PRESIDENTE da ONU pede OFICIALMENTE MUDANÇA de SEDE da COP30: \"DESRESPEITO ao MULTILATERALISMO\"",
        "duration": 882,
        "release_date": "2025-08-25T00:00:00Z",
        "views": 116943,
        "likes": 21000,
        "categories": [
          "dipomacia internaciona & ONU",
          "multilateralismo & cooperação global",
          "segurança climática & COP30",
          "política internacional & geopolítica",
          "críticas institucinais"
        ],
        "language": "pt-BR"
      }
    ]
    ```
    Caso o episódio de podcast **já tenha sido excluído**, ou **se o episódio de podcast não for encontrado**, a API retornará uma **mensagem sem dados**.

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
