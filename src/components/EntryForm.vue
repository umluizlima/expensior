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
              <option v-for="(pile, index) in availablePiles" :key="index">
                  {{ pile }}
              </option>
            </b-select>
          </b-field>

          <b-field label="Tags">
            <b-taginput
              v-model="form.tags"
              :data="availableTags"
              autocomplete
              :allow-new="true"
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
import { API } from '@/api';

export default {
  data() {
    return {
      api: new API('/entries'),
      form: {
        amount: null,
        description: null,
        date: new Date(),
        pile: null,
        tags: [],
      },
      /* Get piles from API */
      availablePiles: [],
      /* Get tags from API */
      availableTags: [
        'groceries',
        'food',
        'transportation',
        'health',
        'long term',
        'short term',
        'shelter',
        'freelance',
        'employment',
      ],
    };
  },
  created: function () {
    var api = new API('/piles');
    this.piles = [];
    api.get()
      .then((resp) => {
        for (let pile of resp.data) {
          this.availablePiles.push(pile.name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      /* Handle the submit event */
      console.log(this.form);
      this.api.create(this.form)
        .then(() => {
          this.$parent.close();
        })
        .catch((err) => {
          console.log(err);
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
