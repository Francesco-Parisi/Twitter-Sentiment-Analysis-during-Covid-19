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
            <button class="btn draw-border"><router-link to="/" class="item">Home</router-link></button>
            <button class="btn draw-border"><router-link to="/All" class="item">ALL Weeks</router-link></button>
            <button class="btn draw-border"><router-link to="/week1" class="item">Week1</router-link></button>
            <button class="btn draw-border"><router-link to="/week2" class="item">Week2</router-link></button>
            <button class="btn draw-border"><router-link to="/week3" class="item">Week3</router-link></button>
            <button class="btn draw-border"><router-link to="/week4" class="item">Week4</router-link></button>
            <button class="btn draw-border"><router-link to="/week5" class="item">Week5</router-link></button>
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
        @include centerFlex;
        height: 97vh;
        .button{
          transition: all .3s ease-in-out;
          &:nth-child(2){
            @include createButton(150px, 60px, 50px,#E2B0FF,#9F44D3, rgba(171,88,219,0.5));
          }
          &:nth-child(3){
            @include createButton(150px, 60px, 50px,#81FBB8,#28C76F, rgba(60,211,128,0.5));
          }
          &:nth-child(4){
            @include createButton(150px, 60px, 50px,#ABDCFF,#0396FF, rgba(30,161,255,0.5));
          }
          &:nth-child(5){
            @include createButton(150px, 60px, 50px,#FEB692,#EA5455, rgba(238,103,97,0.5));
          }
          &:hover{
            transform:translatey(10px);
            box-shadow: none;
          }
          &:active{
            opacity: 0.5;
          }
        }
    }


      button {
        background: none;
        text-decoration:none;
        border: 2px solid;
        font: inherit;
        line-height: 1;
        margin: 0.5em;
        padding: 1em 2em;
        background-color:#17a2b8;
      }



      .item{
        color:black;
      }

      .item:hover{
        text-decoration:none;
      }

      .footer{
          background-color: beige;
      }

}
</style>
