import type { Request, Response } from "express";
import type UserService from "../services/UserService.ts";
import type JWTService from "../services/JWTService.ts";

class UserController
{
    private userSvc: UserService;
    private jwtSvc: JWTService;

    constructor(userService: UserService, jwtService: JWTService)
    {
        this.userSvc = userService;
        this.jwtSvc = jwtService;
    }

    public async me(req: Request, res: Response): Promise<Response | void>
    {
        const claims = this.jwtSvc.getAccessTokenClaims(req.headers);
        const user = await this.userSvc.findUserById(claims.userId);

        return res.send({ message: "Usuário encontrado com sucesso!", data: user });
    }
}

export default UserController;