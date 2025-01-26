import Controller from "interfaces/controller.interface";
import { Request, Response, NextFunction, Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import UserService from "../modules/services/user.service";
import PasswordService from "../modules/services/password.service";
import TokenService from "../modules/services/token.service";

class UserController implements Controller {
    public path = '/api/user';
    public router = Router();
    private userService = new UserService();
    private passwordService = new PasswordService();
    private tokenService = new TokenService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/create`, this.createNewOrUpdate);
        this.router.post(`${this.path}/auth`, this.authenticate);
        this.router.delete(`${this.path}/logout/:userId`, this.removeHashSession);
        this.router.patch(`${this.path}/changepassword/:userId`, this.changePassword);
    }

    private changePassword = async (request: Request, response: Response, next: NextFunction) => {
        const {oldPassword, newPassword} = request.body;
        const {userId} = request.params;

        try {
            await this.passwordService.authorize(userId, await this.passwordService.hashPassword(oldPassword));

            const hashedPassword = await this.passwordService.hashPassword(newPassword);
            this.passwordService.createOrUpdate({
                userId: userId,
                password: hashedPassword
            });

            return response.status(200).json({response: 'Password changed successfully'});
            
        } catch (error) {
            console.error(`Error: ${error.message}`);
            return response.status(401).json({error: 'Error'});
        }
    }

    private authenticate = async (request: Request, response: Response, next: NextFunction) => {
        const {login, password} = request.body;

        try {
            const user = await this.userService.getByEmailOrName(login);
            if (!user) {
                return response.status(401).json({error: 'Unauthorized'});
            }

            await this.passwordService.authorize(user.id, await this.passwordService.hashPassword(password));
            const token = await this.tokenService.create(user);

            return response.status(200).json(this.tokenService.getToken(token));
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            return response.status(401).json({error: 'Unauthorized'});
        }
    };

    private createNewOrUpdate = async (request: Request, response: Response, next: NextFunction) => {
        const userData = request.body;
        try {
            const user = await this.userService.createNewOrUpdate(userData);
            if (userData.password) {
                const hashedPassword = await this.passwordService.hashPassword(userData.password)
                await this.passwordService.createOrUpdate({
                    userId: user._id,
                    password: hashedPassword
                });
            }
            response.status(200).json(user);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Bad request', value: error.message});
        }
    };

    private removeHashSession = async (request: Request, response: Response, next: NextFunction) => {
        const {userId} = request.params
        try {
            const result = await this.tokenService.remove(userId);
            response.status(200).send(result);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({error: 'Unauthorized'});
        }
    };
}
     

export default UserController;