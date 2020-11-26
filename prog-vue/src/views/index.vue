<template>
    <div class="main">
        <div class="content">
            <div class="desc">descrizione  progetto</div>
        </div>
        <div class="selection">
            <div class="link"><router-link to="/All">ALL Weeks</router-link> </div>
            <div class="link"><router-link to="/week1">Week1</router-link></div>
            <div class="link"><router-link to="/week2">Week2</router-link></div>
            <div class="link"><router-link to="/week3">Week3</router-link></div>
            <div class="link"><router-link to="/week4">Week4</router-link></div>
            <div class="link"><router-link to="/week5">Week5</router-link></div>
        </div>
    </div>
</template>

<script>
export default {
    name:'General'
}
</script>

<style lang="scss" scoped>
.main{
    height: 100%;
    display: grid;
    grid-template-rows: 80% 20%;

    .content{
        background-color: rgb(101, 190, 190);
        .desc{
            display: flex;
            height: 100%;
            width: 100%;
            align-items: center;
            justify-content: center;
        }
    }
    .selection{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        align-content: center;
        justify-items: center;
    }


}
</style>