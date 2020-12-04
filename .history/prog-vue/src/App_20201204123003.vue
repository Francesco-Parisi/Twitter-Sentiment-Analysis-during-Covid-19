<template>
  <div id="app">
    <div class="header">
      <Header/>
    </div>
    <div class="view">
      <router-view/>
    </div>
    <div class="footer">
        <div class="selection">
            <button class="button type 3"><router-link to="/">Home</router-link></button>
            <button class="button type 3"><router-link to="/All">ALL Weeks</router-link></button>
            <button class="button type 3"><router-link to="/week1">Week1</router-link></button>
            <button class="button type 3"><router-link to="/week2">Week2</router-link></button>
            <button class="button type 3"><router-link to="/week3">Week3</router-link></button>
            <button class="button type 3"><router-link to="/week4">Week4</router-link></button>
            <button class="button type 3"><router-link to="/week5">Week5</router-link></button>
        </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import { store } from './store/index'
export default {
  name: 'App',
  store,
  components: {
    Header
  }
}
</script>
<style lang="scss">

#app{
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 100px calc(100vh - 200px) 100px;
  background-color: beige;
      .selection{
        width: 100%;
        display: grid;
        margin-top:25px;
        grid-template-columns: repeat(7, 1fr);
        align-content: center;
        justify-items: center;
    }
      .button{
        position: relative;
        padding: 1em 1.5em;
        border: none;
        background-color: transparent;
        cursor: pointer;
        outline: none;
        font-size: 18px;
    }
      &.type3
    color: #435a6b;
    
    //Effect three
    // Effect one
    &.type3::after,&.type3::before{
      content: '';
      display: block;
      position: absolute;
      width: 20%;
      height: 20%;
      border: 2px solid;
      transition: all 0.6s ease;
      border-radius: 2px;
    }
    &.type3::after{
      bottom: 0;
      right: 0;
      border-top-color: transparent;
      border-left-color: transparent;
      border-bottom-color: #435a6b;
      border-right-color: #435a6b;
    }
    &.type3::before{
      top: 0;
      left: 0;
      border-bottom-color: transparent;
      border-right-color: transparent;
      border-top-color: #435a6b;
      border-left-color: #435a6b;
    }
    &.type3:hover:after,&.type3:hover:before{
      border-bottom-color: #435a6b;
      border-right-color: #435a6b;
      border-top-color: #435a6b;
      border-left-color: #435a6b;
      width: 100%
      height: 100%
    }

    .footer{
        background-color: beige;
    }

}
</style>
