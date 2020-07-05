<template>
  <form id="tagForm" @submit="onSubmit">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create Tag</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input v-model="form.name" type="text" required />
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success is-fullwidth" type="submit">Submit</button>
        <button class="button is-danger" type="button" @click="$parent.close()">Cancel</button>
      </footer>
    </div>
  </form>
</template>

<script>
import { store } from '@/firebase';

export default {
  data() {
    return {
      form: {
        name: null,
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      /* Handle the submit event */
      store.addTag(this.form)
        .then(() => alert("Tag criada!"));
      this.$parent.close();
    },
  },
};
</script>

<style>
  #tagForm {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    text-align: left;
  }
  form {
    width: 100%;
  }
</style>
