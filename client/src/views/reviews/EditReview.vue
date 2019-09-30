<template>
  <div><b-container>
    <b-row><b-col style="background: lightblue;">
    Edit review for: <h1><span v-if="review.beer"> {{ review.beer.name }}</span></h1>
    <p>
      Current score: {{ review.score }}
      <br />
      Current textual review: {{ review.textReview }}
    </p>
    </b-col>
    </b-row>
    </b-container>
    <p>Here you can edit the values that you want to change:</p>

    <form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="score">Score:</label>
        <select id="score" v-model.number="form.score">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <label for="textReview">Text review:</label>
        <textarea id="textReview" v-model="form.textReview"></textarea>
      </p>

      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
  </div>
</template>

<script>
import { Api } from "@/Api";

export default {
  name: "EditReview",
  props: ["reviewID"],
  data() {
    return {
      review: {
        score: null,
        textReview: null,
        created: null
      },
      form: {
        beerName: null,
        score: null,
        textReview: null
      }
    };
  },
  mounted() {
    this.getReview();
  },
  methods: {
    getReview() {
      Api.get("reviews/" + this.reviewID)
        .then(response => {
          this.review = response.data.review;
        })
        .catch(error => {
          this.review = null;
          console.log(error);
        });
    },
    onSubmit() {
      var theReview = {
        score: this.form.score,
        textReview: this.form.textReview
      };
      Api.patch("reviews/" + this.reviewID, theReview)
        .then(response => {
          this.review = response.data.review;
          alert("Updated!");
          this.$router.push({path: '/reviews'})
        })
        .catch(error => {
          console.log(error);
          alert("Something went wrong, try again!");
        });
      this.form.score = null;
      this.form.textReview = null;
    }
  }
};
</script>
