export class PrefectureResponse {
    message: string | null = null;
    result: Prefecture[] = [];
}
export class Prefecture {
    prefCode: number = 0;
    prefName: string = '';
}
