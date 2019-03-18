<template>
  <div id="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <button class="button is-primary is-large is-fullwidth"
      @click="isPileModalActive = true">
      New pile
    </button>

    <b-modal :active.sync="isPileModalActive" :canCancel="false" has-modal-card>
      <PileForm/>
    </b-modal>

    <div>
      <p>Piles</p>
      <article v-for="(pile, index) in piles" :key="index">
        <h1>{{ pile.name }}</h1>
      </article>
    </div>

    <div>
      <p>Entries</p>
      <article v-for="(entry, index) in entries" :key="index">
        <h1>{{ entry.amount }} - {{ entry.description }} - {{ entry.pile }}</h1>
      </article>
    </div>

    <button class="button is-primary is-large is-fullwidth"
      @click="isEntryModalActive = true">
      New entry
    </button>

    <b-modal :active.sync="isEntryModalActive" :canCancel="false" has-modal-card>
      <EntryForm/>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import { db } from '@/firebase';
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
      isEntryModalActive: this.show(),
      isPileModalActive: false,
      piles: [],
      entries: [],
    };
  },
  created() {
    db.collection('piles').onSnapshot((querySnapshot) => {
      this.piles = [];
      querySnapshot.forEach((doc) => {
        this.piles.push(doc.data());
      });
    });
    db.collection('entries').onSnapshot((querySnapshot) => {
      this.entries = [];
      querySnapshot.forEach((doc) => {
        this.entries.push(doc.data());
      });
    });
  },
  methods: {
    show() {
      this.isEntryModalActive = false;
      this.$nextTick(() => {
        this.isEntryModalActive = true;
      });
    },
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
