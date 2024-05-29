<script>
export default {
  name: 'StoryListing',
  props: {
    title : String,
    reasons : [String],
    img : String,
    date : Date,
    perpetrator: String,
    severity : Number,
    
  }
}
</script>

<template>
  
  <div class="card bg-secondary text-light m-3" style="">
  <div class="row g-0">
    <div class="col-lg  pb-0 mb-0">
      <img :src="img" class="img-fluid rounded-start embed-responsive-item w-100"  :alt="description">
    </div>
    <div class="col-md-8 ">
      <div class="card-body">
        <h4 class="card-title mb-2 text-decoration-underline">{{ title }}</h4>
        <p v-for="(reason, index) in reasons" :key="index" class="card-text mb-2">{{reason}}.</p>
        <div class="progress mt-3 mb-3">
          <div class="progress-bar bg-danger"  :style="{width: (severity * 10) +'%'}"><strong class="text-dark">Severity: {{severity}} / 10</strong></div>
        </div> 
        <footer class="footer">
          <p class="card-text mb-2 mt-auto "> <strong class="text-danger">{{ perpetrator }}</strong> <small class="text-dark-green">{{ date.toLocaleDateString() }}</small></p>
        </footer>
      </div>
    </div>
  </div>
</div>
     
       


</template>

<style>
  .card-img-top {
  width: 100%;
  height: 30vh;
  object-fit: contain;
  }
  .progress-bar {

    -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: black;
  }
  /* .dynamic-width{
        width: v-bind(severity * 10) + "%";
  } */
</style>