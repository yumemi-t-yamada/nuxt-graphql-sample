import { Population } from './population';

export class PopulationResponse {
    message: string = '';
    result: {
        boundaryYear: number | null,
        data: Population[]
    } = {
        boundaryYear: null,
        data: []
    };
}
