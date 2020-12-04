<template>
    <div class="main">
        <div class="content">
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
        background-color: rgb(101, 190, 190);
        .desc{
            display: flex;
            height: 100%;
            width: 100%;
            margin-top:25px;
            align-items: center;
            justify-content: center;
        }
    }



}
</style>