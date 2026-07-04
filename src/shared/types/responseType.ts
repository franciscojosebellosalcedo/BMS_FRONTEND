export interface TResponseHttp<T> {
    ok: boolean;
    code: string;
    message: string;
    statusCode: number;
    data: T;
}