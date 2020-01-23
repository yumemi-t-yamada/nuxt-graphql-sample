import axiosBase from 'axios';
import { PrefectureResponse } from '../../types/resas/prefecture-response';
import { PopulationResponse } from '../../types/resas/population-response';
import { IResolvers } from 'apollo-server-express';

const axios = axiosBase.create({
    baseURL: 'https://opendata.resas-portal.go.jp/api/v1',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-API-KEY': '9L7B8Z9TxVwbnPF8t1MEGOI5AAQmHh2pMQNfb1n8'
    },
    responseType: 'json'
  });

const resolvers: IResolvers = {
    Query: {
        allPrefectures: async () => getPrefectureList(),
        populationComposition: async (parent: any, args: any) => getPopulationComposition(parent, args)
    }
}

async function getPrefectureList() {
    console.log("getPrefectureList")
    const response = await axios.get<PrefectureResponse>('/prefectures')
        .then((response) => {
            console.log(response.data)
            return response.data;
        });
    return response;
}

async function getPopulationComposition(parent: any, args: any) {
    console.log("getPopulationComposition")
    for(let arg in args) {
        console.log(arg + ": " + args[arg])
    }
    const prefCode = args.prefCode;
    const response = await axios.get<PopulationResponse>('/population/composition/perYear'
    + '?prefCode=' + prefCode + '&cityCode=-')
        .then((response) => {
            console.log(response.data)
            return response.data
        });
    return response;
}

export default resolvers;
