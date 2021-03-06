const { GraphQLScalarType } = require('graphql')
const turmaResolvers = {
  Response: {
    __resolveType(obj, context, info) { 
      return false
    },
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
    turmas: (_, args, { dataSources }) => dataSources.turmasAPI.getTurmas(args),
    turma: (_, { id }, { dataSources }) => dataSources.turmasAPI.getTurma(id)
  },
  Mutation: {
    incluiTurma: (_, {turma}, { dataSources }) => dataSources.turmasAPI.incluiTurma(turma),
    atualizaTurma: (_, novosDados, { dataSources }) => dataSources.turmasAPI.atualizaTurma(novosDados),
    deletaTurma: (_, { id }, { dataSources }) => dataSources.turmasAPI.deletaTurma(id),
  },
  Turma: {
    matriculas: (parent, _, {dataSources})=> dataSources.matriculasAPI.getMatriculasPorTurma(parent.id),
    docente: (parent, _, {dataSources}) => dataSources.usersAPI.getUserById(parent.docente_id),
  }
};

module.exports = turmaResolvers