  
import 'graphql-import-node'
import * as userTypeDefs from './schemas/users/user_schema.graphql'
import * as emptyTypeDefs from './schemas/empty.graphql'
import * as healtTypeDefs from './schemas/healt/healt.graphql'
import * as loginTypeDefs from './schemas/auth/login.graphql'
import * as registerTypeDefs from './schemas/auth/register.graphql'
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolverMap from './resolvers_map'

const schema = makeExecutableSchema({
  typeDefs: [emptyTypeDefs, userTypeDefs, healtTypeDefs, loginTypeDefs, registerTypeDefs],
  resolvers: resolverMap
})

//const schemaWithResolvers =  addResolversToSchema({schema, resolvers: resolverMap})

export default schema;
