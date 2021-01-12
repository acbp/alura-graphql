const schema = require('./schema/matricula.graphql')
const resolvers = require('./resolvers/matriculaResolvers')
const API = require('./datasource/matricula')

module.exports = config => {
    config.schemas.push(schema)
    config.resolvers.push(resolvers)
    config.api = {...config.api, matriculasAPI:new API(config.sql) }
}