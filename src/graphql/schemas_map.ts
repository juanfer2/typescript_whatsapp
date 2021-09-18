  
import 'graphql-import-node'
import * as userTypeDefs from './schemas/users/user_schema.graphql'
import * as emptyTypeDefs from './schemas/empty.graphql'
import * as healtTypeDefs from './schemas/healt/healt.graphql'
import { makeExecutableSchema, addResolversToSchema } from '@graphql-tools/schema';
import resolverMap from './resolvers_map'
import { HealtResolver } from './resolvers/healt_resolver';
import * as AllTypes from './generated';
import { GraphQLSchema } from 'graphql'

const schema = makeExecutableSchema({
  typeDefs: [emptyTypeDefs, userTypeDefs, healtTypeDefs],
  resolvers: resolverMap
})

//const schemaWithResolvers =  addResolversToSchema({schema, resolvers: resolverMap})

export default schema;
