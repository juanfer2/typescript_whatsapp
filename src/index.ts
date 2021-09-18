import "./config";
import Server from "./server";
import logger from "./utils/logger/logger_util";

export const server = Server.init((process.env.PORT as unknown) as number);

server.start(() =>{
  logger.info(`🚀 Server is running at PORT: ${process.env.PORT}`)
  logger.info(`🚀 GraphQL is now running on http://localhost:${process.env.PORT}/graphql`)
});
