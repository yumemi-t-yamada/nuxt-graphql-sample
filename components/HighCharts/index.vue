<template>
    <v-card>
        <highcharts class="chart" :options="chartOptions"></highcharts>
    </v-card>
</template>

<script lang="ts">
import { Component, Watch, PropSync } from 'nuxt-property-decorator';
import { Chart } from 'highcharts-vue';
import { Options } from 'highcharts';
import VueBase from '~/common/vue-base';

@Component({
    components: {
        highcharts: Chart
    }
})
export default class HighCharts extends VueBase {
    @PropSync('seriesDatas', { type: Array }) private seriesDataList!: any[];
    private chartOptions: Options;
    constructor() {
        super();
        this.chartOptions = {
            title: {
                text: '都道府県別人口構成推移 1980 ~ 2020'
            },

            subtitle: {
                text: ''
            },

            xAxis: {
                title: {
                    text: '年度',
                    align: 'high'
                },
                tickInterval: 10,
                max: 2020,
                min: 1980
            },
            yAxis: {
                title: {
                    text: '人口数',
                    align: 'high',
                    x: 50,
                    y: -15,
                    rotation: 360
                },
                tickInterval: 500000,
                min: 0
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointInterval: 10,
                    pointStart: 1980
                }
            },

            series: [],

            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }
                ]
            }
        };
    }

    @Watch('seriesDataList')
    onChangeSeriesDataList(dataList: any[]) {
        console.log(dataList);
        this.chartOptions.series = dataList;
    }
}
</script>
