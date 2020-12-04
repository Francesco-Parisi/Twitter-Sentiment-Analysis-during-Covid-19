<template>
  <div id="app">
    <div class="header">
      <Header/>
    </div>
    <div class="view">
      <router-view/>
    </div>
    <div class="footer">
        <div class="selection  container-two">
            <button class="btn draw-border"><router-link to="/" class="item">Home<div class="fill-two"></div></router-link></button>
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
        display:grid;
        grid-template-columns: repeat(4, 1fr);
        text-align: center;
        position: relative;
        width: 100%;
        margin: 0;
        align-content: center;
        justify-items: center;
        cursor: pointer;
      }

      button {
        font-family: Helvetica, sans-serif;
        font-weight: 100;
        color: #fff;
      }

      button {
        position: relative;
        height: 50px;
        width: 280px;
        border: 0;
        border-radius: 5px;
        text-transform: uppercase;
        font-size: 1.1em;
        letter-spacing: 0.2em;
        overflow: hidden;
        box-shadow: 0 4px 12px 0 rgba(152, 160, 180, 10);
        z-index: -2;
      }

      .fill-two {
        position: absolute;
        background-image: linear-gradient(to right, #E040FB, #00BCD4);
        background-size: 150% 150%;
        height: 70px;
        width: 420px;
        border-radius: 5px;
        margin: -40px 0 0 -140px;
        z-index: -1;
        transition: all 0.4s ease;
      }

      .container-two:hover .fill-two {
        -webkit-animation: gradient 3s ease infinite;
        -moz-animation: gradient 3s ease infinite;
        animation: gradient 3s ease infinite;
      }

      @-webkit-keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      @-moz-keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
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
