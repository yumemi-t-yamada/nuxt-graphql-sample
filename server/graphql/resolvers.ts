import axiosBase from 'axios';
import {
    PrefectureResponse,
    Prefecture,
    PopulationResponse,
    PopulationCompositionPerYear
} from '../types/resas/index';

const axios = axiosBase.create({
    baseURL: 'https://opendata.resas-portal.go.jp/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-API-KEY': '9L7B8Z9TxVwbnPF8t1MEGOI5AAQmHh2pMQNfb1n8'
    },
    responseType: 'json'
});

async function getPrefectureList(): Promise<Prefecture[]> {
    const response = await axios
        .get<PrefectureResponse>('/prefectures')
        .then((response) => {
            return response.data.result;
        });
    return response;
}

async function getPopulationComposition(
    _parent: any,
    args: any
): Promise<PopulationCompositionPerYear[]> {
    const prefCode = args.prefCode;
    const targetLabel = args.targetLabel;
    const response = await axios
        .get<PopulationResponse>(
            '/population/composition/perYear' +
                '?prefCode=' +
                prefCode +
                '&cityCode=-'
        )
        .then((response) => {
            // パラメータのラベルと同一の人口データを取得
            const targetData =
                response.data.result.data.find(
                    (data) => data.label === targetLabel
                ) || null;
            // TSLintがうるさいので非nullアサーション演算子で回避
            const populationList = targetData!.data;
            // 人口数データ
            // １９８０年から１０年単位で取得
            const result = populationList.filter((data) => {
                return data.year >= 1980 && data.year % 10 === 0;
            });
            return result;
        });
    return response;
}

const resolvers = {
    Query: {
        prefectures: () => getPrefectureList(),
        populationComposition: (parent: any, args: any) =>
            getPopulationComposition(parent, args)
    }
};

export default resolvers;
