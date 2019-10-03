<template>
  <b-list-group>
    <b-list-group-item>
      <b-container>
        <b-row>
          <b-col md=3 class="text-left">
            <p class="beer-titel">
              <span v-if="!(review.beer==null)">{{ review.beer.name }}</span>
              <span v-else>deleted Beer</span>
            </p>
          </b-col>
          <b-col md=2>
            Score:
            <span v-if="review.score===1">
              <img class="img-score" alt="1/5 beers" src="../assets/1av5.png" />
            </span>
            <span v-else-if="review.score===2">
              <img class="img-score" alt="2/5 beers" src="../assets/2av5.png" />
            </span>
            <span v-else-if="review.score===3">
              <img class="img-score" alt="3/5 beers" src="../assets/3av5.png" />
            </span>
            <span v-else-if="review.score===4">
              <img class="img-score" alt="4/5 beers" src="../assets/4av5.png" />
            </span>
            <span v-else>
              <img class="img-score" alt="5/5 beers" src="../assets/5av5.png" />
            </span>
          </b-col>
          <b-col md=3>consumed on: {{ changeFormat(this.review.created) }}</b-col>
          <b-col md=4>
            <b-dropdown
              variant="outline-info"
             id="dropdown-right" 
             right text="edit"
              ref="dropdown"
              class="m-2"
            >
              <b-dropdown-text style="max-width: 350px">Edit fields you want to update:</b-dropdown-text>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-form>
                <b-form-group label="Score" @submit.stop.prevent>
                  <b-form-select
                    id="form-review-score"
                    v-model.number="form.score"
                    :options="options"
                  ></b-form-select>
                </b-form-group>
                <b-form-group label="Review" description="maximum: 60 characters">
                  <b-form-input v-model="form.textReview" id="form-review-text" size="sm"></b-form-input>
                </b-form-group>
                <b-button variant="info" size="sm" @click="onClick(review._id)">Save changes</b-button>
              </b-dropdown-form>
            </b-dropdown>&nbsp;
            <b-button variant="outline-danger" @click="$emit('delete-review', review._id)">delete</b-button>
          </b-col>
        </b-row>
        <b-row v-show="review.textReview">
          <b-col>
            <p class="text-left">
              Comment:
              <span class="font-review">{{ review.textReview }}</span>
            </p>
          </b-col>
        </b-row>
      </b-container>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import moment from "moment";

export default {
  name: "review-item",
  props: ["review"],
  data() {
    return {
      options: [
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" }
      ],
      form: {
        score: null,
        textReview: null
      }
    };
  },
  methods: {
    changeFormat(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
    onClick(id) {
      console.log(id);
      let newReview = {
        score: this.form.score,
        textReview: this.form.textReview
      };
      this.$emit("edit-review", id, newReview);
      this.$refs.dropdown.hide(true);
      this.form.score = null;
      this.form.textReview = null;
      this.$forceUpdate();

    }
  }
};
</script>

<style scoped>
</style>
