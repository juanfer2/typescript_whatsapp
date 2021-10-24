import "./config";
import "./injector"
import {startJobs} from "./jobs/schedule_jobs"
import Server from "./server";
import logger from "./utils/logger/logger_util";
import Job, {job} from "./clients/job_client";
import TestJob from "./jobs/test_job";

export const server = Server.init((process.env.PORT as unknown) as number);

server.start(async() =>{
  const port = process.env.STAGE == 'producction' ? 
    'https://typescriptwhatsapp-production.up.railway.app/graphql' : 
    `http://localhost:${process.env.PORT}/graphql`

  logger.info(`🚀 Server is running at PORT: ${process.env.PORT}`)
  logger.info(`🚀 GraphQL is now running on ${port}`)

  //startJobs()
});
