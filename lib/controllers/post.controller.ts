import Controller from 'interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import { checkPostCount } from '../middlewares/checkPostCount.middleware';
import DataService from '../modules/services/data.service';
import Joi from 'joi';
import { validate } from 'graphql';

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();
    private dataService: DataService;

    constructor() {
        this.dataService = new DataService();
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

        const schema = Joi.object({
            title: Joi.string().required(),
            text:  Joi.string().required(),
            image: Joi.string().uri().required()
        });

        try {
            const validatedData = await schema.validateAsync({ title, text, image });
            await this.dataService.createPost(validatedData);
            response.status(200).json(validatedData);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Invalid input data.'});
        }
    }

    private removePost = async (request: Request, response: Response, next: NextFunction) => {
        const { id }: any = request.params;

        await this.dataService.deleteData({_id: id});
        response.sendStatus(200);
    }

    private getSome = async (request: Request, response: Response, next: NextFunction) => {
        const { num }: any = request.params;

        const allData = await this.dataService.getSomeData(num);
        response.status(200).json(allData);
    }

    private getAll = async (request: Request, response: Response, next: NextFunction) => {
        const allData = await this.dataService.query({});
        response.status(200).json(allData);
    }

    private deleteAll = async (request: Request, response: Response, next: NextFunction) => {
        await this.dataService.deleteData({});
        response.sendStatus(200);
    }
}
export default PostController;

