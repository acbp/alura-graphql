const { GraphQLScalarType } = require('graphql')
const turmaResolvers = {
  // IResponse: {
  //   __resolveType: () => false,
  // },
  // RoleType:{
  //   ESTUDANTE: "ESTUDANTE",
  //   DOCENTE: "DOCENTE",
  //   COORDENACAO: "COORDENACAO",
  // },
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
    turmas: (_, __, { dataSources }) => dataSources.turmasAPI.getTurmas(),
    turma: (_, { id }, { dataSources }) => dataSources.turmasAPI.getTurma(id)
  },
  Mutation: {
    incluiTurma: (_, {turma}, { dataSources }) => dataSources.turmasAPI.incluiTurma(turma),
    atualizaTurma: (_, novosDados, { dataSources }) => dataSources.turmasAPI.atualizaTurma(novosDados),
    deletaTurma: (_, { id }, { dataSources }) => dataSources.turmasAPI.deletaTurma(id),
  },
  
};

module.exports = turmaResolvers