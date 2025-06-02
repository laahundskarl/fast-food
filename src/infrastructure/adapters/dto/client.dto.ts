export interface ClientCreateDto {
    cpf: string;
    name: string;
    email: string;
}

export interface ClientUpdateDto {
    cpf?: string;
    name?: string;
    email?: string;
}
