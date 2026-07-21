export interface FieldError
{
    field: PropertyKey[],
    message: string
}

export interface ErrorResponse
{
    message: string,
    errors: FieldError[]
}