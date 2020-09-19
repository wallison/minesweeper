<template>
  <div class="home">
    <Camp></Camp>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Camp from '../components/Camp.vue'; // @ is an alias to /src

@Component({
  components: {
      Camp
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
  .home {
    display: flex;
    justify-content: center;
  }
</style>
