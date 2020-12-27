<template>
    <div class="main">
        <div class="sidebar">
            <div class="link" @click="has=false; dat=false; general()">General</div>
            <div class="link" @click="has=true; dat=false; viewchart=false">By Hashtag</div>
            <div class="link" @click="dat=true; has=false; viewchart=false">By Data</div>
        </div>
        <div class="content">
            <div class="search"  v-show="has || dat">
                <div class="data" v-if="dat">
                    <input type="date" v-model="formData.mydate">
                    <div class="btn"><button class="btn-search" @click="search" v-if="has || dat"> search </button></div>

                </div>
                <div class="hashtag" v-if="has">
                    <div><input type="radio" id="andratuttobene" value="#andratuttobene" v-model="hashtag">
                    <label for="andratuttobene">andratuttobene</label></div>
                    <div><input type="radio" id="natale2020" value="#natale2020" v-model="hashtag">
                    <label for="natale2020">natale2020</label></div>
                    <div><input type="radio" id="immuni" value="#immuni" v-model="hashtag">
                    <label for="immuni">immuni</label></div>
                    <div><input type="radio" id="iorestoacasa" value="#iorestoacasa" v-model="hashtag">
                    <label for="iorestoacasa">iorestoacasa</label></div>
                    <div><input type="radio" id="dpcm" value="#dpcm" v-model="hashtag">
                    <label for="dpcm">dpcm</label></div>
                    <div><input type="radio" id="zonarossa" value="#zonarossa" v-model="hashtag">
                    <label for="zonarossa">zonarossa</label></div>
                    <div><input type="radio" id="zonaarancione" value="#zonaarancione" v-model="hashtag">
                    <label for="zonaarancione">zonaarancione</label></div>
                    <div><input type="radio" id="zonagialla" value="#zonagialla" v-model="hashtag">
                    <label for="zonagialla">zonagialla</label></div>
                    <div><input type="radio" id="giuseppeconte" value="#giuseppeconte" v-model="hashtag">
                    <label for="giuseppeconte">giuseppeconte</label></div>
                    <div><input type="radio" id="LItaliaSiRibella" value="#LItaliaSiRibella" v-model="hashtag">
                    <label for="LItaliaSiRibella">LItaliaSiRibella</label></div>
                    <div><input type="radio" id="nolockdown" value="#nolockdown" v-model="hashtag">
                    <label for="nolockdown">nolockdown</label></div>
                    <div><input type="radio" id="coronavirus" value="#coronavirus" v-model="hashtag">
                    <label for="coronavirus">coronavirus</label></div>
                    <div><input type="radio" id="lockdownitalia" value="#lockdownitalia" v-model="hashtag">
                    <label for="lockdownitalia">lockdownitalia</label></div>
                    <div><input type="radio" id="vaccinocovid" value="#vaccinocovid" v-model="hashtag">
                    <label for="vaccinocovid">vaccinocovid</label></div>
                    <div><input type="radio" id="congiuntifuoriregione" value="#congiuntifuoriregione" v-model="hashtag">
                    <label for="congiuntifuoriregione">congiuntifuoriregione</label></div>
                    
                    <div><input type="radio" id="sanità" value="#sanità" v-model="hashtag">
                    <label for="sanità">sanità</label></div>
                    <div><input type="radio" id="secondaondata" value="#secondaondata" v-model="hashtag">
                    <label for="secondaondata">secondaondata</label></div>
                    <div><input type="radio" id="covidioti" value="#covidioti" v-model="hashtag">
                    <label for="covidioti">covidioti</label></div>
                    <div><input type="radio" id="dad" value="#dad" v-model="hashtag">
                    <label for="dad">dad</label></div>
                    <div><input type="radio" id="mascherine" value="#mascherine" v-model="hashtag">
                    <label for="mascherine">mascherine</label></div>
                    <div class="btn"><button class="btn-search" @click="search" v-if="has || dat"> search </button></div>
                </div>
                
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
    name:'Week3',
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
            let charts=this.$store.getters.getSentimentWeek(5);
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
                let charts=this.$store.getters.getSentimentByHashtag(this.hashtag,5)
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
                    fontSize:20,
                    annotationText: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    legend: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    domain: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                }
               let charts=this.$store.getters.getSentimentByData(this.formData.mydate,5)
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
        grid-template-rows: repeat(3,50px);
        height:150px;
        padding-left:0px;
        color:white;
        text-shadow: 1px 1px black;
        font-weight:bold;
        padding-top:0px;
        margin-top:50px;
        border:1px solid black;
    
        .link{
            cursor: default;
            width: 100%;
            line-height: 40px;
            text-align: center;
            background-color: #17a2b8;
            padding-top: 5px;
            font-weight: bold;
            border-bottom: 1px solid black;
            display: block;
        }
        
        .link:hover{
            border:1px solid black;
        }

    }
    .content{
    background-color: beige;
    overflow: scroll;
        display: grid;
        grid-template-rows: 200px calc(100% - 200px);
        .search{
            display:flex;
            height: 55px;
            padding-top:45px ;
            justify-content: center;
            .hashtag{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
                font-weight: bold;
                .btn{
                    grid-column-start: 2;
                    grid-column-end: span 3;                    

                    .btn-search{
                    border:1px solid black;
                    color:white;
                    text-shadow: 1px 1px black;
                    font-weight:bold;
                    margin-bottom:100px;
                    border-radius:10px;
                    }
 
                }
            }
        }
        .principal{
            height: 100%;
            width: 100%;

            .Chart{
                margin-top:50px;
            }
        }
        
    }
}
</style>