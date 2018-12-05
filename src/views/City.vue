<template>
    <div class="view city-view">
        <div class="block">
            <div class="content">
                <div class="title text--bold">选择城市</div>
                <div class="inner-content hot-city">
                    <span class="sub-title text--bold">热门城市</span>
                    <span class="city text--green" v-for="item in hotCities" :key="item.city_id" @click="onCityClick(item)">
                        {{item.name}}
                    </span>
                </div>
                <div class="inner-content choose-city">
                    <span class="sub-title text--bold">按字母选择</span>
                    <div class="city-wrap" :key="index" v-for="(item, index) in allCities">
                        <span class="first-letter text--grey text--bold">{{item.firstLetter}}</span>
                        <span class="city" :class="{'text--green': city.hot === '1'}" :key="city.city_id" v-for="city in item.list" @click="onCityClick(city)">{{city.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { SET_CITYDATA } from '../vuex/mutation-types.js';
import apiUtil from '../util/apiUtil.js';
export default {
    name: 'city',
    data() {
        return {
            hotCities: [],
            allCities: []
        };
    },
    created() {
        this.getCityList();
    },
    methods: {
        getCityList: async function() {
            const { success, msg, res } = await apiUtil.postJSON(`v3_index/getAllRegion`, {});
            if (success && res.data) {
                const { hot_city, all_city } = res.data;
                this.hotCities = hot_city;
                this.generateAllCities(all_city);
            } else {
                this.$message.error(msg);
            }
        },

        generateAllCities: function(cities) {
            let allCities = [];
            for (const item of cities) {
                const firstLetter = item.pinyin.substring(0, 1);
                const index = allCities.findIndex(ele => ele.firstLetter === firstLetter);
                if (index > -1) {
                    allCities[index].list.push(item);
                } else {
                    allCities.push({ firstLetter, list: [item] });
                }
            }
            this.allCities = allCities;
        },

        onCityClick: function(data){
            if(!data.hasOwnProperty('city_id')){
                data.city_id = data.id;
                data.city_name = data.name;
            }
            this.$store.dispatch('setCityData', data)
            this.$router.push('/')
        }
    }
};
</script>
<style lang="stylus">
.city-view {
    .block {
        .content {
            box-sizing: border-box;
            padding: 40px;
            margin-top: 40px;
            .title {
                font-size: 30px;
                margin-bottom: 40px;
            }

            .inner-content {
                margin-bottom: 40px;

                .sub-title {
                    display: inline-block;
                    font-size: 20px;
                    width: 100px;
                }

                .city {
                    font-size: 18px;
                    margin-right: 18px;
                    cursor: pointer;
                }
            }

            .inner-content.choose-city {
                .sub-title {
                    margin-bottom: 33px;
                }
                .city-wrap {
                    margin-bottom: 40px;

                    .first-letter {
                        display: inline-block;
                        width: 50px;
                        margin-right: 30px;
                        font-size: 26px;
                    }

                    .city {
                        color: #666;
                    }

                    .city:hover {
                        color: #4cb955;
                    }
                }
            }
        }
    }
}
</style>


