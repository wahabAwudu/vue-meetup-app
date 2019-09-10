<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <router-link to="/" class="btn btn-primary">Home</router-link>
        <Logout></Logout>
        <form>
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" v-model="title" name="title" class="form-control" />
          </div>
          <br />
          <div class="form-group">
            <label for="description">Description</label>
            <input type="text" v-model="description" name="description" class="form-control" />
          </div>
          <br />
          <button type="button" class="btn btn-primary btn-block" @click="createMeetup">Add +</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
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
      description: null
    };
  },

  methods: {
    createMeetup() {
      const payload = {
        title: this.title,
        description: this.description
      };

      axios
        .post(meetupsUrl, payload, { headers: getHeaders() })
        .then(res => {
          successToast(this, "meetup added!");
          this.$router.replace("/");
        })
        .catch(err => {
          errorToast(this, "error adding meetup, retry.", error);
        });
    }
  }
};
</script>