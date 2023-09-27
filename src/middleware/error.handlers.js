import { StatusCodes } from 'http-status-codes';

const EnumError = {
  CONTROLER_ERROR: 'CONTROLER_ERROR: ',
  INVALID_PARAMS: 'INVALID_PARAMS: ',
  DB_ERROR: 'DB_ERROR: ',
};

class HttpResponse {
  OK(res, message, data) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      statusMessage: message,
      data,
    });
  }

  CREATED(res, message, data) {
    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      statusMessage: message,
      data,
    });
  }

  BAD_REQUEST(res, message, data) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      statusMessage: message,
      data,
    });
  }

  NOT_FOUND(res, message, data) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: StatusCodes.NOT_FOUND,
      statusMessage: message,
      data,
    });
  }

  ERROR(res, message, data) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusMessage: message,
      data,
    });
  }
}

const Responses = {
  EnumError,
  HttpResponse,
};

export default Responses;
