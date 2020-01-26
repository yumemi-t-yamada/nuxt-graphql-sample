<template>
    <v-layout column>
        <v-flex xs12 sm8 md6>
            <no-ssr>
                <PrefectureList
                    :prefectures="prefectures"
                    @on-change-target="refreshChart"
                />
                <HighCharts :series-datas="seriesDatas" />
            </no-ssr>
        </v-flex>
    </v-layout>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator';
import VueBase from '~/common/vue-base';
import PrefectureList from '~/components/PrefectureList/index.vue';
import {
    PopulationCompositionPerYear,
    QueryPopulationCompositionArgs
} from '~/types/index';
import Prefecture from '~/types/prefecture';
import prefectures from '~/types/gql/query/prefectures.graphql';
import populationComposition from '~/types/gql/query/populationComposition.graphql';
import HighCharts from '~/components/HighCharts/index.vue';
@Component({
    components: {
        PrefectureList,
        HighCharts
    }
})
export default class Resas extends VueBase {
    private prefectures: Prefecture[];
    private seriesDatas: any[];

    constructor() {
        super();
        this.prefectures = [];
        this.seriesDatas = [];
    }

    private async mounted() {
        this.prefectures = await this.getPrefectures();
    }

    private refreshChart(prefecture: Prefecture): void {
        console.log(prefecture);
        if (prefecture.target) {
            const prefCode = prefecture.prefCode;
            const prefName = prefecture.prefName;
            this.createSeries(prefCode, prefName);
        } else {
            this.removeSeries(prefecture.prefCode);
        }
    }

    private async createSeries(
        prefCode: number,
        prefName: string
    ): Promise<void> {
        const populationData = await this.getPopulationComposition(prefCode);
        const dataList = populationData.map((data) => data.value);
        const result = {
            type: 'line',
            code: prefCode,
            name: prefName,
            data: dataList
        };
        this.seriesDatas.push(result);
    }

    private removeSeries(prefCode: number): void {
        this.seriesDatas = this.seriesDatas.filter(
            (data) => data.code !== prefCode
        );
    }

    private async getPrefectures(): Promise<Prefecture[]> {
        const result = await this.$apollo
            .query<{
                prefectures: Prefecture[];
            }>({
                query: prefectures
            })
            .then((res) => {
                const result = res.data.prefectures.map((data) => {
                    return data;
                });
                return result;
            });
        return result;
    }

    private async getPopulationComposition(
        prefCode: number
    ): Promise<PopulationCompositionPerYear[]> {
        const variables: QueryPopulationCompositionArgs = {
            prefCode,
            targetLabel: '総人口'
        };
        const populationData = await this.$apollo
            .query<{
                populationComposition: PopulationCompositionPerYear[];
            }>({
                query: populationComposition,
                variables
            })
            .then((res) => {
                return res.data.populationComposition;
            });
        return populationData;
    }
}
</script>
