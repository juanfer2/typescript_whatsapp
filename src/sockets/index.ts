import SocketIO from "socket.io";

export const CONNECTION = 'connection';
export const DISCONNECT = 'disconnect'
export const GET_EXPENSES = 'get_expenses';

export interface ConnectionSocketIO{
  connected(): any;
  disconnected(): any;
}


class ConnectionSocket implements ConnectionSocketIO{
  private io: any;
  public socketIO: SocketIO.Socket;

  constructor(
    public serverHttp: any
  ) {
    console.log("Socket connected!");
    this.io = new SocketIO.Server(serverHttp, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    })
  }

  public connected(){
    //this.io.use((socket: any, next: any) => {
    //  const header = socket.handshake.headers['authorization'];
    //  const token = header.split(' ')[1];

    //  if (token) {
    //    return next();
    //  }
    //  return next(new Error('authentication error'));
    //});

    this.io.on(CONNECTION, (connectSocket: SocketIO.Socket) => {
      this.socketIO = connectSocket;

      this.socketIO.on("healt", (data:any) => {
        this.io.emit("healt", {status: "ok"});
      })

      this.socketIO.on("get_expenses", async(data: any) => {
        //const expensesService = new ExpensesService(data.token)
        //const expenses = await expensesService.expenses(data.id)
        //this.io.emit("get_expenses", expenses);
      })

      this.socketIO.on("get_news_expense", async(data: any) => {
        //const expensesService = new ExpensesService(data.token)
        //console.log('get_news_expense')
        //console.log(data)
        //await expensesService.createExpense(data.expense)
        //this.io.emit("get_news_expense", data.expense);
      })
    })
  }

  public disconnected(){
    this.io.on(DISCONNECT, function() {
      console.log("Disconnected!");
    });
  }

  public getSocket(): any{
    return this.socketIO;
  }
}

export default ConnectionSocket;
