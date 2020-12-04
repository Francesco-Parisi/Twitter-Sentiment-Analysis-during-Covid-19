<template>
    <div class="main">
        <div class="sidebar">
            <div class="link" @click="has=false; viewchart=false">Home</div>
            <div class="link" @click="has=false; dat=false; general()">General</div>
            <div class="link" @click="has=true; dat=false; viewchart=false">By Hashtag</div>
          
        </div>
        <div class="content">
            <div class="search" v-show="has">
                <div class="hashtag">
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
            charDataBar:{},
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
                this.charOptionsBar={            
                    title: "General Sentiment Of The Weeks",
                    height:500,
                    annotationText: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    legend: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true},position:'top'},
                    domain: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    bar: {groupWidth: '35%',groupHeight:'50%'},
                    
                    isStacked: 'percent'

                }
            let charts=this.$store.getters.getSentimentAll;
            this.charDataBar=charts;
            this.viewchart=true
        },
        search(){
            if(this.has){
                this.charOptionsBar={            
                    title: "General Sentiment Of The Weeks",
                    height:500,
                    annotationText: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    legend: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true},position:'top'},
                    domain: {textStyle:  {fontName: 'Calibri',fontSize: 20,bold: true}},
                    bar: {groupWidth: '35%',groupHeight:'50%'},
                    
                    isStacked: 'percent'
                }

                let charts=this.$store.getters.getSentimentsByHashtag(this.hashtag)
                console.log(charts)
                this.charDataBar= charts;

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
        grid-template-rows: repeat(4,50px);
        padding-left:0px;
        color:white;
        text-shadow: 1px 1px black;
        font-weight:bold;
        border:1px solid black;
        padding-top:0px;
        margin-top:50px;
    
        .link{
            cursor: default;
            width: 100%;
            line-height: 40px;
            text-align: center;
            background-color: brown;
            border:1px solid black;
            font-weight: bold;
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