// Accepts an async function (requestHandler).
// Wraps it inside a Promise.
// If there’s an error, it automatically passes the error to Express's next() function.
// No need to write try-catch manually.

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
      Promise.resolve(requestHandler(req, res, next)).catch((err) => {
        next(err);
      });
    };
  };
  export { asyncHandler };
  