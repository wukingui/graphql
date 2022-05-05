import { ApolloServer } from 'apollo-server-express';
import { formatError } from 'apollo-errors';
import { typeDefs, resolvers } from './models';


/**
 * 启动 graphql
 * @param  {Object} app - express 的 app
 */
export default async (app) => {
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    context: ({ req }) => {

      // 获取客户端请求ip
      let ip;
      if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].toString().split(",")[0];
      } else {
        ip = req.connection.remoteAddress;
      }
      
      return {
        user: req.user || null,
        role: req.role || '',
        ip
      }
    },
    // https://www.apollographql.com/docs/apollo-server/features/graphql-playground.html#Enabling-GraphQL-Playground-in-production
    introspection: true,
    playground: true
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}
