const { RESTDataSource } = require('apollo-datasource-rest')
const URL = `http://0.0.0.0:3000`

class UsersRepository extends RESTDataSource {
  constructor(){
    super();
    this.baseURL = URL;
  }

  async getUsers(){
    return this.get(`/users`);
  }

  async getUserById(id){
    return this.get(`/users/${id}`);
  }
} 

module.exports = UsersRepository
