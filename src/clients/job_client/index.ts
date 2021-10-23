"https://github.com/yeahoffline/redis-mock"
import Queue from 'bull';
import opts from './config';

import BullQueue from "bull";
import Redis from "ioredis";

interface Priority{
  priority?: number
}

interface JobParams {
  name: string
  data?: any
  priority?: Priority
}

export const job = async({name, data = {}, priority = {}}: JobParams) => {
  const queue: any = new Queue(name, opts);

  queue.process(async(job: any, done: any) =>{
    // job.data contains the custom data passed when the job was created
    // job.id contains id of this job.
    try {
      job.data;
      console.log('job.data')
      console.log(job.data)
  
      return Promise.resolve({ result: 'OK' });
    } catch (error) {
      Promise.reject(error);
    }
  });

  queue.add(data, priority)
}

class Job {
  public name: string;
  private queue: any;

  constructor(name: string){
    this.name = name
    this.queue = new Queue(this.name, opts);
  }

  async process(): Promise<any>{
    return this.queue(async(job: any, done: any) =>{
      // job.data contains the custom data passed when the job was created
      // job.id contains id of this job.

      // transcode video asynchronously and report progress
      job.progress(42);

      // call done when finished
      done();

      // or give a error if error
      done(new Error('error transcoding'));

      // or pass it a result
      done(null, { framerate: 29.5 /* etc... */ });

      // If the job throws an unhandled exception it is also handled correctly
      throw new Error('some unexpected error');
    });
  }
}

const redisConnection = process.env.REDIS_HOST
    ? new Redis(process.env.REDIS_HOST)
    : new Redis();

redisConnection.on("error", error => {
  console.log("ERROR initialising Redis connection", error.message);
});

// Setting up Redis connection.
redisConnection.on("connect", async () => {
  console.log(
    `The connection to Redis was correctly stablished - ${redisConnection.options.host}:${redisConnection.options.port}`
  );

  console.log("\nSetting up the queue...");

  try {
    const imageConverterQueue = new BullQueue("imageConverter", {
      redis: {
        host: redisConnection.options.host,
        port: redisConnection.options.port
      }
    });
  } catch (error) {
    console.log("ERROR setting up queue", error);
  }
});

export default Job;
