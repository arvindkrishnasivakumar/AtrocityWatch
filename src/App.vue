<script>
import StoryListing from './components/StoryListing.vue'
const db_apiURL = "http://localhost:3000/"
const AIAPIUrl = "http://localhost:5093/";

import axios from 'axios';
import cheerio from 'cheerio';
import { ref } from 'vue';
const loading = ref(true);
export default {
  name: 'App',
  components: {
    StoryListing
  },
  data() {
    return{
      loading : true,
      stories : null,
      finalArticles : null, 
    }
  },
    methods : {
        async testDBPost(){
        axios.request({
            method : 'post',
            url : db_apiURL,
            params: {
            title: 'Joe biden actually dies',
            rating: 69,
            img: '#',
            reasons: ["yes", "no"],
            perpetrator : 'Israel',
            }
        })
        },
        async testDB(){
        axios.get(db_apiURL).then((response)=>{
            console.log(response.data);
        })
        },
        async testAI(){
        axios.request({
            method: 'get',
            url: AIAPIUrl + 'OllamaAPI/AtrocityWatch/GetResponse',
            params: {
            'text': 'why is the sky blue?'
            }
        
        }).then((response)=>{
            //alert(response.data);
            console.log(response.data);
        })
        },
        async getWebsiteData(){
        let self = this;
        let url = '/news/';
        let dataArray = [];
        await axios.get(url).then(function (response){
            let html = response.data;
        // console.log(html);
            let $ = cheerio.load(html);
        //  console.log($("<section id=\"news-feed-container\" tabindex=\"-1\" aria-label=\"Content Feed\"> article").attr('aria-label'));
            $("#news-feed-container article").each(function(){
            const title = $(this).find('div.gc__content').find('div.gc__header-wrap').find('h3').find('a').find('span').text();
            const img =  $(this).find('div.gc__image-wrap').find('div.article-card__image-wrap').find('div.responsive-image').find('img').attr('src');
            const date = $(this).find('div.gc__content').find('footer.gc__footer').find('div.gc__meta').find('div.gc__date').find('div.gc__date__date').find('div.date-simple').find('span[aria-hidden="true"]').text();
            console.log ("date: " + date);
            dataArray.push({
                'title' : title,
                'img' : img,
                'date' : Date.parse(date),
            });
            
        });
        dataArray.forEach(async (element) => {
            //   console.log(element.title);
            var req = await axios.request({
                method: 'get',
                url: AIAPIUrl + 'OllamaAPI/AtrocityWatch/GetResponse',
                params: {
                    text: element.title,
                }
            });
            console.log(req.data.country);
        
            console.log( req.data.reasons)
            if(req.data != "nah bruh" && req.data.reasons != null && req.data.country != null && req.data.severity != null){
                if(req.data.reasons.length > 0 && req.data.country.length > 0 && req.data.severity > 0){
                  await axios.request({
                    method : 'post',
                    url : db_apiURL,
                    params: {
                        title: element.title,
                        rating: req.data.severity,
                        img: element.img,
                        reasons: req.data.reasons,
                        perpetrator : req.data.country,
                        date : element.date,
                    }
                  }).then((res) => {
                      console.log(res);
                  })
                }
                
            }
     
        

        });
       
            self.stories = dataArray;
           // console.log(dataArray);
            loading.value = false;
            });
        },
        async updateStoryData(){
            const res = await axios.request({
                method : 'get',
                 url : db_apiURL,
            })
            this.finalArticles = res.data;
          
             //console.log("schlawh" + e);
        }
    },
    created(){
        //console.log('rest');
      //  this.testDBPost();
        //this.testAI();
        this.updateStoryData();
        this.getWebsiteData();
        //schlawg
    }
    
}

</script>

<template>
 <nav class="navbar navbar-expand-lg bg-secondary text-light">
  <div class="container-fluid">
    <a class="navbar-brand text-light" href="#">AtrocityWatch</a>
    <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div> -->
  </div>
</nav>
  
  <!-- <div class="wrapper">
    <div v-for="(story,index) in stories" :key="index">
      <span v-text="story"></span>
      {{ story }}
    <StoryListing v-for="(story,index) instories" :title="story" text="this happened and etc." perpetrator="test country" :key="index"/> 
    </div>
    
  </div> -->
  <div class="container" >
    <h1 class="m-3">New Stories</h1>
    <StoryListing v-for="(story,index) in finalArticles" :key="index" :title="story.title" :reasons="story.reasons" :date= "new Date(story.date.toString())" :img="story.img" :perpetrator="story.perpetrator" :severity="story.rating"/>
    
  </div>
  
</template>

<!-- <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->
