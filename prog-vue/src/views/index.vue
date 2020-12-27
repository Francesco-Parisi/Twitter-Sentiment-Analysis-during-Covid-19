<template>
    <div class="main">
        <div class="content">
            
            <div class="desc">
                <br>
                <img src="../assets/Logo.png" width="600px" height="180px">
                <br>
                Data la situazione attuale caratterizzata dal fenomeno pandemico del Covid-19, si vuole realizzare Sentiment Analysis, mediante Twitter, per capire ciò che la popolazione pensa a tal riguardo, ponendo un focus su come essa ha reagito in seguito alle varie decisioni governative (dpcm, etc.).
                </div>
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
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        .desc{
            font-family: 'Indie Flower', cursive;
            font-size: 40px;
            display: flex;
            flex-direction: column;
            height: 85%;
            width: 50%;
            align-items: center;
            text-align:center;
            align-content: center;
        }
    }



}
</style>