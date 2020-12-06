<template>
    <div class="main">
        <div class="content">
            <div><img src="../assets/Logo.png" width="300" height="300px"></div>
            <div class="desc">descrizione  progetto</div>

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

    .content{
        background-image: linear-gradient(to top , beige 0%, beige 10%, #17a2b8 100%);
        .desc{
            display: flex;
            height: 100%;
            width: 100%;
            align-items: center;
            justify-content: center;
        }
    }



}
</style>