const { RESTDataSource } = require('apollo-datasource-rest')
const URL = `http://0.0.0.0:3000`

class UsersRepository extends RESTDataSource {
  constructor(){
    super();
    this.baseURL = URL
  }

  async getUsers(){
    const users = await this.get(`/users`)
    return users.map( async u => await this.mapUserRole(u) )
  }

  async getUserById(id){
    const user = await this.get(`/users/${id}`)
    return await this.mapUserRole(user)
  }

  async getRoleById(id){
    return this.get(`/roles/${id}`)
  }

  async postUser(user){
    const length = (await this.get(`/users`)).length+1
    // todo: validação role
    const roleId = (await this.get(`/roles?type=${user.role}`))[0].id
    return this.post(
      `users`,
      {
        ...user,
        id: length,
        role:roleId
      }
    )
  }

  async putUser(user){
    const roleId = (await this.get(`/roles?type=${user.role}`))[0].id
    return this.put(
      `users/${user.id}`,
      {
        ...user,
        role:roleId
      }
    )
  }

  async deleteUser(id){
    await this.delete(`users/${id}`)
    return id
  }

  async mapUserRole(user){
    return {
      ...user,
      role: await this.getRoleById(user.role)
    }
  }
} 

module.exports = UsersRepository
