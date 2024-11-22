import Controller from 'interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getOne);
        this.router.post(`${this.path}`, this.addData);
        this.router.delete(`${this.path}/:id`, this.deleteOne);
        this.router.get(`${this.path}s/:num`, this.getSome);
        this.router.get(`${this.path}s`, this.getAll);
        this.router.delete(`${this.path}s`, this.deleteAll)
        
    }

    private getOne = async (request: Request, response: Response, next: NextFunction) => {
        const { id }: any = request.params;
        
        response.status(200).json(testArr[id-1]);
    }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { elem } = request.body;

        testArr.push(elem);
        response.status(200).json(testArr);
    }

    private deleteOne = async (request: Request, response: Response, next: NextFunction) => {
        const { id }: any = request.params;

        if (id > 0 && id <= testArr.length) {
            testArr.splice(id - 1, 1);
            response.status(200).json({
                response:"Usunięto",
                updatedArray:testArr
            });
        } else {
            response.status(404).json({
                response:"Nie znaleziono elementu do usunięcia",
                array:testArr
            });
        }
    }

    private getSome = async (request: Request, response: Response, next: NextFunction) => {
        const { num }: any = request.params;

        const dispArr = testArr.slice(0, num);

        response.status(200).json(dispArr);
    }

    private getAll = async (request: Request, response: Response, next: NextFunction) => {
        response.status(200).json(testArr);
    }

    private deleteAll = async (request: Request, response: Response, next: NextFunction) => {
        testArr = [];
        
        response.status(200).json({
            response:"Usunięto",
            updatedArray:testArr
        });
    }
}
export default PostController;

