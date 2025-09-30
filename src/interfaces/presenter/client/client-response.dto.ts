export interface ClientResponseDTO {
    id: string;
    name: string;
    cpf: string;
    email: string;
    orders?: OrderResponseDTO[];
}
