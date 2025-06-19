export interface ProductCreateDto {
    name: string;
    description?: string;
    value: number;
    categoryId: string;
}

export interface ProductListDto {
    name?: string;
    categoryId?: string;
}

export interface ProductUpdateDto {
    name?: string;
    description?: string;
    value?: number;
    categoryId?: string;
}
