import Home from '@/components/meetups'
import MeetupForm from '@/components/meetups/MeetupForm'
import MeetupDetail from '@/components/meetups/MeetupDetail'

// auth
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
/* eslint-disable */

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      private: true
    }
  },
  {
    path: '/meetups/add-new',
    name: 'MeetupForm',
    component: MeetupForm,
    meta: {
      private: true
    }
  },
  {
    path: '/meetups/:id',
    name: 'MeetupDetail',
    component: MeetupDetail,
    meta: {
      private: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      public: true
    }
  },
  {
    path: '/register',
    name: 'Login',
    component: Register,
    meta: {
      public: true
    }
  },

]

export default routes
