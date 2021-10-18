import ServerTest, {serverClient} from '../../../server_test';
import { gql } from 'apollo-server'
// https://github.com/zapier/apollo-server-integration-testing

export const HEALT = gql`
  query{
    healt{
      status
    }
  }
`

describe("HEALT", () => {
  const responseOk = { data: { healt: { status: 'OK' } } }

  test("should respond with OK status code", async () => {
    const { query, mutate }: any = await serverClient()
    const result = await query(
      HEALT,
      // { variables: { id: 1 } }
    );
    //console.log(result['data']['healt']['status'])
    expect(result).toEqual(responseOk);
  });
});
