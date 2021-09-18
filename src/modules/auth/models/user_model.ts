export interface UserInput {
  id?: number | null;
  username: string;
  name: string;
  password?: string;
}

class User {
  public id: number | null;
  public username: string;
  public name: string;
  public password: string;

  constructor({id = null, username = '', name = '', password = '' }: UserInput){
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
  }
}

export default User;
