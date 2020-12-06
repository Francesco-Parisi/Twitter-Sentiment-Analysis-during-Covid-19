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
        background: linear-gradient(217deg, #00cc66, #white 70.71%),
            linear-gradient(127deg, #17a2b8, #17a2b8 70.71%),
            linear-gradient(336deg, beige, beige 70.71%);


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