import { RequestHandler, Request, Response, NextFunction } from 'express';

export const serverOperationLogger: RequestHandler = (request: Request, response: Response, next: NextFunction) => {

    response.on('finish', () => {
        console.log(`[ ${request.method} | ${request.url} | ${response.statusCode} | ${new Date().toISOString()} ]`);
    })
    next();
}