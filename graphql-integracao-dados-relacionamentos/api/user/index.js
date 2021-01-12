const schema = require('./schema/user.graphql')
const resolvers = require('./resolvers/userResolvers')
const API = require('./datasource/user')

module.exports = config => {
    config.schemas.push(schema)
    config.resolvers.push(resolvers)
    config.api = {...config.api, usersAPI:new API() }
}