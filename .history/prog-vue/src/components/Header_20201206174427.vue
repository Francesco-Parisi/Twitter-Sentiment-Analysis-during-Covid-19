<template>
    <div class="header">
        <div><img src="../assets/vuejs.svg" width="500" height="100px"></div>
        <div><img src="../assets/python.png" width="300" height="90px"></div>
        <div><img src="../assets/twitter.png" width="300" height="80px"></div>
        <div><img src="../assets/mongo.png" width="300" height="90px"></div>
    </div>
</template>
<script>
export default {
    name:'Header'
}
</script>

<style lang="scss" scoped>
.header{
    height: 100px;
    width: 100%;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    align-items: center;
    justify-items:center;
}
img{
    user-drag: none; 
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}
</style>