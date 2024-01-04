const httpStatus = require("http-status");
const { convertErrorToApiError, errorHandler } = require("../../../src/middlewares/error");
const httpMocks = require("node-mocks-http");
const ApiError = require("../../../src/utils/ApiError");
const config = require("../../../src/config/config");


describe("error middlewares test", () => {
  describe("error converter test", () => {

    test('should convert an Error without status to ApiError with status 500', () => {
      const error = new Error('Any error');
      const next = jest.fn();

      convertErrorToApiError(error, httpMocks.createRequest(), httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
          isOperational: false,
        })
      );
    });

    test("keep the api error as it is", () => {
      const apiError = new ApiError(httpStatus.FORBIDDEN, httpStatus[httpStatus.FORBIDDEN])
      const next = jest.fn();
      const req = httpMocks.createRequest()
      const res = httpMocks.createResponse()
      convertErrorToApiError(apiError, req, res, next)
      expect(next).toHaveBeenCalledWith(apiError)
      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        statusCode: httpStatus.FORBIDDEN,
        isOperational: true,
        message: httpStatus[httpStatus.FORBIDDEN],
      }))
    })
  })
  describe("errorHandler test",() => {
    test("should respond with expected error format, and stackTrace in development",() => {
      const res = httpMocks.createResponse()
      const sendSpy = jest.spyOn(res,'send')
      let next = jest.fn();
      const error = new ApiError(304,"some message")
      config.env = "development"
      errorHandler(error,
                   httpMocks.createRequest(), res, next)
      expect(sendSpy).toHaveBeenCalledWith(expect.objectContaining({
        code: 304,
        message: "some message",
        stackTrace: error.stack
      }))
      config.env = process.env.NODE_ENV
    })

    test("should respond with expected error format, and no  stackTrace in production",() => {
      const res = httpMocks.createResponse()
      const sendSpy = jest.spyOn(res,'send')
      let next = jest.fn();
      const error = new ApiError(504,"some message")
      config.env = "production"
      errorHandler(error,
                   httpMocks.createRequest(), res, next)
      expect(sendSpy).not.toHaveBeenCalledWith(expect.objectContaining({
        stackTrace: error.stack
      }))
      expect(sendSpy).toHaveBeenCalledWith(expect.objectContaining({
        code: 504,
        message: "some message",
      }))
      config.env = process.env.NODE_ENV
    })
  })
})
