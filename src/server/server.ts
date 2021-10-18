import morgan from "morgan";
import app from "../app";
import http from 'http';
import { LOG_FORMAT } from "../constants/enviroments_contants";
import logger, { stream } from "../utils/logger/logger_util";
import UserRepository from "../modules/auth/repositories/user_repository";
import { User } from "@prisma/client";
import { Repository } from "../repositories";
import { ApolloServer } from 'apollo-server-express'
import compression from 'compression';
import cors from 'cors';
import schema from '../graphql/schemas_map'
import { context } from "../graphql/context_config";
import express from "express";



class Server {
  public port: string;

  constructor(port: string) {
    this.port = port
  }

  async start() {
    const allowedOrigins = ['*'];

    
    // application logger setup
    //app.use(morgan(LOG_FORMAT, { stream }));
    // Graphql
    app.use(compression());
    const serverApollo = new ApolloServer({
      schema,
      context,
      
    })
    
    // CORS configuration
    const options: cors.CorsOptions = {
      origin: (origin: any, callback) => {
        const whitelist = [
            "*",
            "http://localhost:3001"
        ];

        if (whitelist.indexOf(origin) !== -1) {
          logger.info('succes')
          callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
      credentials: true,
      allowedHeaders: ['*'],
      methods: ['*'],
      preflightContinue: false
    };
    
    
    // without this, apollo will throw an error.
    await serverApollo.start();

    

    serverApollo.applyMiddleware({ 
      app, 
      path: '/graphql',
      cors: {
        credentials: true,
        //methods: "*",
        origin: (origin: any, callback) => {
            logger.info('===================server===========================')

            logger.info(origin)
            const whitelist = [
                "*",
                "http://localhost:3001"
            ];
            if (whitelist.indexOf("*") !== -1) return callback(null, true)

            //if (whitelist.indexOf(origin) !== -1) {
            //    callback(null, true)
            //} else {
            //    callback(new Error("Not allowed by CORS"))
            //}
        },
        //allowedHeaders: "*"
    },
    })
    

    //app.use(cors(options));
    //app.use(express.json());
    app.use(cors({ credentials: true, origin: (origin: any, callback) => {
      logger.info('==============================================')

      logger.info(origin)
      const whitelist = [
          "*",
          "http://localhost:3001"
      ];

      if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
      } else {
          callback(new Error("Not allowed by CORS"))
      }
  }, }));
    
    //const serverConnection = http.createServer(app);
    //startConnectionSocket(serverConnection);

    
    app.get('/', async (req, res) => {
      // logger.info('USERS')
          // logger.info('User')
          // const rs = Repository('user')
          // console.log(await rs.all())
          // logger.info('Create User')
          // console.log(await rs.create({
          //   username: 'Juanfer123asdf',
          //   name: 'Juanfer',
          //   password: 'asdqwe123'
          // }))
          // const r = new UserRepository
          // console.log(await r.all())
      res.send({status: "ok"})
    })
  
    app.listen(this.port, () => {
      logger.info(`🚀 Server is running at PORT: ${process.env.PORT}`)
      logger.info(`🚀 GraphQL is now running on http://localhost:${process.env.PORT}/graphql`)
  })
    //serverConnection.listen(this.port, () => {
    //  logger.info(`🚀 Server is running at PORT: ${process.env.PORT}`)
    //  logger.info(`🚀 GraphQL is now running on http://localhost:${process.env.PORT}/graphql`)
    //});
  }
}

export default Server;
