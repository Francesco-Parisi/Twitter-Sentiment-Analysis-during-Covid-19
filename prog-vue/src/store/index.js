import Vue from 'vue'
import Vuex  from 'vuex'  //import della libreria principale dello store

//import dei file json dove sono salvati i dati 
import Week1 from '../JSON/Week-1.json'
Vue.use(Vuex) // utilizzo di vuex 

export const store =  new Vuex.Store({ //creazione dello store
  state: {    //lo state rappresenta i dati
    Week1
  },
  getters:{
    getTopFiveRetweetWeek1: state=>{
        console.log((state.Week1.sort((a,b)=>b.Retweet-a.Retweet)).slice(0,5))
        return (state.Week1.sort((a,b)=>b.Retweet-a.Retweet)).slice(0,5)
    },
    getTopFiveRetweetByHashtagWeek1: state=> Hashtag =>{
        console.log(((state.Week1.filter(tweet => tweet.Hashtag===Hashtag)).sort((a,b)=>b.Retweet-a.Retweet)).slice(0,5))
        return ((state.Week1.filter(tweet => tweet.Hashtag===Hashtag)).sort((a,b)=>b.Retweet-a.Retweet)).slice(0,5)
    },
    getTopFiveRetweetByDateWeek1: state => date=>{
      return  ((state.Week1.filter(tweet=> tweet.Data.match(date)!==null)).sort((a,b)=>b.Retweet-a.Retweet)).slice(0,5)      
    }

    
    
  }

})
