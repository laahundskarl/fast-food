export interface ProductListDTO {
    name?: string;
    categoryId?: string;
}

export interface ProductCreateDTO {
    name: string;
    description?: string;
    value: number;
    categoryId: string;
}

export interface ProductUpdateDTO {
    name?: string;
    description?: string;
    value?: number;
    categoryId?: string;
}
