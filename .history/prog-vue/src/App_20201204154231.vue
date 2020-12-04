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
            <button class="btn"><router-link to="/" class="item">Home</router-link></button>
            <button class="btn"><router-link to="/All" class="item">ALL Weeks</router-link></button>
            <button class="btn"><router-link to="/week1" class="item">Week1</router-link></button>
            <button class="btn"><router-link to="/week2" class="item">Week2</router-link></button>
            <button class="btn"><router-link to="/week3" class="item">Week3</router-link></button>
            <button class="btn"><router-link to="/week4" class="item">Week4</router-link></button>
            <button class="btn"><router-link to="/week5" class="item">Week5</router-link></button>
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
        margin: 0 auto;
        min-height: 100vh;
      }

      .selection {
        position: absolute;
        top: 90%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .btn {
        display: block;
        height: 50px;
        width: 186px;
        position: relative;
        overflow: hidden;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: white;
        font-size: 14px;
        text-align: center;
        
        &:after {
          position: absolute;
          content:'';
          display: inline-block;
          background: rgba(59,173,227,1);
          background: linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(152,68,183,1) 51%, rgba(255,53,127,1) 100%);
          height: 50px;
          width: 372px;
          z-index: -1;
          transform: translateX(-280px);
          transition: transform 400ms ease-in;
        }
        
        &:hover {
          &:after {
            transform: translateX(-200px);
          }
        }
        span {
          position: relative;
          top: 16px;
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
