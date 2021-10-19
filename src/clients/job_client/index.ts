import Queue from 'bull';
import opts from './config';

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

export default Job;
