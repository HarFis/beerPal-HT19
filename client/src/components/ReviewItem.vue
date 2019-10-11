<template>
  <div>
    <b-list-group>
      <b-list-group-item>
        <b-container>
          <b-row>
            <b-col md="3" class="text-left">
              <p class="beer-titel">
                <span v-if="!(review.beer==null)">{{ review.beer.name }}</span>
                <span v-else>deleted Beer</span>
              </p>
            </b-col>
            <b-col md="3">
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
            <b-col md="2">{{ changeFormat(this.review.created) }}</b-col>
            <b-col md="4">
              
              <b-button ref="modal" variant="outline-info" size="sm" @click="showModal">edit</b-button>&nbsp;
              <b-button variant="outline-danger" size="sm" @click="$emit('delete-review', review._id)">delete</b-button>
            </b-col>
          </b-row>
          <b-row >
            <b-col>
              <p class="text-left">
                Comment: 
                <span v-if="review.textReview" class="font-review">{{ review.textReview }}</span>
                                <span v-else class="font-review"> n/a</span>

              </p>
            </b-col>
          </b-row>
        </b-container>
      </b-list-group-item>
    </b-list-group>

    <!-- MODAL element S-T-A-R-T -->
    <b-modal
      ref="modal"
      title="Edit review:"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form>
        <b-form-group label="Score" label-for="form-review-score" @submit.stop.prevent>
          <b-form-select id="score" v-model="form.score">
            <option :value="null">Choose...</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </b-form-select>
        </b-form-group>
        <b-form-group label="Review" label-for="form-review-textReview" description="Maximum 60 characters"  force-show="true" invalid-feedback="Review is too long. Max 60 characters." >
          <b-form-input
            v-model="form.textReview"
            id="form-review-textReview"
            size="sm"
            placeholder="Write here ... "
            :state="valid"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
    <!-- MODAL element E-N-D -->

  </div>
</template>

<script>
import moment from "moment";

export default {
  invalid: false,
  name: "review-item",
  props: ["review"],
  data() {
    return {
      valid: true,
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
    checkFormValidity() {
      this.valid = true;
        if(this.form.textReview.length > 60){this.valid=false;}
        return this.valid;
      },
    handleSubmit(id) {
       if (!this.checkFormValidity()) {
          return
        }
        let newReview = {
        score: this.form.score,
        textReview: this.form.textReview
      };
      this.$emit("edit-review", id, newReview);
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },
    resetModal() {
      this.form.score = null;
      this.form.textReview = "";
    },
    showModal() {
      this.$refs["modal"].show();
    },
    hideModal() {
      this.$refs["modal"].hide();
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit(this.review._id);
    }
  }
};
</script>

<style scoped>
</style>
