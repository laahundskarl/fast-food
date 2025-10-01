export interface ProductResponseDTO {
    id: string;
    name: string;
    value: number;
    description: string | null;
    category: {
        id: string;
        name: string;
    };
}
