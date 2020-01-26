import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
        prefectures: [Prefecture!]!
        populationComposition(
            prefCode: Int!
            targetLabel: String!
        ): [PopulationCompositionPerYear!]!
    }

    type Prefecture {
        prefCode: Int!
        prefName: String!
    }

    type Population {
        label: String!
        data: [PopulationCompositionPerYear!]!
    }

    type PopulationCompositionPerYear {
        year: Int!
        value: Int!
    }
`;
export default typeDefs;
