const users = [
  {
    id: 2,
    nome: "Ana Torre",
    ativo: true,
    email: "a@a.com",
    role: 1,
  },
  {
    id: 2,
    nome: "Gabriel Costa",
    ativo: true,
    email: "g@g.com",
    role: 1,
  },
];

const userResolvers = {
  Query: {
    users: () => users,
    // primeiroUser,
  },
};

module.exports = userResolvers;
