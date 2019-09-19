<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <form>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" v-model="username" class="form-control" name="username" />
          </div>

          <div v-if="serverErrors.username">
            <ul>
              <li class="text-danger" v-for="err in serverErrors.username" :key="err">{{err}}</li>
            </ul>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="email" class="form-control" name="email" />
          </div>
          <div v-if="serverErrors.email">
            <ul>
              <li class="text-danger" v-for="err in serverErrors.email" :key="err">{{err}}</li>
            </ul>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" class="form-control" name="password" />
          </div>

          <div v-if="serverErrors.password1">
            <ul>
              <li class="text-danger" v-for="err in serverErrors.password1" :key="err">{{err}}</li>
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

          <button type="button" @click="register" class="btn btn-primary">
            Register
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </button>
          <router-link to="/login">login?</router-link>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { registerUrl, errorToast, successToast } from "@/config";
import axios from "axios";

export default {
  data() {
    return {
      username: null,
      password: null,
      email: null,
      serverErrors: {},
      loading: false
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

      this.loading = true;

      axios
        .post(registerUrl, payload)
        .then(res => {
          this.loading = false;
          successToast(this, "Registration successful!");
          this.$router.replace("/login");
        })
        .catch(err => {
          this.loading = false;
          if (err.response) {
            this.serverErrors = err.response.data;
          }
          errorToast(this, "Registration error, retry", err);
        });
    }
  }
};
</script>