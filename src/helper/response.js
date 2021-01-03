/* eslint-disable import/prefer-default-export */
export class Response {
  static success(res, status, msg, data) {
    res.status(status).json({
      msg,
      data,
    });
  }

  static error(res, status, error) {
    res.status(status).json({
      error,
    });
  }
}
