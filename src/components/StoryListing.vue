<script>
export default {
  name: 'StoryListing',
  props: {
    title : String,
    description : String,
    img : String,
    date : Date,
    perpetrator: String,
    
  }
}
</script>

<template>
  
  <div class="card bg-secondary text-light m-3" style="">
  <div class="row g-0">
    <div class="col-lg  pb-0 mb-0">
      <img :src="img" class="img-fluid rounded-start embed-responsive-item w-100"  :alt="description">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title mb-2">{{ title }}</h5>
        <p class="card-text mb-2">{{description}}</p>
        <p class="card-text mb-2"> <strong class="text-danger">{{ perpetrator }}</strong> <small class="text-dark-green">{{ date.toLocaleDateString() }}</small></p>
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
</style>