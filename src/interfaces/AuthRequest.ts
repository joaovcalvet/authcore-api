export interface LoginRequestBody
{
    email?: string;
    password?: string;
}

export interface RegisterRequestBody
{
    email?: string;
    password?: string;
    confirmPassword?: string;
}