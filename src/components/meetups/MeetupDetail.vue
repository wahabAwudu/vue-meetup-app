<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2 mb-5">
        <div class="mt-5">
          <router-link to="/" class="btn btn-primary">All Meetups</router-link>
          <Logout></Logout>
        </div>
        <h5 class="mb-5 mt-5 text-center">Questions are arranged by highest upvotes in real time!</h5>

        <div class="card mt-2">
          <div class="card-header">
            <h3 class="text-primary">{{meetup.title.toUpperCase()}}</h3>
            <p class="text-secondary">{{meetup.description}}</p>
            <p class="text-secondary">{{meetup.venue}}</p>
            <p class="text-secondary">{{meetup.date}}</p>
          </div>
          <div class="card-body">
            <!-- questions -->
            <div class="card">
              <div class="card-header">Questions: {{questions.length}}</div>
              <div class="card-body" v-for="q in questions" :key="q.id">
                <p>{{q.text}}</p>
                <div class="row">
                  <div class="col-xs-6">
                    <button
                      type="button"
                      class="btn btn-info btn-xs"
                      @click="upvote(q)"
                    >up {{q.upvotes}}</button>
                  </div>
                  <div class="col-xs-6">
                    <button
                      type="button"
                      class="btn btn-secondary btn-xs"
                      @click="downvote(q)"
                    >down {{Math.abs(q.downvotes)}}</button>
                  </div>
                </div>
              </div>
            </div>
            <!-- end questions -->
            <form>
              <div class="form-group mt-3">
                <input type="text" class="form-control" v-model="question" placeholder="ask here.." />
                <div v-if="serverErrors.text">
                  <ul>
                    <li class="text-danger" v-for="err in serverErrors.text" :key="err">{{err}}</li>
                  </ul>
                </div>
                <br />
                <button type="button" class="btn btn-primary" @click="createQuestion(meetup.id)">Ask</button>
              </div>
            </form>
          </div>
        </div>
        <br />
        <router-link to="/" class="btn btn-primary">All Meetups</router-link>
        <Logout></Logout>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {
  meetupsUrl,
  questionsUrl,
  getHeaders,
  errorToast,
  successToast
} from "@/config";
import axios from "axios";
import Logout from "@/components/auth/Logout";

export default {
  name: "Home",
  components: {
    Logout
  },

  data() {
    return {
      id: this.$route.params.id,
      meetup: {},
      questions: [],
      upvotes: null,
      downvotes: null,
      question: null,
      serverErrors: {}
    };
  },

  created() {
    axios
      .get(meetupsUrl + this.id + "/", { headers: getHeaders() })
      .then(res => {
        this.meetup = res.data;
        this.questions = res.data.questions.sort(
          (a, b) => b.upvotes - a.upvotes
        );
      })
      .catch(err => {
        errorToast(this, "error connecting to server", err);
      });
  },

  methods: {
    createQuestion() {
      const payload = {
        meetup_id: this.id,
        text: this.question
      };

      axios
        .post(questionsUrl, payload, { headers: getHeaders() })
        .then(res => {
          this.question = null;
          this.questions.push(res.data);
          successToast(this, "added!");
        })
        .catch(err => {
          if (err.response) {
            this.serverErrors = err.response.data;
          }
          errorToast(this, "oops! error, retry.", err);
        });
    },

    upvote(question) {
      axios
        .post(
          questionsUrl + "add_upvotes/",
          { question_id: question.id },
          { headers: getHeaders() }
        )
        .then(res => {
          this.questions.map((q, index) => {
            if (q.id == res.data.id) {
              this.questions.splice(index, 1, res.data);
            }
          });
          this.questions.sort((a, b) => b.upvotes - a.upvotes);
          successToast(this, "done!");
        })
        .catch(err => {
          errorToast(this, "error upvoting, retry.", err);
        });
    },

    downvote(question) {
      axios
        .post(
          questionsUrl + "add_downvotes/",
          { question_id: question.id },
          { headers: getHeaders() }
        )
        .then(res => {
          this.questions.map((q, index) => {
            if (q.id == res.data.id) {
              this.questions.splice(index, 1, res.data);
            }
          });
          successToast(this, "done!");
        })
        .catch(err => {
          errorToast(this, "error downvoting, retry", err);
        });
    }
  }
};
</script>

<style scoped>
</style>
