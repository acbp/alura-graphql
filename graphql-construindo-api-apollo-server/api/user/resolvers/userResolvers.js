const userResolvers = {
  Query: {
    users: (parent, args, { dataSources }, info) => dataSources.usersAPI.getUsers(),
    user: (parent, { id }, { dataSources } )=> dataSources.usersAPI.getUserById(id),
  },
};

module.exports = userResolvers;
