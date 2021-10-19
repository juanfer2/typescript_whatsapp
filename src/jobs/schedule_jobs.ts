import logger from "../utils/logger/logger_util"
import TestJob from "./test_job"

const jobList = [
  new TestJob('test').startJob({repeat: { cron: '53 4 * * *' }})
]

export const startJobs = () =>{
  logger.info('schedule jobs')
  jobList.map( job => job )
}
