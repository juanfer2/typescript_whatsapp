import Queue from 'bull';
import opts from '../clients/job_client/config';

interface Priority{
  priority?: number
}

interface JobParams {
  name: string
  data?: any
  priority?: Priority
}

class TestJob {
  public name: string;
  public data: any;
  private queue: any;

  constructor(name: string, data = {}){
    this.name = name
    this.data = data
  }

  async startJob(options = {}): Promise<any>{
    this.queue = new Queue(this.name, opts);

    this.queue.process(async(job: any) =>{
      try {
        console.log('job.data')
        console.log(job.data)
      } catch (error) {
        Promise.reject(error);
      }
    });

    this.queue.add(this.data, options)
  }
}

export default TestJob;
