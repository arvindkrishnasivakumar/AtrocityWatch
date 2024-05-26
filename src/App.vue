<script>
import StoryListing from './components/StoryListing.vue'
const db_apiURL = "http://localhost:3000/"
const AIAPIUrl = "http://localhost:5093/";
const loading = ref(true);
import axios from 'axios';
import cheerio from 'cheerio';
import { ref } from 'vue';

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
            title: 'Test Story',
            rating: 5,
            img: '#',
            reasons: ["Because", "and also because"],
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
            alert(response.data);
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
            // console.log ($(this).text());
            dataArray.push({
                'title' : title,
                'img' : $(this).find('div.gc__image_wrap').find('div.article-card__image-wrap').find('div.responsive-image').find('img').attr('src'),
            });
            dataArray.forEach(async (element) => {
                console.log(element.title);
                var req = await axios.request({
                method: 'get',
                url: AIAPIUrl + 'OllamaAPI/AtrocityWatch/GetResponse',
                params: {
                    text: element.title,
                }
                });
                await axios.request({
                    method : 'post',
                    url : db_apiURL,
                    params: {
                        title: element.title,
                        rating: req.data[1],
                        img: element.img,
                        reasons: req.data[2],
                        perpetrator : req.data[0],
                    }
                }).then((res) => {
                    console.log(res);
                })
            

            });
            });
            self.stories = dataArray;
            console.log(dataArray);
            loading.value = false;
            });
        },
        created(){

            this.testDBPost();
            this.getWebsiteData();
        }
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
    <StoryListing v-for="(story,index) in stories" :key="index" :title="story" description="Test description blah blah blah" date= "24 May 2024" img="https://www.aljazeera.com/wp-content/uploads/2024/05/AFP__20240520__34TB3MF__v1__HighRes__PalestinianIsraelConflict-1716473680.jpg?resize=770%2C513&quality=80" perpetrator="Country"/>
    
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
