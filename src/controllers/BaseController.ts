import type BaseService from "../services/BaseService.ts";

import AuthController from "./AuthController.ts";
import UserController from "./UserController.ts";

class BaseController
{
    private baseSvc: BaseService;

    public authController!: AuthController;
    public userController!: UserController;

    constructor(service: BaseService) 
    {
        this.baseSvc = service;
        this.initialize();
    }

    private initialize(): void
    {
        this.authController = new AuthController(this.baseSvc.userService, this.baseSvc.authService);
        this.userController = new UserController(this.baseSvc.userService, this.baseSvc.jwtService);
    }
}

export default BaseController;