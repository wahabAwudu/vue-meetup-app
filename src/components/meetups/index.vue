<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2 mb-3">
        <div class="mt-5">
          <router-link to="/meetups/add-new" class="btn btn-primary">New Meetup</router-link>
          <Logout></Logout>
        </div>
        <h1 class="mt-5 text-center text-primary">MeetUps</h1>

        <div class="card mt-2" v-for="meetup in meetups" :key="meetup.id">
          <div class="card-header">
            <h3 class="text-primary">
              <router-link :to="'/meetups/' + meetup.id">{{meetup.title}}</router-link>
            </h3>
          </div>
          <div class="card-body">
            <p>Date: {{meetup.date}}</p>
            <p>Venue: {{meetup.venue}}</p>
            <router-link :to="'/meetups/' + meetup.id" class="btn btn-primary">View</router-link>
          </div>
        </div>
        <p v-if="meetups.length === 0">No Meetups Available</p>
        <br />
        <router-link to="/meetups/add-new" class="btn btn-primary">New Meetup</router-link>
        <Logout></Logout>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { meetupsUrl, questionsUrl, getHeaders, errorToast } from "@/config";
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
        errorToast(this, "error retrieving meetups, retry.", err);
      });
  },

  methods: {
    //
  }
};
</script>

<style scoped>
</style>
