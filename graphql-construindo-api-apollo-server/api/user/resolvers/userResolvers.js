const userResolvers = {
  Query: {
    users: (parent, args, { dataSources }, info ) => dataSources.usersAPI.getUsers(),
    user: (parent, { id }, { dataSources }, info )=> dataSources.usersAPI.getUserById(id),
  },
  Mutation: {
    postUser:  (parent, user, { dataSources }, info )=> dataSources.usersAPI.postUser(user),
    putUser:  (parent, user, { dataSources }, info )=> dataSources.usersAPI.putUser(user),
    deleteUser:  (parent, {id}, { dataSources }, info )=> dataSources.usersAPI.deleteUser(id),
  }
};

module.exports = userResolvers;
