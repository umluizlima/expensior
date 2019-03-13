<template>
  <div>
    <form @submit="onSubmit">

      <b-field label="Amount">
        <b-input v-model="form.amount" type="number" step="0.001" required />
      </b-field>

      <b-field label="Date">
        <b-datepicker
          v-model="form.date"
          placeholder="Click to select..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>

      <b-field label="Description">
        <b-input v-model="form.description" />
      </b-field>

      <b-field label="Source">
        <b-select v-model="form.source" placeholder="Select a source" expanded required>
          <option v-for="(source, index) in availableSources" :key="index">
              {{ source }}
          </option>
        </b-select>
      </b-field>

      <b-field label="Destination">
        <b-select v-model="form.destination" placeholder="Select a destination" expanded required>
          <option v-for="(destination, index) in availableSources" :key="index">
              {{ destination }}
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

      <input class="button is-success is-fullwidth" type="submit" value="Submit input">

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        amount: null,
        description: null,
        date: null,
        source: null,
        destination: null,
        tags: [],
      },
      /* Get sources from API */
      availableSources: [
        'nuconta',
        'credit card',
        'wallet',
        'outside',
      ],
      /* Get tags from API */
      availableTags: [
        'groceries',
        'food',
        'transportation',
        'health',
        'long term',
        'short term',
        'shelter',
      ],
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      /* Handle the submit event */
      alert(JSON.stringify(this.form));
      this.onReset();
    },
    onReset() {
      /* Reset our form values */
      this.form.amount = null;
      this.form.description = null;
      this.form.date = null;
      this.form.source = null;
      this.form.destination = null;
      this.form.tags = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
