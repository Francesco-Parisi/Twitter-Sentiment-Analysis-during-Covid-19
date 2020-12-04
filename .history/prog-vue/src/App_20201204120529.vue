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
            <div class="btn-1-2"><router-link to="/">Home</router-link> </div>
            <div class="btn-1-2"><router-link to="/All">ALL Weeks</router-link> </div>
            <div class="btn-1-2"><router-link to="/week1">Week1</router-link></div>
            <div class="btn-1-2"><router-link to="/week2">Week2</router-link></div>
            <div class="btn-1-2"><router-link to="/week3">Week3</router-link></div>
            <div class="btn-1-2"><router-link to="/week4">Week4</router-link></div>
            <div class="btn-1-2"><router-link to="/week5">Week5</router-link></div>
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
        margin-top:35px;
        grid-template-columns: repeat(7, 1fr);
        align-content: center;
        justify-items: center;
    }
    .footer{
        background-color: beige;
    }

    
}
</style>
