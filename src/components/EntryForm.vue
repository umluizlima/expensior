<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="amountInputGroup"
        label="Amount:"
        label-for="amountInput"
      >
        <b-form-input
          id="amountInput"
          type="number"
          step="0.001"
          v-model="form.amount"
          required
          placeholder="Enter amount" />
      </b-form-group>

      <b-form-group
        id="descriptionInputGroup"
        label="Description:"
        label-for="descriptionInput"
      >
        <b-form-input
          id="descriptionInput"
          type="text"
          v-model="form.description"
          placeholder="Enter description" />
      </b-form-group>

      <b-form-group
        id="sourceInputGroup"
        label="Source:"
        label-for="sourceInput"
      >
        <b-form-select
          id="exampleInput3"
          :options="sources"
          v-model="form.source" />
      </b-form-group>

      <b-form-group
        id="tagGroup"
        label="Tags:"
        label-for="tagInput"
      >
        <b-form-checkbox-group
          v-model="form.tags"
          id="exampleChecks"
        >
          <b-form-checkbox value="basic">Basic</b-form-checkbox>
          <b-form-checkbox value="fun">Fun</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
data() {
  return {
    form: {
      amount: null,
      description: null,
      source: null,
      tags: []
    },
    sources: [
      { text: 'Select One', value: null },
      'Nuconta',
      'Credit Card',
      'Wallet',
    ],
    show: true
  }
},
methods: {
  onSubmit(evt) {
    evt.preventDefault();
    alert(JSON.stringify(this.form));
    this.onReset();
  },
  onReset() {
    /* Reset our form values */
    this.form.amount = null
    this.form.description = null
    this.form.source = null
    this.form.tags = []
    /* Trick to reset/clear native browser form validation state */
    this.show = false
    this.$nextTick(() => {
      this.show = true
    })
  }
}
}
</script>
