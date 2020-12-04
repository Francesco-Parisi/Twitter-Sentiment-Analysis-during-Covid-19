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
            <button class="btn draw-border"><router-link to="/">Home</router-link></button>
            <button class="btn draw-border"><router-link to="/All">ALL Weeks</router-link></button>
            <button class="btn draw-border"><router-link to="/week1">Week1</router-link></button>
            <button class="btn draw-border"><router-link to="/week2">Week2</router-link></button>
            <button class="btn draw-border"><router-link to="/week3">Week3</router-link></button>
            <button class="btn draw-border"><router-link to="/week4">Week4</router-link></button>
            <button class="btn draw-border"><router-link to="/week5">Week5</router-link></button>
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
        text-style:none;
        border: 2px solid;
        font: inherit;
        line-height: 1;
        margin: 0.5em;
        padding: 1em 2em;
        }

      .fill:hover,.fill:focus {
        box-shadow: inset 0 0 0 2em var(--hover);
        }




      .footer{
          background-color: beige;
      }

}
</style>
