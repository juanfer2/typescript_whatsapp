import '../injector'
import "../config";
import logger, { stream } from "../utils/logger/logger_util";
import { ApolloServer } from 'apollo-server-express'

import schema from '../graphql/schemas_map'
import { context } from "../graphql/context_config";
import { graphql, Source } from "graphql";
import { createTestClient } from 'apollo-server-integration-testing';

export const serverClient = async() => {
  try {
    const serverApollo = new ApolloServer({
      schema,
      context
    })

    // without this, apollo will throw an error.
    await serverApollo.start();

    return createTestClient({
      apolloServer: serverApollo,
    });
  } catch (error) {
    console.error(error) 
  }
}

class ServerTest {
  async server(){
    try {
      const serverApollo = new ApolloServer({
        schema,
        context
      })

      // without this, apollo will throw an error.
      await serverApollo.start();

      return createTestClient({
        apolloServer: serverApollo,
      });
    } catch (error) {
      console.error(error) 
    }
  }
}


export default ServerTest;

