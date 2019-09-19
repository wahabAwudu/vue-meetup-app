<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2 mb-5 mt-5">
        <router-link to="/" class="btn btn-primary">Home</router-link>
        <Logout></Logout>
        <form class="mt-5">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" v-model="title" name="title" class="form-control" />
          </div>
          <div v-if="serverErrors.title">
            <ul>
              <li class="text-danger" v-for="err in serverErrors.title" :key="err">{{err}}</li>
            </ul>
          </div>

          <br />
          <div class="form-group">
            <label for="description">Description</label>
            <textarea v-model="description" name="description" class="form-control"></textarea>
          </div>
          <div v-if="serverErrors.description">
            <ul>
              <li class="text-danger" v-for="err in serverErrors.description" :key="err">{{err}}</li>
            </ul>
          </div>

          <br />
          <div class="form-group">
            <label for="date">Date</label>
            <input type="date" v-model="date" name="date" class="form-control" />
          </div>
          <div v-if="serverErrors.date">
            <ul>
              <li class="text-danger" v-for="err in serverErrors.date" :key="err">{{err}}</li>
            </ul>
          </div>
          <br />

          <!-- <div class="form-group">
            <label for="time">Time</label>
            <input type="time" v-model="time" name="time" class="form-control" />
          </div>
          <div v-if="serverErrors.time">
            <ul>
              <li class="text-danger" v-for="err in serverErrors.time" :key="err">{{err}}</li>
            </ul>
          </div>-->

          <br />
          <div class="form-group">
            <label for="venue">Venue</label>
            <input type="text" v-model="venue" name="venue" class="form-control" />
          </div>

          <div v-if="serverErrors.venue">
            <ul>
              <li class="text-danger" v-for="err in serverErrors.venue" :key="err">{{err}}</li>
            </ul>
          </div>

          <div v-if="serverErrors.non_field_errors">
            <ul>
              <li
                class="text-danger"
                v-for="err in serverErrors.non_field_errors"
                :key="err"
              >{{err}}</li>
            </ul>
          </div>
          <button type="button" class="btn btn-primary btn-block" @click="createMeetup">Add +</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { meetupsUrl, getHeaders, successToast, errorToast } from "@/config";
import axios from "axios";
import Logout from "@/components/auth/Logout";

export default {
  components: {
    Logout
  },

  data() {
    return {
      title: null,
      description: null,
      date: null,
      venue: null,
      serverErrors: {},
      loading: false
    };
  },

  methods: {
    createMeetup() {
      const payload = {
        title: this.title,
        description: this.description,
        date: this.date,
        venue: this.venue
      };

      this.loading = true;

      axios
        .post(meetupsUrl, payload, { headers: getHeaders() })
        .then(res => {
          this.loading = false;
          successToast(this, "meetup added!");
          this.$router.replace("/");
        })
        .catch(err => {
          this.loading = false;
          if (err.response) {
            this.serverErrors = err.response.data;
          }
          errorToast(this, "error adding meetup, retry.", err);
        });
    }
  }
};
</script>