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
        background-image: linear-gradient(to top to bottom, beige 0%, beige 20%, #17a2b8 100%);
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