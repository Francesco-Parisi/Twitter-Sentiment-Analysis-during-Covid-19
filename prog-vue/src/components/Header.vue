<template>
    <div class="header">
        <div>Vue</div>
        <div>Python</div>
        <div>Twitter</div>
        <div>Mongo</div>
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
</style>