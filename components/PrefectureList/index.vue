<template>
    <v-card
        align-center
        class="prefecture-list d-flex flex-column flex-wrap mb-6"
    >
        <template v-for="pref in prefectureList">
            <v-checkbox
                :key="pref.prefName"
                v-model="pref.target"
                :label="pref.prefName"
                :dark="false"
                @change="onChangeTarget(pref)"
            >
            </v-checkbox>
        </template>
    </v-card>
</template>
<script lang="ts">
import { Component, PropSync, Emit } from 'nuxt-property-decorator';
import VueBase from '~/common/vue-base';
import Prefecture from '~/types/prefecture';

@Component
export default class PrefectureList extends VueBase {
    /**
     * 都道府県一覧
     * PropSyncを使用しないと下記の警告が出るため要注意
     * [Vue warn]: Avoid mutating a prop directly …
     */
    @PropSync('prefectures', { type: Array }) prefectureList!: Prefecture[];

    @Emit()
    private onChangeTarget(prefecture: Prefecture) {
        console.log('TargetPrefecture: ', prefecture);
        return prefecture;
    }
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
