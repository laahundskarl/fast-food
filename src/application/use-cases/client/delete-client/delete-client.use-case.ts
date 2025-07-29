export interface IDeleteClientUseCase {
    execute(cpf: string): Promise<void>;
}
