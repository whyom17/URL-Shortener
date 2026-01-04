export default function wrapAsync(fn) {
    return function (req, res, next) {
      try {
        const result = fn(req, res, next);
        // If the handler returns a promise, attach a catch to forward errors to next
        if (result && typeof result.then === 'function') {
          result.catch(next);
        }
      } catch (err) {
        next(err);
      }
    };
  };