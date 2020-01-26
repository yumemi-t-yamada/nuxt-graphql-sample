export class PopulationResponse {
    message: string = '';
    result: PopulationResult = {
        boundaryYear: 0,
        data: []
    };
}

export class PopulationResult {
    boundaryYear: number = 0;
    data: Population[] = [];
}

export class Population {
    label: string = '';
    data: PopulationCompositionPerYear[] = [];
}

export class PopulationCompositionPerYear {
    year: number = 0;
    value: number = 0;
}
