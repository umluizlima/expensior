<template>
  <form id="entryForm" @submit="onSubmit">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create Entry</p>
      </header>
      <section class="modal-card-body">
          <b-field label="Amount">
            <b-input v-model="form.amount" type="number" step="0.001" required />
          </b-field>

          <b-field label="Date">
            <b-datepicker
              v-model="form.date"
              placeholder="Click to select..."
              icon="calendar-today"
              required>
            </b-datepicker>
          </b-field>

          <b-field label="Description">
            <b-input v-model="form.description" />
          </b-field>

          <b-field label="Pile">
            <b-select v-model="form.pile" placeholder="Add entry to pile..." expanded required>
              <option
                v-for="pile in piles"
                :value="pile.id"
                :key="pile.id">
                  {{ pile.name }}
              </option>
            </b-select>
          </b-field>

          <b-field label="Tags">
            <b-taginput
              v-model="form.tags"
              :data="tags"
              field="name"
              autocomplete
              @typing="getFilteredTags"
              :allow-new="false"
              icon="label"
              placeholder="Add a tag">
            </b-taginput>
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
        amount: null,
        description: null,
        date: new Date(),
        pile: null,
        tags: [],
      },
      piles: store.piles,
      tags: store.tags,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      /* Handle the submit event */
      store.addEntry(this.form)
        .then(() => alert("Registro criadd!"));
      this.$parent.close();
    },
    getFilteredTags(text) {
      this.tags = store.tags.filter((tag) => {
        return tag.name
        .indexOf(text.toLowerCase()) >= 0
      });
    },
  },
};
</script>

<style>
  #entryForm {
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
