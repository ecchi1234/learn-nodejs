class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // add this line to prevent adding app error class to stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
