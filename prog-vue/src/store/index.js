import Vue from 'vue'
import Vuex  from 'vuex'  //import della libreria principale dello store

//import dei file json dove sono salvati i dati 
import Week1 from '../JSON/Week-1.json'
import Week2 from '../JSON/Week-2.json'


Vue.use(Vuex) // utilizzo di vuex 


const Hashtag=["#andratuttobene","#natale2020","#immuni","#iorestoacasa","#dpcm","#zonarossa","#zonaarancione",
               "#zonagialla","#giuseppeconte","#nolockdown","#LItaliaSiRibella","#lockdownitalia","#coronavirus","#congiuntifuoriregione",
               "#vaccinocovid","#sanità","#secondaondata","#covidioti","#dad","#mascherine"]

          
export const store =  new Vuex.Store({ //creazione dello store
  state: {    //lo state rappresenta i dati
    Week1,
    Week2,
    Hashtag
  },
  
  getters:{
    getTopFiveRetweetWeek1: state=>{
        return (state.Week1.sort((a,b)=>b.Retweet-a.Retweet)).slice(0,5)
    },
    getHashtag:state=>{
      return state.Hashtag
    },
    //FUNZIONE PER GENERARE L'ORDINE DEGLI HASHTAG + UTILIZZATI CHE PRENDE IN INPUT LA SETTIMANA
    getcategory:(state)=>Week=>{
      let st;
      if(Week==1){
       st= state.Week1}
      if(Week==2){
         st= state.Week2}
      if(Week==3){
         st= state.Week1}
      if(Week==4){
         st= state.Week1}
      if(Week==5){
         st= state.Week1}
      if(Week==6){
         st= state.Week1}
      let i=0;
      let numofHash=[];
      let multiplier=[];
      for(i=0;i<20;i++){
        numofHash[i]={'num':st.filter(tweet=> tweet.Hashtag===state.Hashtag[i]).length,'hashtag':state.Hashtag[i]}
      }
      numofHash.sort((a,b)=>b.num-a.num);
      for(i=0;i<20;i++){
        multiplier[i]=numofHash[i].hashtag
      }
      return multiplier
    },
    getRetweetMultiplier:(state,getters)=>(tweets,week)=>{
      let st= tweets
      let multiplier=getters.getcategory(week);
      let Negative= st.filter(a=> a.Sentiment===1)
      let TendNegative= st.filter(a=> a.Sentiment===2)
      let Neutre= st.filter(a=> a.Sentiment===3)
      let TendPositive= st.filter(a=> a.Sentiment===4)
      let Positive= st.filter(a=> a.Sentiment===5)
      
      let i=0;
      let neg=0;
      let tendneg=0;
      let neu=0;
      let tendpos=0;
      let pos=0;
      for(i=0;i<5;i++){
        neg=neg+Negative.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) *0.25
        tendneg=tendneg+TendNegative.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) *0.25
        neu=neu+Neutre.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) *0.25
        tendpos=tendpos+TendPositive.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) *0.25
        pos=pos+Positive.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) *0.25

      }
      for(i=5;i<10;i++){
        neg=neg+Negative.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) *0.5
        tendneg=tendneg+TendNegative.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) *0.5
        neu=neu+Neutre.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) *0.5
        tendpos=tendpos+TendPositive.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) *0.5
        pos=pos+Positive.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) *0.5

      }
      for(i=10;i<15;i++){
        neg=neg+Negative.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) *0.75
        tendneg=tendneg+TendNegative.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) *0.75
        neu=neu+Neutre.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) *0.75
        tendpos=tendpos+TendPositive.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) *0.75
        pos=pos+Positive.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) *0.75

      }
      for(i=15;i<20;i++){
        neg=neg+Negative.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) 
        tendneg=tendneg+TendNegative.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) 
        neu=neu+Neutre.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) 
        tendpos=tendpos+TendPositive.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) 
        pos=pos+Positive.filter(a=> a.Hashtag===multiplier[i]).map(a=> a.Retweet).reduce((a,b)=>a+b,0) 

      }
      return[Math.floor(neg),Math.floor(tendneg),Math.floor(neu),Math.floor(tendpos),Math.floor(pos)]
      
    },

    getSentimentWeek: (state,getters) =>Week=>{
      let st;
      if(Week==1){
       st= state.Week1}
      if(Week==2){
         st= state.Week2}
      if(Week==3){
         st= state.Week1}
      if(Week==4){
         st= state.Week1}
      if(Week==5){
         st= state.Week1}
                        
      let Negative= st.filter(a=> a.Sentiment===1)
      let TendNegative= st.filter(a=> a.Sentiment===2)
      let Neutre= st.filter(a=> a.Sentiment===3)
      let TendPositive= st.filter(a=> a.Sentiment===4)
      let Positive= st.filter(a=> a.Sentiment===5)
      let retweet=getters.getRetweetMultiplier(st,Week)
      
   //   let numofRetweetTendNegative= TendNegative.map(a=> a.Retweet).reduce((a,b)=>a+b,0)
      
     // let numofRetweetNeutre= Neutre.map(a=> a.Retweet).reduce((a,b)=>a+b,0)
      
    //  let numofRetweetTendPositive= TendPositive.map(a=> a.Retweet).reduce((a,b)=>a+b,0)
      
    //  let numofRetweetPositive= Positive.map(a=> a.Retweet).reduce((a,b)=>a+b,0)
    
      return {'PieChart':[
        ["Sentimento","Tweet"],
        ["Negativo",Negative.length+retweet[0]],
        ["Tendente Negativo",TendNegative.length+retweet[1]],
        ["Neutro",Neutre.length+retweet[2]],
        ["Tendente Positivo",TendPositive.length+retweet[3]],
        ["Positivo",Positive.length+retweet[4]]
        
      ],
      'BarChart':[
        ["Sentimento","DATI",{ role: 'style' }],
        ["Negativo",Negative.length+retweet[0],'#FF0000'],
        ["Tendente Negativo",TendNegative.length+retweet[1],'#FF4343'],
        ["Neutro",Neutre.length+retweet[2],'#FFD000'],
        ["Tendente Positivo",TendPositive.length+retweet[3],'#00FF00'],
        ["Positivo",Positive.length+retweet[4],'#43AF43']
        
      ] 
    }
    },
