<template>
  <button type="button" class="btn btn-danger" @click="logout">logout</button>
</template>
<script>
/* eslint-disable */
export default {
  name: "Logout",

  methods: {
    logout() {
      localStorage.removeItem("authUser");
      this.$router.push("/login");
    }
  }
};
</script>