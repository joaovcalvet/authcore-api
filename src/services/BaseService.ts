import UserService from "./UserService.ts";
import type BaseRepository from "../database/repositories/BaseRepository.ts";
import AuthService from "./AuthService.ts";

class BaseService
{
    private baseRepository: BaseRepository;

    public userService!: UserService;
    public authService!: AuthService;

    constructor(repository: BaseRepository)
    {
        this.baseRepository = repository;
        this.initialize();
    }

    private initialize(): void
    {
        this.userService = new UserService(this.baseRepository.userRepository);
        this.authService = new AuthService(this.userService);
    }
}

export default BaseService;