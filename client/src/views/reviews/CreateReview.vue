<template>
  <form class="review-form" @submit.prevent="onSubmit">
    <p>
      <label for="beerID">Beer:</label>
      <input id="beerID" v-model="beerID" placeholder="5d8a0484aec6759dad2c0016" required/>
    </p>

    <p>
      <label for="score">Score:</label>
      <select id="score" v-model.number="score" required>
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>
      <label for="textReview">Text review:</label>
      <textarea id="textReview" v-model="textReview"></textarea>
    </p>

    <p>
      <input type="submit" value="Submit" />
    </p>
  </form>
</template>

<script>
import { Api } from "@/Api";
// NOT USED!!! INCLUDED IN POST

export default {
  name: "CreateReview",
  data() {
    return {
      beerID: null,
      score: null,
      textReview: null
    };
  },
  methods: {
    onSubmit() {
      var theReview = {
        beerID: this.beerID,
        score: this.score,
        textReview: this.textReview
      };
      Api.post("/reviews", theReview).catch(error => {
        console.log(error);
      });
      this.beerID = null;
      this.score = null;
      this.textReview = null;
    }
  }
};
</script>
