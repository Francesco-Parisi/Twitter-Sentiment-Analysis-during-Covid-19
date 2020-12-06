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
          background: linear-gradient(135deg, orange 60%, cyan);
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