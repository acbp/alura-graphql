const { GraphQLScalarType } = require('graphql')
const userResolvers = {
  IResponse: {
    __resolveType: () => false,
  },
  RoleType:{
    ESTUDANTE: "ESTUDANTE",
    DOCENTE: "DOCENTE",
    COORDENACAO: "COORDENACAO",
  },
  DateTime: new GraphQLScalarType(
    {
      name: 'DateTime',
      description: 'string de data e hora no formato ISO-8601',
      serialize: (v)=> v.toISOString(),
      parseValue: (v)=> new Date(v),
      parseLiteral: (ast)=> new Date(ast.value),
    }
  ),
  Query: {
    users: (parent, args, { dataSources }, info ) => dataSources.usersAPI.getUsers(),
    user: (parent, { id }, { dataSources }, info )=> dataSources.usersAPI.getUserById(id),
  },
  Mutation: {
    postUser:  (parent, {user}, { dataSources }, info )=> dataSources.usersAPI.postUser(user),
    putUser:  (parent, {user}, { dataSources }, info )=> dataSources.usersAPI.putUser(user),
    deleteUser:  (parent, {id}, { dataSources }, info )=> dataSources.usersAPI.deleteUser(id),
  }
};

module.exports = userResolvers;
