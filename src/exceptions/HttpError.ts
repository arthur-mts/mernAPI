export enum HttpStatusCode {
  SUCCESS = 200,
  INTERNAL_SERVER_ERROR = 500,
  CONFLICT = 409,
  NOT_FOUND = 404,
  ERROR = 400
}

export default class HttpError extends Error {
  public statusCode : number;

  constructor(statusCode : number = HttpStatusCode.ERROR, message: string = 'An error has ocurred') {
    super(message);
    this.statusCode = statusCode;
  }
}


