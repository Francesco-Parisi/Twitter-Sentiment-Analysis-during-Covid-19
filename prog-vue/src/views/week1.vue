<template>
    <div class="main">
        <div class="sidebar">
            <div class="link" @click="has=false; dat=false; viewchart=false">Top 5</div>
            <div class="link" @click="has=false; dat=false; general()">General</div>
            <div class="link" @click="has=true; dat=false; viewchart=false">By Hashtag</div>
            <div class="link" @click="dat=true; has=false; viewchart=false">By Data</div>
        </div>
        <div class="content">
            <div class="search" >
                <div class="data" v-if="dat">
                    <input type="date" v-model="formData.mydate">
                </div>
                <div class="hashtag" v-if="has">
                    #<input type="text" v-model="hashtag">
                </div>
                <button class="btn-search" @click="search" v-if="has || dat"> search </button>
            </div>

            <div class="principal">
                    <div v-if="viewchart"  class="Chart">
                    <GChart
                        type="PieChart"
                        :data="charData"
                        :options="charOptions"/>
                </div>
                <div v-if="viewchart"  class="Chart">
                    <GChart
                        type="BarChart"
                        :data="charData"
                        :options="charOptions"/>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import {GChart} from 'vue-google-charts'
var vueData = {};
vueData.mydate = "2020-11-17 14:50:31";
export default {
    name:'Week1',
    components:{
        GChart
    },
    data(){
        return{
            charData:[],
            charOptions:{
                title: 'Sentiment of the week',
                is3D: true,
                height:500,
                annotationText: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                legend: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                domain: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                colors: ['#FF0000', '#FF4343', '#FFD000', '#00FF00', '#43AF43']


 
            },
            formData:vueData,
            hashtag:"",
            tweets:[],
            has:false,
            dat:false,
            viewchart:false
        }
    },
    methods: {
        general(){
            console.log("avviato")
            
            this.charData=this.$store.getters.getSentimentWeek1;
            this.viewchart=true
        },
        pulizza(){
            this.charData=null
        },
        search(){
            if(this.has){
                this.charData= this.$store.getters.getSentimentByHashtagWeek1("#"+this.hashtag)
                this.viewchart=true;
            }
            else{
                console.log(this.formData.mydate)
                this.charData= this.$store.getters.getSentimentByDataWeek1(this.formData.mydate)
                this.viewchart=true;
                console.log(this.charData)
            }
        }
    },
    
}
</script>

<style lang="scss" scoped>
.main{
    background-color: beige;
    display: grid;
    grid-template-columns: 15% 85%;
    height: 100%;
    .sidebar{
        display:grid;
        grid-template-rows: repeat(4,40px);
        padding-left:10px;
        padding-top:50px;
    
        .link{
            line-height: 40px;
            text-align: center;
            font-weight: bold;
            background-color: rgba(140, 160, 153, 0.37);
            display: block;
            border-bottom: solid 1px black;
        }

    }
    .content{
    background-color: beige;

        display: grid;
        grid-template-rows: 100px calc(100% - 100px);
        .search{
            display:flex;
            height: 55px;
            padding-top:25px ;
            justify-content: center;
        }
        .principal{
            height: 100%;
            width: 100%;

        }
        
    }
}
</style>