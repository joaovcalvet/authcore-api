export class DomainError extends Error 
{
    constructor(message: string)
    {
        super(message);
    }
}

export class EmailAlreadyExistsError extends DomainError 
{
    constructor()
    {
        super("Esse email já está em uso!");
    }
}