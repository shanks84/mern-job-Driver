import { StatusCodes } from "http-status-codes";
/*
  These are our custome made errors, which will be handled by our custom made error handler
*/

export class NotFoundError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "not-found";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export class BadRequestError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "BadRequestError";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export class UnAuthenticatedError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "UnAuthenticatedError-access";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export class UnauthorizedError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "UnauthorizedError";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
