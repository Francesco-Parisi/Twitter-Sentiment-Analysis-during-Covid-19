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
        background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 100.71%),
            linear-gradient(127deg, #17a2b8, #17a2b8 50.71%),
            linear-gradient(336deg, beige, beige 60.71%);


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