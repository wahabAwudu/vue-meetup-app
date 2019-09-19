<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2 mt-5">
        <form>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" name="username" v-model="username" />
          </div>

          <div v-if="serverErrors.username">
            <ul>
              <li class="text-danger" v-for="err in serverErrors.username" :key="err">{{err}}</li>
            </ul>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" name="password" class="form-control" />
          </div>

          <div v-if="serverErrors.password">
            <ul>
              <li class="text-danger" v-for="err in serverErrors.password" :key="err">{{err}}</li>
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

          <button type="button" @click="login" class="btn btn-primary">
            Login
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </button>
          <router-link to="/register">register?</router-link>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */

import { loginUrl, successToast, errorToast } from "@/config";
import axios from "axios";

export default {
  data() {
    return {
      username: null,
      password: null,
      loading: false,
      serverErrors: {}
    };
  },

  methods: {
    login() {
      const payload = {
        username: this.username,
        password: this.password
      };

      this.loading = true;

      axios
        .post(loginUrl, payload)
        .then(res => {
          this.loading = false;
          let authUser = {};
          authUser.token = res.data.token;

          localStorage.setItem("authUser", JSON.stringify(authUser));
          successToast(this, "Login Successfull!");
          this.$router.push("/");
        })
        .catch(err => {
          this.loading = false;
          if (err.response) {
            this.serverErrors = err.response.data;
          }
          errorToast(this, "Error Logining in, retry", err);
        });
    }
  }
};
</script>