const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const schema = gql(`
	type Query {
		olaMundo: String!
	}
`)

const resolvers = {
	Query: {
		olaMundo: ()=> `Olá, mundo!`
	}
}

const server = new ApolloServer( { typeDefs:schema, resolvers })
const app = express()
server.applyMiddleware({app})

app.listen({port: 4000},()=> console.log(`Servidor na porta 0.0.0.0:4000${server.graphqlPath}`))
//gql(schema, `{olaMundo}`, resolver).
//	then( resposta => console.log(resposta) )

