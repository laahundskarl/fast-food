export function httpPresenter(data: any, status: number) {
    return {
        status,
        data,
    };
}
