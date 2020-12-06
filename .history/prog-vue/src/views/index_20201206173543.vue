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
          background: linear-gradient(135deg, #17a2b8 50%, white);
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