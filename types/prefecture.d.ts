import { Prefecture as P } from './gql/types';

export default class Prefecture implements P {
    __typename?: 'Prefecture';
    prefCode: number;
    prefName: string;
    target: boolean;
}
