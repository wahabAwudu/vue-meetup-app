/* eslint-disable */

// set request headers
import axios from "axios";

export const baseUrl = process.env.API_ENDPOINT;

// auth endpoints
export const baseAuth = baseUrl + "rest-auth/";
export const loginUrl = baseAuth + "login/";
export const logoutUrl = baseAuth + "logout/";
export const registerUrl = baseAuth + "registration/";
export const authTokenUrl = baseAuth + "registration/auth/v1/token-auth/";
export const verifyAccountUrl = baseAuth + "registration/verify-email/";
export const passwordResetUrl = baseAuth + "password/reset/";
export const passwordResetConfirmUrl = baseAuth + "password/reset/confirm/";
export const passwordChangeUrl = baseAuth + "password/change/";
export const refreshTokenUrl = baseAuth + "refresh-token/";
export const userUrl = baseAuth + "user/";
export const customUsersUrl = baseUrl + "users/";

// resources.
export const meetupsUrl = baseUrl + 'meetups/'
export const questionsUrl = baseUrl + 'questions/'

export const getHeaders = () => {
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";

  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT " + authUser.token
  };

  return headers
};


export const successToast = (...args) => {
  // args[0] = this
  // args[1] = toast message.
  args[0].$toasted.success(args[1], {
    position: "top-right",
    duration: 3000
  });
};

export const errorToast = (...args) => {
  // args[0] = this.
  // args[1] = toast message.
  // args[2] = toast error.
  if (args[2].response) {
    if (args[2].response.status === 401) {
      // args[0].$store.dispatch('removeAuthUser');
      localStorage.removeItem('authUser');
      args[0].$toasted.info('your session has expired, login again.', {
        position: "top-center",
        duration: 5000
      });
      args[0].$router.push('/login');
    } else {
      args[0].$toasted.error(args[1], {
        position: "top-center",
        duration: 3000
      });
    }

  } else {
    args[0].$toasted.error('connection failed, retry.', {
      position: "top-center",
      duration: 3000
    });
  }

};
