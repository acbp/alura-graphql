const {ApolloServer}= require('apollo-server')
const { mergeTypeDefs } = require('graphql-tools')

const userResolvers = require('./user/resolvers/userResolvers')
// const produtoResolvers = require('./produtos/resolvers/produtoResolvers')

const userSchema = require('./user/schema/user.graphql')
// const produtoSchema = require('./produto/schema/produto.graphql')

// const resolvers = [userResolvers, produtoResolvers]
// const typeDefs = mergeTypeDefs([userSchema, produtoSchema]);

const resolvers = [userResolvers]
const typeDefs = mergeTypeDefs([userSchema]);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,  
    playground: true,
})
server
    .listen()
    .then( ({url}) => console.log(`Servido em ${url}`) )