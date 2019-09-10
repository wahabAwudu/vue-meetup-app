<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="mt-5 text-center text-primary">Meet-Ups</h1>

        <div class="card mt-2" v-for="meetup in meetups" :key="meetup.id">
          <div class="card-header">
            <h3 class="text-primary">
              <router-link :to="'/meetups/' + meetup.id">{{meetup.title}}</router-link>
            </h3>
          </div>
          <div class="card-body">
            <p>{{meetup.description}}</p>
          </div>
        </div>
        <br />
        <router-link to="/meetups/add-new" class="btn btn-primary">add new</router-link>
        <Logout></Logout>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { meetupsUrl, questionsUrl, getHeaders } from "@/config";
import axios from "axios";
import Logout from "@/components/auth/Logout";

export default {
  name: "Home",
  components: {
    Logout
  },

  data() {
    return {
      meetups: [],
      question: null
    };
  },

  created() {
    axios
      .get(meetupsUrl, { headers: getHeaders() })
      .then(res => {
        this.meetups = res.data;
      })
      .catch(err => {
        alert("error");
      });
  },

  methods: {
    createQuestion(meetup_id) {
      const payload = {
        meetup_id: meetup_id,
        text: question
      };

      axios
        .post(questionsUrl, payload, { headers: getHeaders() })
        .then(res => {
          this.meetups = res.data;
        })
        .catch(err => {
          alert("error");
        });
    }
  }
};
</script>

<style scoped>
</style>