getSentimentAll: (state,getters)=>{
  let retweet1=getters.getRetweetMultiplier(state.Week1,1)
  let retweet2=getters.getRetweetMultiplier(state.Week2,2)
 // let retweet3=getters.getRetweetMultiplier(state.Week2,1)
 // let retweet4=getters.getRetweetMultiplier(state.Week2,1)
 // let retweet5=getters.getRetweetMultiplier(state.Week2,1)

    let stweeks=[
      ["settimana","NEGATIVI","TEND.NEGATIVI","NEUTRI","TEND.POSITIVI","POSITIVI",{role:'annotation'}],
      ["WEEK1",state.Week1.filter(a=>a.Sentiment===1).length+retweet1[0],
      state.Week1.filter(a=>a.Sentiment===2).length+retweet1[1],
      state.Week1.filter(a=>a.Sentiment===3).length+retweet1[2],
      state.Week1.filter(a=>a.Sentiment===4).length+retweet1[3],
      state.Week1.filter(a=>a.Sentiment===5).length+retweet1[4],
      ''],
      ["WEEK2",state.Week2.filter(a=>a.Sentiment===1).length+retweet2[0],
      state.Week2.filter(a=>a.Sentiment===2).length+retweet2[1],
      state.Week2.filter(a=>a.Sentiment===3).length+retweet2[2],
      state.Week2.filter(a=>a.Sentiment===4).length+retweet2[3],
      state.Week2.filter(a=>a.Sentiment===5).length+retweet2[4],
      ''],
  //    ["WEEK3",state.Week3.filter(a=>a.Sentiment===1).length+retweet3[0],
  //    state.Week3.filter(a=>a.Sentiment===2).length+retweet3[1],
  //    state.Week3.filter(a=>a.Sentiment===3).length+retweet3[2],
  //    state.Week3.filter(a=>a.Sentiment===4).length+retweet3[3],
  //    state.Week3.filter(a=>a.Sentiment===5).length+retweet3[4],''],
  //    ["WEEK4",state.Week4.filter(a=>a.Sentiment===1).length+retweet4[0]
  //    state.Week4.filter(a=>a.Sentiment===2).length+retweet4[1],
  //    state.Week4.filter(a=>a.Sentiment===3).length+retweet4[2],
  //    state.Week4.filter(a=>a.Sentiment===4).length+retweet4[3],
  //    state.Week4.filter(a=>a.Sentiment===5).length+retweet4[4],''],
  //    ["WEEK5",state.Week5.filter(a=>a.Sentiment===1).length+retweet5[0],
  //    state.Week5.filter(a=>a.Sentiment===2).length+retweet5[1],
  //    state.Week5.filter(a=>a.Sentiment===3).length+retweet5[2],
  //    state.Week5.filter(a=>a.Sentiment===4).length+retweet5[3],
  //    state.Week5.filter(a=>a.Sentiment===5).length+retweet5[4],''],
    ]
return stweeks
  },
  getSentimentsByHashtag:(state,getters)=>hashtag=>{
    let st1= state.Week1.filter(tweet=> tweet.Hashtags.match(hashtag)!==null)
    let st2= state.Week2.filter(tweet=> tweet.Hashtags.match(hashtag)!==null)
//    let st3= state.Week3.filter(tweet=> tweet.Hashtags.match(hashtag)!==null)
//    let st4= state.Week4.filter(tweet=> tweet.Hashtags.match(hashtag)!==null)
//    let st5= state.Week5.filter(tweet=> tweet.Hashtags.match(hashtag)!==null)
    let retweet1=getters.getRetweetMultiplier(st1,1)
    let retweet2=getters.getRetweetMultiplier(st2,2)
// let retweet3=getters.getRetweetMultiplier(st3,3)
// let retweet4=getters.getRetweetMultiplier(st4,4)
// let retweet5=getters.getRetweetMultiplier(st5,5)
let stweeks=[
  ["settimana","NEGATIVI","TEND.NEGATIVI","NEUTRI","TEND.POSITIVI","POSITIVI",{role:'annotation'}],
  ["WEEK1",st1.filter(a=>a.Sentiment===1).length+retweet1[0],
  st1.filter(a=>a.Sentiment===2).length+retweet1[1],
  st1.filter(a=>a.Sentiment===3).length+retweet1[2],
  st1.filter(a=>a.Sentiment===4).length+retweet1[3],
  st1.filter(a=>a.Sentiment===5).length+retweet1[4],
  ''],
  ["WEEK2",st2.filter(a=>a.Sentiment===1).length+retweet2[0],
  st2.filter(a=>a.Sentiment===2).length+retweet2[1],
  st2.filter(a=>a.Sentiment===3).length+retweet2[2],
  st2.filter(a=>a.Sentiment===4).length+retweet2[3],
  st2.filter(a=>a.Sentiment===5).length+retweet2[4],
  ''],
//    ["WEEK3",state.Week3.filter(a=>a.Sentiment===1).length+retweet3[0],
//    state.Week3.filter(a=>a.Sentiment===2).length+retweet3[1],
//    state.Week3.filter(a=>a.Sentiment===3).length+retweet3[2],
//    state.Week3.filter(a=>a.Sentiment===4).length+retweet3[3],
//    state.Week3.filter(a=>a.Sentiment===5).length+retweet3[4],''],
//    ["WEEK4",state.Week4.filter(a=>a.Sentiment===1).length+retweet4[0]
//    state.Week4.filter(a=>a.Sentiment===2).length+retweet4[1],
//    state.Week4.filter(a=>a.Sentiment===3).length+retweet4[2],
//    state.Week4.filter(a=>a.Sentiment===4).length+retweet4[3],
//    state.Week4.filter(a=>a.Sentiment===5).length+retweet4[4],''],
//    ["WEEK5",state.Week5.filter(a=>a.Sentiment===1).length+retweet5[0],
//    state.Week5.filter(a=>a.Sentiment===2).length+retweet5[1],
//    state.Week5.filter(a=>a.Sentiment===3).length+retweet5[2],
//    state.Week5.filter(a=>a.Sentiment===4).length+retweet5[3],
//    state.Week5.filter(a=>a.Sentiment===5).length+retweet5[4],''],
]
return stweeks

  },

    getSentimentByData: (state,getters) =>(date,Week)=>{
      let st;
      if(Week==1){
       st= state.Week1}
      if(Week==2){
         st= state.Week2}
      if(Week==3){
         st= state.Week1}
      if(Week==4){
         st= state.Week1}
      if(Week==5){
         st= state.Week1}
      if(Week==6){
         st= state.Week1}
      st= st.filter(tweet=> tweet.Data.match(date)!==null)
      let Negative= st.filter(a=> a.Sentiment===1)
      let TendNegative= st.filter(a=> a.Sentiment===2)
      let Neutre= st.filter(a=> a.Sentiment===3)
      let TendPositive= st.filter(a=> a.Sentiment===4)
      let Positive= st.filter(a=> a.Sentiment===5)
      let retweet=getters.getRetweetMultiplier(st,Week)

      return {'PieChart':[
        ["Sentimento","Tweet"],
        ["Negativo",Negative.length+retweet[0]],
        ["Tendente Negativo",TendNegative.length+retweet[1]],
        ["Neutro",Neutre.length+retweet[2]],
        ["Tendente Positivo",TendPositive.length+retweet[3]],
        ["Positivo",Positive.length+retweet[4]]
        
      ],
      'BarChart':[
        ["Sentimento","DATI",{ role: 'style' }],
        ["Negativo",Negative.length+retweet[0],'#FF0000'],
        ["Tendente Negativo",TendNegative.length+retweet[1],'#FF4343'],
        ["Neutro",Neutre.length+retweet[2],'#FFD000'],
        ["Tendente Positivo",TendPositive.length+retweet[3],'#00FF00'],
        ["Positivo",Positive.length+retweet[4],'#43AF43']
        
      ] 
    }
    },
    getSentimentByHashtag: (state,getters) =>(hashtag,Week)=>{
      let st;
      if(Week==1){
       st= state.Week1}
      if(Week==2){
         st= state.Week2}
      if(Week==3){
         st= state.Week1}
      if(Week==4){
         st= state.Week1}
      if(Week==5){
         st= state.Week1}
      if(Week==6){
         st= state.Week1}
      st= st.filter(tweet=> tweet.Hashtags.match(hashtag)!==null)
      let Negative= st.filter(a=> a.Sentiment===1)
      let TendNegative= st.filter(a=> a.Sentiment===2)
      let Neutre= st.filter(a=> a.Sentiment===3)
      let TendPositive= st.filter(a=> a.Sentiment===4)
      let Positive= st.filter(a=> a.Sentiment===5)
      let retweet=getters.getRetweetMultiplier(st,Week)
      return {'PieChart':[
        ["Sentimento","Tweet"],
        ["Negativo",Negative.length+retweet[0]],
        ["Tendente Negativo",TendNegative.length+retweet[1]],
        ["Neutro",Neutre.length+retweet[2]],
        ["Tendente Positivo",TendPositive.length+retweet[3]],
        ["Positivo",Positive.length+retweet[4]]
        
      ],
      'BarChart':[
        ["Sentimento","DATI",{ role: 'style' }],
        ["Negativo",Negative.length+retweet[0],'#FF0000'],
        ["Tendente Negativo",TendNegative.length+retweet[1],'#FF4343'],
        ["Neutro",Neutre.length+retweet[2],'#FFD000'],
        ["Tendente Positivo",TendPositive.length+retweet[3],'#00FF00'],
        ["Positivo",Positive.length+retweet[4],'#43AF43']
        
      ] 
    }
    }    
    
  }

})
