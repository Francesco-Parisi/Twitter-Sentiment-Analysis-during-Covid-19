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
            <button class="hvr-outline-in"><router-link to="/" class="item">Home</router-link></button>
            <button class="hvr-outline-in"><router-link to="/All" class="item">ALL Weeks</router-link></button>
            <button class="hvr-outline-in"><router-link to="/week1" class="item">Week1</router-link></button>
            <button class="hvr-outline-in"><router-link to="/week2" class="item">Week2</router-link></button>
            <button class="hvr-outline-in"><router-link to="/week3" class="item">Week3</router-link></button>
            <button class="hvr-outline-in"><router-link to="/week4" class="item">Week4</router-link></button>
            <button class="hvr-outline-in"><router-link to="/week5" class="item">Week5</router-link></button>
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

      button {
        background: none;
        text-decoration:none;
        font: inherit;
        line-height: 1;
        margin: 0.5em;
        padding: 1em 2em;
        background-color:#17a2b8;
      }
      
      /* Outline In */
      .hvr-outline-in {
        display: inline-block;
        vertical-align: middle;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
        position: relative;
      }
      .hvr-outline-in:before {
        pointer-events: none;
        content: '';
        position: absolute;
        border: #17a2b8 solid 8px;
        top: -8px;
        right: -8px;
        bottom: -8px;
        left: -8px;
        opacity: 0;
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -webkit-transition-property: top, right, bottom, left;
        transition-property: top, right, bottom, left;
      }
      .hvr-outline-in:hover:before, .hvr-outline-in:focus:before, .hvr-outline-in:active:before {
        top: -8px;
        right: -8px;
        bottom: -8px;
        left: -8px;
        opacity: 1;
      }

      .item{
        color:white;
        text-shadow: 1px 1px black;
        font-weight:bold;
      }

      .item:hover{
        text-decoration:none;
        transform: scale(1.1);
      }

      .footer{
          background-color: beige;
      }

}
</style>
