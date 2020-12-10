<template>
    <div class="main">
        <div class="sidebar">
            <div class="link" @click="has=false; viewchart=false;isHome();hashtag=[]" >Home</div>
            <div class="link" @click="has=false; dat=false;viewchartHome=false; general();hashtag=[]">General</div>
            <div class="link" @click="has=true; dat=false; viewchart=false;viewchartHome=false;hashtag=[]">By Hashtag</div>
          
        </div>
        <div class="content">
            <div class="search" v-show="has">
                <div class="error" v-show="hashtag==[]">Scelta non effettuata</div>
                <div class="hashtag">
                    <div><input type="checkbox" id="andratuttobene" value="#andratuttobene" v-model="hashtag">
                    <label for="andratuttobene">andratuttobene</label></div>
                    <div><input type="checkbox" id="natale2020" value="#natale2020" v-model="hashtag">
                    <label for="natale2020">natale2020</label></div>
                    <div><input type="checkbox" id="immuni" value="#immuni" v-model="hashtag">
                    <label for="immuni">immuni</label></div>
                    <div><input type="checkbox" id="iorestoacasa" value="#iorestoacasa" v-model="hashtag">
                    <label for="iorestoacasa">iorestoacasa</label></div>
                    <div><input type="checkbox" id="dpcm" value="#dpcm" v-model="hashtag">
                    <label for="dpcm">dpcm</label></div>
                    <div><input type="checkbox" id="zonarossa" value="#zonarossa" v-model="hashtag">
                    <label for="zonarossa">zonarossa</label></div>
                    <div><input type="checkbox" id="zonaarancione" value="#zonaarancione" v-model="hashtag">
                    <label for="zonaarancione">zonaarancione</label></div>
                    <div><input type="checkbox" id="zonagialla" value="#zonagialla" v-model="hashtag">
                    <label for="zonagialla">zonagialla</label></div>
                    <div><input type="checkbox" id="giuseppeconte" value="#giuseppeconte" v-model="hashtag">
                    <label for="giuseppeconte">giuseppeconte</label></div>
                    <div><input type="checkbox" id="LItaliaSiRibella" value="#LItaliaSiRibella" v-model="hashtag">
                    <label for="LItaliaSiRibella">LItaliaSiRibella</label></div>
                    <div><input type="checkbox" id="nolockdown" value="#nolockdown" v-model="hashtag">
                    <label for="nolockdown">nolockdown</label></div>
                    <div><input type="checkbox" id="coronavirus" value="#coronavirus" v-model="hashtag">
                    <label for="coronavirus">coronavirus</label></div>
                    <div><input type="checkbox" id="lockdownitalia" value="#lockdownitalia" v-model="hashtag">
                    <label for="lockdownitalia">lockdownitalia</label></div>
                    <div><input type="checkbox" id="vaccinocovid" value="#vaccinocovid" v-model="hashtag">
                    <label for="vaccinocovid">vaccinocovid</label></div>
                    <div><input type="checkbox" id="congiuntifuoriregione" value="#congiuntifuoriregione" v-model="hashtag">
                    <label for="congiuntifuoriregione">congiuntifuoriregione</label></div>
                    
                    <div><input type="checkbox" id="sanità" value="#sanità" v-model="hashtag">
                    <label for="sanità">sanità</label></div>
                    <div><input type="checkbox" id="secondaondata" value="#secondaondata" v-model="hashtag">
                    <label for="secondaondata">secondaondata</label></div>
                    <div><input type="checkbox" id="covidioti" value="#covidioti" v-model="hashtag">
                    <label for="covidioti">covidioti</label></div>
                    <div><input type="checkbox" id="dad" value="#dad" v-model="hashtag">
                    <label for="dad">dad</label></div>
                    <div><input type="checkbox" id="mascherine" value="#mascherine" v-model="hashtag">
                    <label for="mascherine">mascherine</label></div>
                    <div class="btn"><button class="btn-search" @click="search" v-if="has || dat"> Search </button></div>
                </div>
                
            </div>

            <div class="principal">

                <div v-if="viewchart"  class="Chart">
                    <GChart
                        type="BarChart"
                        :data="charDataBar"
                        :options="charOptionsBar"/>
                </div>
                 <div v-if="viewchartGeneral"  class="Chart">
                    <GChart
                        type="ColumnChart"
                        :data="charDataGeneral"
                        :options="ColumnChartOptions"
                        />
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
    name:'All',
    components:{
        GChart
    },
    data(){
        return{
            
            title:"",
            charData:[],
            charDataGeneral:{},
            charDataBar:{},
            charOptions:{},
            ColumnChartOptions:{},
            charOptionsBar:{},
            formData:vueData,
            hashtag:[],
            tweets:[],
            has:false,
            dat:false,
            viewchart:false,
            viewchartGeneral:false
        }
    },
    methods: {
        isHome(){
            console.log(this.$store.getters.getZoneChart)
        },
        general(){
                this.charOptionsBar={            
                    title: "General Sentiment Of The Weeks",
                    height:500,
                    annotationText: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    legend: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true},position:'top'},
                    domain: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    bar: {groupWidth: '35%',groupHeight:'50%'},
                    
                    isStacked: 'percent'

                }
                this.ColumnChartOptions={
                    title: "Total Number of The Tweets of All Week Captured",
                    height: 600,
                    bar: {groupWidth: "25%"},
                    vAxis:{
                        minValue:0,
                        ticks:[1000,3000,5000,8000,10000,12000,14000,16000,18000,20000]

                    }
                }
            let charts=this.$store.getters.getSentimentAll;
            this.charDataBar=charts[0];
            this.charDataGeneral=charts[1];
            this.viewchart=true
            this.viewchartGeneral=true
        },
        search(){
            if(this.has){
                this.charOptionsBar={            
                    title: "General Sentiment Of "+this.hashtag,
                    height:500,
                    fontSize:20,
                    annotationText: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    legend: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true},position:'top'},
                    domain: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    bar: {groupWidth: '35%',groupHeight:'50%'},
                    
                    isStacked: 'percent'
                }
                console.log(this.hashtag.length)
                if(this.hashtag.length===0){
                    this.viewchart=false
                }
                else{
                let charts=this.$store.getters.getCompareChart(this.hashtag)
                this.hashtag=[];
                this.charDataBar= charts;

                this.viewchart=true;
                }
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
        grid-template-rows: repeat(4,50px);
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