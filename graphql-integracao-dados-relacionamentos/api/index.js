const { ApolloServer } = require("apollo-server");
const { mergeTypeDefs } = require("graphql-tools");
const path = require("path");

const dbConfig = {
  client: "sqlite",
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, "./data/database.db"),
  },
};

const serverConfig = {
  schemas:[],
  resolvers:[],
  api:{},
  sql:dbConfig,
  dataSources: ()=> serverConfig.api
}

require("./loader")(serverConfig);

serverConfig.typeDefs = mergeTypeDefs(serverConfig.schemas);

const server = new ApolloServer(serverConfig);

server.listen().then(({ url }) => {
  console.log(`Servidor rodando na porta ${url}`);
});
