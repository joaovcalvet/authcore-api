import type BaseRepository from "../database/repositories/BaseRepository.ts";

import UserService from "./UserService.ts";
import AuthService from "./AuthService.ts";
import JWTService from "./JWTService.ts";

class BaseService
{
    private baseRepo: BaseRepository;

    public userService!: UserService;
    public authService!: AuthService;
    public jwtService! : JWTService;

    constructor(repository: BaseRepository)
    {
        this.baseRepo = repository;
        this.initialize();
    }

    private initialize(): void
    {
        this.jwtService = new JWTService();
        this.userService = new UserService(this.baseRepo.userRepository);
        this.authService = new AuthService(this.userService, this.jwtService);
    }
}

export default BaseService;