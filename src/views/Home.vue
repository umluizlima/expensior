<template>
  <div id="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <button class="button is-primary is-large is-fullwidth"
      @click="isPileModalActive = true">
      New pile
    </button>

    <b-modal :active.sync="isPileModalActive" canCancel="false" has-modal-card>
      <PileForm/>
    </b-modal>

    <button class="button is-primary is-large is-fullwidth"
      @click="isEntryModalActive = true">
      New entry
    </button>

    <b-modal :active.sync="isEntryModalActive" canCancel="false" has-modal-card>
      <EntryForm/>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import EntryForm from '@/components/EntryForm.vue';
import PileForm from '@/components/PileForm.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
    EntryForm,
    PileForm,
  },
  data() {
    return {
      isEntryModalActive: true,
      isPileModalActive: false,
    };
  },
};
</script>

<style>
  #home {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    text-align: left;
  }
</style>
