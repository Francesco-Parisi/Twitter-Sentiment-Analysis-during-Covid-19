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
                        :data="charDataBar"
                        :options="charOptionsBar"/>
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
            
            title:"",
            charData:[],
            charDataBar:[],
            charOptions:{},
            charOptionsBar:{},
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
                this.charOptions={            
                    title: "General Sentiment Of The Week",
                    is3D: true,
                    height:500,
                    annotationText: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    legend: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    domain: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    colors: ['#FF0000', '#FF4343', '#FFD000', '#00FF00', '#43AF43']
                }

                 this.charOptionsBar={            
                    title: "General Sentiment Of The Week",

                    height:500,
                    annotationText: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    legend: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    domain: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                }
            let charts=this.$store.getters.getSentimentWeek(1);
            this.charData=charts.PieChart;
            this.charDataBar=charts.BarChart;
            this.viewchart=true
        },
        search(){
            if(this.has){
                this.charOptions={            
                    title: "Sentiment Of The Week for "+ this.hashtag,
                    is3D: true,
                    height:500,
                    annotationText: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    legend: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    domain: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    colors: ['#FF0000', '#FF4343', '#FFD000', '#00FF00', '#43AF43']
                }

                 this.charOptionsBar={            
                    title: "Sentiment Of The Week for "+ this.hashtag,

                    height:500,
                    annotationText: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    legend: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    domain: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                }
                let charts=this.$store.getters.getSentimentByHashtag("#"+this.hashtag,1)
                console.log(charts)
                this.charData= charts.PieChart;
                this.charDataBar= charts.BarChart;

                this.viewchart=true;
            }
            else{
                this.charOptions={            
                    title: "General Sentiment On "+this.formData.mydate,
                    is3D: true,
                    height:500,
                    annotationText: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    legend: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    domain: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    colors: ['#FF0000', '#FF4343', '#FFD000', '#00FF00', '#43AF43']
                }

                 this.charOptionsBar={            
                    title: "General Sentiment On "+this.formData.mydate,

                    height:500,
                    annotationText: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    legend: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    domain: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                }
               let charts=this.$store.getters.getSentimentByData(this.formData.mydate,1)
                 console.log(charts)
                this.charData= charts.PieChart;
                this.charDataBar= charts.BarChart
                this.viewchart=true;
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
    overflow: scroll;
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