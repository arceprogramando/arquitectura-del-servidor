import { StatusCodes } from 'http-status-codes';

const EnumError = {
  ROUTING_ERROR: 'ROUTING ERROR',
  INVALID_TYPES_ERROR: 'INVALID_TYPES_ERROR',
  CONTROLER_ERROR: 'CONTROLER_ERROR',
  DB_ERROR: 'DB_ERROR',
  INVALID_PARAMS: 'INVALID_PARAMS',
};

class HttpResponse {
  OK(res, message, data) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      statusMessage: message,
      data,
    });
  }

  NotFound(res, message, data) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: StatusCodes.NOT_FOUND,
      statusMessage: message,
      data,
    });
  }

  Unauthorized(res, message, data) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      statusMessage: message,
      data,
    });
  }

  Forbiden(res, message, data) {
    return res.status(StatusCodes.FORBIDDEN).json({
      status: StatusCodes.FORBIDDEN,
      statusMessage: message,
      data,
    });
  }

  BadRequest(res, message, data) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      statusMessage: message,
      data,
    });
  }

  Error(res, message, data) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusMessage: message,
      data,
    });
  }
}

export default { EnumError, HttpResponse };
