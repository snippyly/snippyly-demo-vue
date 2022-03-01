<template>
  <div>
    <snippyly-presence></snippyly-presence>
    <snippyly-cursor></snippyly-cursor>
    <Home>
      <template v-if="renderActionContainer">
        <div class="action-container" v-if="!selectedUser">
          <span>Sign In with:</span>
          <div v-for="user in users" :key="user.userId">
            <button class="custom-btn" v-on:click="signIn(user)">
              {{ user.name }}
            </button>
          </div>
        </div>
        <div class="action-container" v-if="selectedUser">
          <span>Hi, {{ selectedUser.name }}</span>
          <button class="custom-btn" v-on:click="signOut">Sign Out</button>
        </div>
      </template>
    </Home>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Home from "./components/Home.vue";
import { Snippyly } from "@snippyly/sdk";
import { Users } from "./users";

let selectedUser;

const initSnippyly = async () => {
  const snippyly = await Snippyly.init({
    apiKey: "hny91vx3KUxEIp61jBd1", // Add your Api Key here
    featureAllowList: [], // To allow specific features only
    // userIdAllowList: ['abcd'], // To allow specific users only
    urlAllowList: [], // To allow snippyly in specific screens only
    user: selectedUser, // Pass user with unique userId
  });
  console.log("app component created", snippyly);
};

const signIn = (user) => {
  selectedUser = user;
  localStorage.setItem("user", JSON.stringify(selectedUser));
  initSnippyly();
  this.componentKey += 1;
};

const signOut = () => {
  localStorage.removeItem("user");
  window.location.reload();
};

const getUser = () => {
  return selectedUser || (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
}

export default {
  name: "App",
  components: {
    HelloWorld,
    Home,
  },
  data: () => {
    return {
      users: Users,
      selectedUser: getUser(),
      isUserLoggedIn: !!selectedUser,
      renderActionContainer: true,
    };
  },
  methods: {
    signIn(user) {
      this.renderActionContainer = false;
      signIn(user);
      this.$nextTick(() => {
        this.renderActionContainer = true;
        this.selectedUser = selectedUser;
      })
    },
    signOut,
    // isUserLoggedIn: () => !!selectedUser
  },
  computed: {
    loggedInUser: () => selectedUser,
  },
  created() {
    if (getUser()) {
      selectedUser = getUser();
      initSnippyly();
    }
  },
};
</script>

<style>
.custom-btn {
  background: white;
  border: 0;
  color: #0084ff;
  padding: 8px 16px;
  border-radius: 16px;
  font-weight: bold;
  margin: 0 0 0 16px;
  cursor: pointer;
}
.action-container {
  display: flex;
  align-items: center;
}
</style>
