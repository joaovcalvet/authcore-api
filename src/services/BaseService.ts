import UserService from "./UserService.ts";
import type BaseRepository from "../database/repositories/BaseRepository.ts";
import AuthService from "./AuthService.ts";
import JWTService from "./JWTService.js";

class BaseService
{
    private baseRepository: BaseRepository;

    public userService!: UserService;
    public authService!: AuthService;
    public jwtService! : JWTService;

    constructor(repository: BaseRepository)
    {
        this.baseRepository = repository;
        this.initialize();
    }

    private initialize(): void
    {
        this.jwtService = new JWTService();
        this.userService = new UserService(this.baseRepository.userRepository);
        this.authService = new AuthService(this.userService, this.jwtService);
    }
}

export default BaseService;