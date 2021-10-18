import { makeExecutableSchema } from '@graphql-tools/schema';

export const authenticated = (next: any) => (root: any, args: any, context: any, info: any) => {
  if (!context.currentUser) {
    throw new Error(`Unauthenticated!`);
  }

  return next(root, args, context, info);
};
