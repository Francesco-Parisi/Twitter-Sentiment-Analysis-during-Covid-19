import Vue from 'vue'
import Vuex  from 'vuex'  //import della libreria principale dello store

//import dei file json dove sono salvati i dati 
import Week1 from '../JSON/Week-1.json'
Vue.use(Vuex) // utilizzo di vuex 
const Hashtag=["#andratuttobene","#natale2020","#immuni","#iorestoacasa","#dpcm","#zonarossa","#zonaarancione",
               "#zonagialla","#giuseppeconte","#nolockdown","#litaliasiribella","#lockdownitalia","#coronavirus","#congiuntifuoriregione",
               "#vaccinocovid","#sanità","#secondaondata","#covidioti","#dad","#mascherine"]
export const store =  new Vuex.Store({ //creazione dello store
  state: {    //lo state rappresenta i dati
    Week1,
    Hashtag
  },
  getters:{
    getTopFiveRetweetWeek1: state=>{
        console.log((state.Week1.sort((a,b)=>b.Retweet-a.Retweet)).slice(0,5))
        return (state.Week1.sort((a,b)=>b.Retweet-a.Retweet)).slice(0,5)
    },
    getTopFiveRetweetByHashtagWeek1: state=> hashtag =>{
        console.log(((state.Week1.filter(tweet => tweet.Hashtag===hashtag)).sort((a,b)=>b.Retweet-a.Retweet)).slice(0,5))
        return ((state.Week1.filter(tweet => tweet.Hashtag===hashtag)).sort((a,b)=>b.Retweet-a.Retweet)).slice(0,5)
    },
    getTopFiveRetweetByDateWeek1: state => date=>{
      return  ((state.Week1.filter(tweet=> tweet.Data.match(date)!==null)).sort((a,b)=>b.Retweet-a.Retweet)).slice(0,5)      
    },
    getHashtag:state=>{
      return state.Hashtag
    },
    getTweetbyHashtagWeek1:state=>hashtag=>{
      return state.Week1.filter(tweet => tweet.Hashtag===hashtag)
    },
    getSentimentWeek1: state =>{
      let st= state.Week1
      let numofRetweetNegative= (st.filter(a=> a.Sentiment===1).map(a=> a.Retweet)).reduce((a,b)=>a+b,0)
      console.log("Retweet negativi="+numofRetweetNegative)
      let numofRetweetTendNegative= st.filter(a=> a.Sentiment===2).map(a=> a.Retweet).reduce((a,b)=>a+b,0)
      console.log("Retweet tendenti negativi="+numofRetweetTendNegative)
      let numofRetweetNeutre= st.filter(a=> a.Sentiment===3).map(a=> a.Retweet).reduce((a,b)=>a+b,0)
      console.log("Retweet neutri="+numofRetweetNeutre)
      let numofRetweetTendPositive= st.filter(a=> a.Sentiment===4).map(a=> a.Retweet).reduce((a,b)=>a+b,0)
      console.log("Retweet tendenti Positivi="+numofRetweetTendPositive)
      let numofRetweetPositive= st.filter(a=> a.Sentiment===5).map(a=> a.Retweet).reduce((a,b)=>a+b,0)
      console.log("Retweet positivi="+numofRetweetPositive)
      let Negative= st.filter(a=> a.Sentiment===1)
      console.log("tweet negativi="+Negative.length)
      let TendNegative= st.filter(a=> a.Sentiment===2)
      console.log("tweet tendenti negativi="+TendNegative.length)
      let Neutre= st.filter(a=> a.Sentiment===3)
      console.log("tweet neutri="+Neutre.length)
      let TendPositive= st.filter(a=> a.Sentiment===4)
      console.log("tweet Tendenti Positivi="+TendPositive.length)
      let Positive= st.filter(a=> a.Sentiment===5)
      console.log("tweet Positivi="+Positive.length)
      return [
        ["Sentimento","Tweet"],
        ["Negativo",Negative.length],
        ["Tendente Negativo",TendNegative.length],
        ["Neutro",Neutre.length],
        ["Tendente Positivo",TendPositive.length],
        ["Positivo",Positive.length]
        
      ]
    },
    getSentimentByDataWeek1: state =>date=>{
      let st= state.Week1.filter(tweet=> tweet.Data.match(date)!==null)
      let numofRetweetNegative= (st.filter(a=> a.Sentiment===1).map(a=> a.Retweet)).reduce((a,b)=>a+b,0)
      console.log("Retweet negativi="+numofRetweetNegative)
      let numofRetweetTendNegative= st.filter(a=> a.Sentiment===2).map(a=> a.Retweet).reduce((a,b)=>a+b,0)
      console.log("Retweet tendenti negativi="+numofRetweetTendNegative)
      let numofRetweetNeutre= st.filter(a=> a.Sentiment===3).map(a=> a.Retweet).reduce((a,b)=>a+b,0)
      console.log("Retweet neutri="+numofRetweetNeutre)
      let numofRetweetTendPositive= st.filter(a=> a.Sentiment===4).map(a=> a.Retweet).reduce((a,b)=>a+b,0)
      console.log("Retweet tendenti Positivi="+numofRetweetTendPositive)
      let numofRetweetPositive= st.filter(a=> a.Sentiment===5).map(a=> a.Retweet).reduce((a,b)=>a+b,0)
      console.log("Retweet positivi="+numofRetweetPositive)
      let Negative= st.filter(a=> a.Sentiment===1)
      console.log("tweet negativi="+Negative.length)
      let TendNegative= st.filter(a=> a.Sentiment===2)
      console.log("tweet tendenti negativi="+TendNegative.length)
      let Neutre= st.filter(a=> a.Sentiment===3)
      console.log("tweet neutri="+Neutre.length)
      let TendPositive= st.filter(a=> a.Sentiment===4)
      console.log("tweet Tendenti Positivi="+TendPositive.length)
      let Positive= st.filter(a=> a.Sentiment===5)
      console.log("tweet Positivi="+Positive.length)
      return [
        ["Sentimento","Tweet"],
        ["Negativo",Negative.length],
        ["Tendente Negativo",TendNegative.length],
        ["Neutro",Neutre.length],
        ["Tendente Positivo",TendPositive.length],
        ["Positivo",Positive.length]
      ]
    },
    getSentimentByHashtagWeek1: state =>hashtag=>{
      let st= state.Week1.filter(tweet=> tweet.Hashtags.match(hashtag)!==null)
      let numofRetweetNegative= (st.filter(a=> a.Sentiment===1).map(a=> a.Retweet)).reduce((a,b)=>a+b,0)
      console.log("Retweet negativi="+numofRetweetNegative)
      let numofRetweetTendNegative= st.filter(a=> a.Sentiment===2).map(a=> a.Retweet).reduce((a,b)=>a+b,0)
      console.log("Retweet tendenti negativi="+numofRetweetTendNegative)
      let numofRetweetNeutre= st.filter(a=> a.Sentiment===3).map(a=> a.Retweet).reduce((a,b)=>a+b,0)
      console.log("Retweet neutri="+numofRetweetNeutre)
      let numofRetweetTendPositive= st.filter(a=> a.Sentiment===4).map(a=> a.Retweet).reduce((a,b)=>a+b,0)
      console.log("Retweet tendenti Positivi="+numofRetweetTendPositive)
      let numofRetweetPositive= st.filter(a=> a.Sentiment===5).map(a=> a.Retweet).reduce((a,b)=>a+b,0)
      console.log("Retweet positivi="+numofRetweetPositive)
      let Negative= st.filter(a=> a.Sentiment===1)
      console.log("tweet negativi="+Negative.length)
      let TendNegative= st.filter(a=> a.Sentiment===2)
      console.log("tweet tendenti negativi="+TendNegative.length)
      let Neutre= st.filter(a=> a.Sentiment===3)
      console.log("tweet neutri="+Neutre.length)
      let TendPositive= st.filter(a=> a.Sentiment===4)
      console.log("tweet Tendenti Positivi="+TendPositive.length)
      let Positive= st.filter(a=> a.Sentiment===5)
      console.log("tweet Positivi="+Positive.length)
      return [
        ["Sentimento","Tweet"],
        ["Negativo",Negative.length],
        ["Tendente Negativo",TendNegative.length],
        ["Neutro",Neutre.length],
        ["Tendente Positivo",TendPositive.length],
        ["Positivo",Positive.length]
        
      ]
    }    
    
  }

})
