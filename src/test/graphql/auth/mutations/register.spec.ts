import ServerTest, {serverClient} from '../../../server_test';
import { gql } from 'apollo-server'
import { prismaMock } from '../../../prisma_singleton'
import { User } from '.prisma/client';
// https://github.com/zapier/apollo-server-integration-testing

export const REGISTER = gql`
  mutation register(
    $username: String!, 
    $name: String!, 
    $password: String!) {
    register(userInput: {
        username: $username
      name: $name
      password: $password}) {
      id
      username
      name
      token
    }
  }
`

describe("AUTH", () => {
  const params: User = {
    id: 96969,
    username: '',
    name: '',
    password: '',
    online: false,
    createdAt: new Date,
    updatedAt: new Date
  }
  
  test("should validate if username, name and password is empty", async () => {
    const { mutate }: any = await serverClient()
    const result = await mutate(REGISTER, { variables: params });
    const response: any = result['errors'][0]['message']

    expect(response).
      toEqual('ValidatorError: El nombre no puede estar vacío, '+
        'El username no puede estar vacío, El password no puede estar vacío')
  });

  test("should validate if password is empty", async () => {
    params.name = 'pepe calaca'
    const { mutate }: any = await serverClient()
    const result = await mutate(REGISTER, { variables: params });
    const response: any = result['errors'][0]['message']
    expect(response).
      toEqual('ValidatorError: El username no puede estar vacío, '+
      'El password no puede estar vacío')
  });

  test("should validate if name and password is empty", async () => {
    params.username = 'pepe calaca'
    const { mutate }: any = await serverClient()
    const result = await mutate(REGISTER, { variables: params });
    const response: any = result['errors'][0]['message']
    expect(response).toEqual('ValidatorError: El password no puede estar vacío')
  });

  test("should create user", async () => {
    params.password = 'asdqwe123'
    const { mutate }: any = await serverClient()
    const factory = await prismaMock.user.create.mockResolvedValue(params)
    const result = await mutate(REGISTER, { variables: params });
    const response: any = result['data']['register']

    expect(response['username']).toEqual(params.username);
    expect(response['name']).toEqual(params.name);
  });
});
