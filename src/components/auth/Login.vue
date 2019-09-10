<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2 mt-5">
        <form>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" name="username" v-model="username" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" name="password" class="form-control" />
          </div>

          <button type="button" @click="login" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { loginUrl } from "@/config";
import axios from "axios";

export default {
  data() {
    return {
      username: null,
      password: null
    };
  },

  methods: {
    login() {
      const payload = {
        username: this.username,
        password: this.password
      };

      axios
        .post(loginUrl, payload)
        .then(res => {
          let authUser = {};
          authUser.token = res.data.token;

          localStorage.setItem("authUser", JSON.stringify(authUser));
          this.$router.push("/");
        })
        .catch(err => {
          alert("error");
        });
    }
  }
};
</script>