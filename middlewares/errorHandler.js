// middlewares\authMiddleWare.js

const AppError = require('../utilities/appError');

const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'failed',
            message: err.message,
            errorCode: err.errorCode,
            details: err.details,
        });
    }

    console.error('Internal Server Error:', err);
    return res.status(500).json({
        status: 'failed',
        message: 'An internal server error occurred.',
    });
};

module.exports = errorHandler;
