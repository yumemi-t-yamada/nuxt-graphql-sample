import { gql } from 'apollo-server-express';

export const typeDefs = gql`
type Query {
    allPrefectures: PrefectureResponse
    populationComposition(prefCode: Int!): PopulationResponse
}

type PrefectureResponse {
    message: String,
    result: [Prefecture]
}

type PopulationResponse {
    message: String,
    result: PopulationResult
}

type PopulationResult {
    boundaryYear: Int,
    data: [Population]
}

type Prefecture {
    prefCode: String,
    prefName: String
}

type Population {
    label: String,
    data: [PopulationData]
}

type PopulationData {
    year: Int,
    value: Int
}
`;
export default typeDefs;
