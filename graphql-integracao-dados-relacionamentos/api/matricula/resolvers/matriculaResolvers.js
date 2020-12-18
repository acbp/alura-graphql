const { GraphQLScalarType } = require("graphql");
const matriculaResolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "string de data e hora no formato ISO-8601",
    serialize: (v) => v.toISOString(),
    parseValue: (v) => new Date(v),
    parseLiteral: (ast) => new Date(ast.value),
  }),
  Mutation: {
    matricularEstudante: (_, ids, { dataSources }) => dataSources.matriculasAPI.matricularEstudante(ids),
    deletarMatricula: (_, { matricula }, { dataSources }) => 
    dataSources.matriculasAPI.deletaMatricula(matricula),
    cancelarMatricula: (_, { matricula }, { dataSources }) => 
    dataSources.matriculasAPI.cancelarMatricula(matricula),
  },
  Matricula:{
    estudante: (parent, _, {dataSources}) => dataSources.usersAPI.getUserById(parent.estudante_id),
    turma: (parent, _, {dataSources}) => dataSources.turmasAPI.getTurma(parent.turma_id),
  }
};
module.exports = matriculaResolvers;
