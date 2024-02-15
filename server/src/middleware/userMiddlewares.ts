import { Request, Response, NextFunction } from 'express';

// Define the error handling middleware function
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode: number = err.statusCode || 500;
    const message: string = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
};

export default errorHandler;
