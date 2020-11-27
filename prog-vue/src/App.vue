<template>
  <div id="app">
    <div class="header">
      <Header/>
    </div>
    <div class="view">
      <router-view/>
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
  grid-template-rows: 100px calc(100vh - 100px);
  background-color: beige;
}
</style>
