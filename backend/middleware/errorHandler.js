const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error('❌ Error:', err.stack);

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    error = { message, status: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, status: 400 };
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = { message, status: 404 };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Please log in again.';
    error = { message, status: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired. Please log in again.';
    error = { message, status: 401 };
  }

  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Server Error',
  });
};

module.exports = errorHandler;