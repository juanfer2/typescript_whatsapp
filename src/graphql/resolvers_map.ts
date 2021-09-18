import { mergeResolvers } from '@graphql-tools/merge'
import { IResolvers } from '@graphql-tools/utils'
import { merge } from 'lodash'
import { HealtResolver } from './resolvers/healt_resolver'


const resolverMap: IResolvers = mergeResolvers([HealtResolver])
export default resolverMap;
