<script>
export default {
  name: 'StoryListing',
  props: {
    title : String,
    text : String,
    perpetrator: String,
    
  }
}
</script>

<template>
    <div>
        <h1>{{ title }}</h1>
        <h2>comitted by {{ perpetrator }}</h2>

    </div>
</template>