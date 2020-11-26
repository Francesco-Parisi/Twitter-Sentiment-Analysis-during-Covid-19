<template>
    <div class="main">
        <div class="sidebar">
            <div class="link" @click="has=false; dat=false ">Top 5</div>
            <div class="link" @click="has=false; dat=false">General</div>
            <div class="link" @click="has=true; dat=false">By Hashtag</div>
            <div class="link" @click="dat=true; has=false">By Data</div>
        </div>
        <div class="content">
            <div class="search" v-if="has || dat">
                <div class="data" v-if="dat">
                    <input type="date" v-model="formData.mydate">
                </div>
                <div class="hashtag" v-if="has">
                    #<input type="text" v-model="hashtag">
                </div>
                <button class="btn-search" @click="search"> search </button>
            </div>

            <div class="principal">
                <div class="tweetList">
                    <div v-for="(tweet,index) in tweets" :key="index">
                        {{tweet.Testo}}
                    </div>
                </div>
                <div class="Chart">GRAFICO</div>
            </div>

        </div>
    </div>
</template>

<script>

var vueData = {};

vueData.mydate = "2020-11-17 14:50:31";
export default {
    name:'Week1',
    data(){
        return{
            formData:vueData,
            hashtag:"",
            tweets:[],
            has:false,
            dat:false,
        }
    },
    methods: {
        search(){
            if(this.has){
                this.tweets= this.$store.getters.getTopFiveRetweetByHashtagWeek1("#"+this.hashtag)
            }
            else{
                console.log(this.formData.mydate)
                this.tweets= this.$store.getters.getTopFiveRetweetByDateWeek1(this.formData.mydate)
                console.log(this.tweets)
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.main{
    display: grid;
    grid-template-columns: 15% 85%;
    height: 100%;
    .sidebar{
        display:grid;
        grid-template-rows: repeat(4,40px);
        .link{
            background-color: aquamarine;
            display: block;
        }

    }
    .content{
        display: grid;
        grid-template-rows: 100px calc(100% - 100px);
        .search{
            display:flex;
            height: 55px;
            padding-top:25px ;
            justify-content: center;
        }
    }
}
</style>