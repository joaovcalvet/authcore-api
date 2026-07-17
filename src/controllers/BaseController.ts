import type { PrismaClient } from "../database/generated/prisma/client.ts";

import AuthController from "./AuthController.ts";
import type BaseService from "../services/BaseService.ts";

class BaseController
{
    private baseService: BaseService;

    public authController!: AuthController;

    constructor(service: BaseService) 
    {
        this.baseService = service;
        this.initialize();
    }

    private initialize(): void
    {
        this.authController = new AuthController(this.baseService.userService, this.baseService.authService);
    }
}

export default BaseController;