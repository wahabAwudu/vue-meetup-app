<template>
  <div class="container text-center mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <form>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" v-model="username" class="form-control" name="username" />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="email" class="form-control" name="email" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" class="form-control" name="password" />
          </div>

          <button type="button" @click="register" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { registerUrl } from "@/config";
import axios from "axios";

export default {
  data() {
    return {
      username: null,
      password: null,
      email: null
    };
  },

  methods: {
    register() {
      const payload = {
        username: this.username,
        password1: this.password,
        password2: this.password,
        email: this.email
      };

      axios
        .post(registerUrl, payload)
        .then(res => {
          this.$router.push("/login");
        })
        .catch(err => {
          alert("error ocurred");
        });
    }
  }
};
</script>