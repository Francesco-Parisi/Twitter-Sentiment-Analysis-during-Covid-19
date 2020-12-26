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
            <button class="hvr-outline-in" @click="$router.push('/')">Home</button>
            <button class="hvr-outline-in" @click="$router.push('/All')">ALL Weeks</button>
            <button class="hvr-outline-in" @click="$router.push('/week1')">Week1</button>
            <button class="hvr-outline-in" @click="$router.push('/week2')">Week2</button>
            <button class="hvr-outline-in" @click="$router.push('/week3')">Week3</button>
            <button class="hvr-outline-in" @click="$router.push('/week4')">Week4</button>
            <button class="hvr-outline-in" @click="$router.push('/week5')">Week5</button>
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
