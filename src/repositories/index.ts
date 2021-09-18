import { PrismaClient, User } from '@prisma/client'
import { TypeMetadata } from 'class-transformer'
import logger from '../utils/logger/logger_util'
const prisma = new PrismaClient()

interface Repository {
  create: any;
  all: any;
}

let entity: string = ''

const create = async(data: any) =>  {
  return await prisma['user'].create({data})
}

const all = async() => {
  logger.info(entity)
  return await prisma['user'].findMany()
}

const finBy = async(fc: object) => {
  logger.info(entity)
  return await prisma['user'].findMany()
}

export function Repository(repository: string): Repository{
  entity = repository;

  return {
    create,
    all
  }
}

//const userRepository = Repository(u = User)
