

<script>
import StoryListing from './components/StoryListing.vue'
const db_apiURL = "http://localhost:5038/"
const axios = require("axios");
const cheerio = require("cheerio");



export default {
  name: 'App',
  components: {
    StoryListing
  },
  data() {
    return{
      stories : [],
    }
  },
  methods : {
    async testDB(){
      axios.get(db_apiURL + "db_api/AtrocityWatch/GetNotes").then((response)=>{
        console.log(response.data);
      })
    },
    getWebsiteData(){
      let self = this;
      let url = '/news/';
      let dataArray = [];
      axios.get(url).then(function (response){
        let html = response.data;
       // console.log(html);
        let $ = cheerio.load(html);
      //  console.log($("<section id=\"news-feed-container\" tabindex=\"-1\" aria-label=\"Content Feed\"> article").attr('aria-label'));
        $("#news-feed-container article").each(function(){
          const title = $(this).find('div.gc__content').find('div.gc__header-wrap').find('h3').find('a').find('span').text();
         // console.log ($(this).text());
          dataArray.push({
            'title' : title,
          });
        });
      });
      self.stories = dataArray;
      console.log(dataArray);
     
    }
  },
  created(){
    this.testDB();
    this.getWebsiteData();
    
  }
 
}

</script>

<template>
  <StoryListing/>
  <h1>Title</h1>
  <div class="wrapper">
    <div v-for="(story,index) in stories" :key="index">
      <span v-text="story"></span>
      {{ story }}
     <!-- <StoryListing v-for="(story,index) instories" :title="story" text="this happened and etc." perpetrator="test country" :key="index"/>  -->
    </div>
    
  </div>
  
  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
