import { Service } from "typedi";
import logger from "../logger/logger_util";

@Service()
class ValidatorError extends Error {
  public data: any;
  constructor(message: any) {
    super(message);
    this.message = message.map((message: any) => Object.values(message.constraints).join(', ')).join(', ')
    this.name = this.constructor.name;
    this.data = this.message;

    logger.info(this.message)
  }
}

export default ValidatorError;
