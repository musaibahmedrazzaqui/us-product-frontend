export default class HttpException extends Error {
    statusCode?: number;
    constructor(message: string, statusCode: number) {
      super(message);
      this.message = message;
      this.statusCode = statusCode;
    }
    getStatusCode() {
      return this.statusCode;
    }
    getErrorMsg() {
      return this.message;
    }
  }
  