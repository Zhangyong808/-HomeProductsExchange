<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <v-header></v-header>
    <router-view/>
    <v-footer></v-footer>
  </div>
</template>
<script>
import VHeader from '@/components/Header.vue'
import VFooter from '@/components/Footer.vue'
export default {
  components:{
    'v-header': VHeader,
    'v-footer': VFooter
  }
}
</script>

