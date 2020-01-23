<template>
    <v-layout>
        <v-flex>
            <v-card>
                <!-- <v-checkbox
                    v-for="(prefecture, i) in prefectures"
                    :key=i
                >
                {{ prefecture.}}
                </v-checkbox> -->
            </v-card>
            <v-card>
                bbbb
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Prefecture } from '../types/resas/prefecture';

@Component
export default class Resas extends Vue {
    prefectures: Prefecture[] = [];
}
</script>
