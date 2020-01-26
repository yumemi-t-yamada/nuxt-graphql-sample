export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Upload: any;
};

export enum CacheControlScope {
    Public = 'PUBLIC',
    Private = 'PRIVATE'
}

export type Population = {
    __typename?: 'Population';
    label: Scalars['String'];
    data: Array<PopulationCompositionPerYear>;
};

export type PopulationCompositionPerYear = {
    __typename?: 'PopulationCompositionPerYear';
    year: Scalars['Int'];
    value: Scalars['Int'];
};

export type Prefecture = {
    __typename?: 'Prefecture';
    prefCode: Scalars['Int'];
    prefName: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    prefectures: Array<Prefecture>;
    populationComposition: Array<PopulationCompositionPerYear>;
};

export type QueryPopulationCompositionArgs = {
    prefCode: Scalars['Int'];
    targetLabel: Scalars['String'];
};
