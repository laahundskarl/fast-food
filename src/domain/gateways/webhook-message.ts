export interface IWebhookMessage {
    action: string;
    api_version: string;
    data: {
        id: string;
    };
    id: number;
    type: string;
}
