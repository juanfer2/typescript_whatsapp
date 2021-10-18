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
    username: 'calaca55',
    name: 'pepe calaca',
    password: 'asdqwe123',
    online: false,
    createdAt: new Date,
    updatedAt: new Date
  }

  
  test("should respond with OK", async () => {
    const { query, mutate }: any = await serverClient()
    const factory = await prismaMock.user.create.mockResolvedValue(params)
    const result = await mutate(REGISTER, { variables: params });
    const response: any = result['data']['register']

    expect(response['username']).toEqual(params.username);
    expect(response['name']).toEqual(params.name);
  });
});
