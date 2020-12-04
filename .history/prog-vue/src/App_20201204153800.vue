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
            <button class="btn btn-1"><router-link to="/" class="item">Home</router-link></button>
            <button class="btn btn-2"><router-link to="/All" class="item">ALL Weeks</router-link></button>
            <button class="btn btn-3"><router-link to="/week1" class="item">Week1</router-link></button>
            <button class="btn btn-4"><router-link to="/week2" class="item">Week2</router-link></button>
            <button class="btn btn-5"><router-link to="/week3" class="item">Week3</router-link></button>
            <button class="btn btn-3"><router-link to="/week4" class="item">Week4</router-link></button>
            <button class="btn btn-3"><router-link to="/week5" class="item">Week5</router-link></button>
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
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
        width: 80vw;
        margin: 0 ;
        min-height: 100vh;
      }

      .btn {
        flex: 1 1 auto;
        margin: 10px;
        padding: 30px;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: white;
        box-shadow: 0 0 20px #eee;
        border-radius: 10px;
      }

      .btn:hover {
        background-position: right center; /* change the direction of the change here */
      }

      .btn-1 {
        background-image: linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%);
      }

      .btn-2 {
        background-image: linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%);
      }

      .btn-3 {
        background-image: linear-gradient(to right, #84fab0 0%, #8fd3f4 51%, #84fab0 100%);
      }

      .btn-4 {
        background-image: linear-gradient(to right, #a1c4fd 0%, #c2e9fb 51%, #a1c4fd 100%);
      }

      .btn-5 {
        background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 51%, #ffecd2 100%);
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
