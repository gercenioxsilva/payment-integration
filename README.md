# Mee Subscriptions Server
Mee Subscriptions Application, server

## Executando o projeto

Antes de tudo, executar
```
npm install
```
No [package.json](/package.json), deverá conter um atributo **scripts**, mostrando como pode rodar a aplicação.  

Para aplicar todas as Migrations e Seeds geradas:
```
npm run config
```
Para iniciar a aplicação:
```
npm start 
```

## Sequelize CLI

O Sequelize disponibiliza um CLI para poder facilitar a geração de alguns conteúdos, elementos do pacote **sequelize-cli**.  
Ao inicializar um projeto com a ajuda deste pacote, temos a estrutura básica de diretórios:
* ```config```, que contem os arquivos de configuração, que ensina o CLI a se comunicar com o banco de dados;
* ```models```, que contem todos os modelos do projeto;
* ```migrations```, que contem todos os arquivos de migração; e
* ```seeders```, que contem todos os arquivos para popular a base.


## Aplicando gerenciamento de models, migrations e seeds

Os comandos básicos para cada função disponível pelo CLI devem ser executados pelo terminal dentro da pasta [api](/api).

### Criando Models e Migrations

Ao criar um Model, o CLI automaticamente gera um arquivo de Migration para o mesmo.  
  
No caso do projeto, o modelo **Example** foi criado com o seguinte comando:  
```
sequelize model:generate --name example --attributes name:string,description:string
```  
Gerando os arquivos [/api/models/example.js](/api/models/example.js) e [/api/migrations/20210304094404-create-example.js](/api/migrations/20210304094404-create-example.js).  
*Nota: qualquer associação entre models deverá ser adicionado a mão.*

### Rodando Migrations

Ao criar o model e a migration, para criar as tabelas no banco é necessário utilizar:
```
sequelize db:migrate
```  
O comando aplica os migrations pela ordem criada na pasta [migrations](/api/migrations) (que é pela data).
Para desfazer, temos
```
sequelize db:migrate:undo
```

### Criando Seeds

Para criar uma seed, basta executar o comando:  
```
sequelize seed:generate --name example-seed
```
Deverá gerar um arquivo dentro da pasta [seeders](/api/seeds), basta adicionar as tratativas desejadas.

### Aplicando Seeds

Para aplicar as seeds que não sofreram commit:
```
sequelize db:seed:all
```
Para desfazer a seed:
```
sequelize db:seed:undo
```

<sub>Mais informações em [Sequelize Migrations](https://sequelize.org/master/manual/migrations.html)</sub>
