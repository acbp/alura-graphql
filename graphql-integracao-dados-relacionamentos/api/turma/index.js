const schema = require('./schema/turma.graphql')
const resolvers = require('./resolvers/turmaResolvers')
const API = require('./datasource/turma')

module.exports = config => {
    config.schemas.push(schema)
    config.resolvers.push(resolvers)
    config.api = {...config.api, turmasAPI:new API(config.sql) }
}