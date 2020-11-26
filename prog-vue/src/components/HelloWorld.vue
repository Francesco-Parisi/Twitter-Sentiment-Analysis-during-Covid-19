<template>
  <div class="hello">
    <div v-for="(tweet,index) in tweets" :key="index">
      {{tweet.Id}} {{tweet.Testo}}
    </div>
    <br><br><br><br>
    <div>
      <div v-for="(tweet,index) in tweetsByHashtag" :key="index">
        {{tweet.Id}} {{tweet.Testo}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
    tweets(){
      return this.$store.getters.getTopFiveRetweet;
    },
    tweetsByHashtag(){
      return this.$store.getters.getTopFiveRetweetByHashtag('#vaccinocovid');
    }
  },
}
</script>


