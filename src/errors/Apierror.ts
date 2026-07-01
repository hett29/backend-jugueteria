import BaseError from "./baseerror"


class ApiError extends BaseError<string, string> {}


export default ApiError
