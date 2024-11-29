import Controller from 'interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import { checkPostCount } from '../middlewares/checkPostCount.middleware';
import DataService from '../modules/services/data.service';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];


class PostController implements Controller {
    public path = '/api/post';
    public router = Router();
    public dataService: DataService;
    

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getElementById);
        this.router.post(`${this.path}`, this.addData);
        this.router.delete(`${this.path}/:id`, this.removePost);
        this.router.get(`${this.path}s/:num`, checkPostCount, this.getSome);
        this.router.get(`${this.path}s`, this.getAll);
        this.router.delete(`${this.path}s`, this.deleteAll)
    }

    private getElementById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.query({_id: id});
        response.status(200).json(allData);
    }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { title, text, image } = request.body;

        const readingData = {
            title,
            text,
            image
        };

        try {
            await this.dataService.createPost(readingData);
            response.status(200).json(readingData);
        } catch (error) {
            console.log('eeee', error)

            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Invalid input data.'});
        }
    }

    private removePost = async (request: Request, response: Response, next: NextFunction) => {
        const { id }: any = request.params;

        await this.dataService.deleteData({_id: id});
        response.sendStatus(200);
    }

    // TO DO
    private getSome = async (request: Request, response: Response, next: NextFunction) => {
        const { num }: any = request.params;

        const dispArr = testArr.slice(0, num);

        response.status(200).json(dispArr);
    }

    // TO DO
    private getAll = async (request: Request, response: Response, next: NextFunction) => {
        response.status(200).json(testArr);
    }

    // TO DO
    private deleteAll = async (request: Request, response: Response, next: NextFunction) => {
        testArr = [];
        
        response.status(200).json({
            response:"Usunięto",
            updatedArray:testArr
        });
    }
}
export default PostController;

