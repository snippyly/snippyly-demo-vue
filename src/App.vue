<template>
  <div>
    <snippyly-cursor></snippyly-cursor>
    <snippyly-comments-sidebar></snippyly-comments-sidebar>
    <snippyly-comment-tool>
      <div class="add-comment-btn">
        <img
          src="https://cdn-icons-png.flaticon.com/512/727/727570.png"
          alt="Add comment"
        />
      </div>
    </snippyly-comment-tool>
    <div class="header">
      <snippyly-presence></snippyly-presence>
      <div class="menu-container">
        <span class="menu" v-on:click="navigateTo('/')">Home</span>
        <span class="menu" v-on:click="navigateTo('/stream-view')"
          >Stream View</span
        >
        <span
          class="menu"
          v-on:click="
            navigateTo('https://snippyly-demo-vue-wdp.web.app/', '_blank')
          "
          >Document Params</span
        >
      </div>
      <div>
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
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Home from "./components/Home.vue";
import { Users } from "./users";
import loadSnippyly from "./loadSnippyly";
import { SnippylyClient } from "./snippylyClient";

let selectedUser;

/**
 * @type {import('@snippyly/types').Snippyly}
 */
var Snippyly;
/**
 * @type {import('@snippyly/types').Snippyly}
 */
var client;

const initSnippyly = async () => {
  console.log("snippyly loaded", window.Snippyly);
  Snippyly = window.Snippyly;
  client = await Snippyly.init("hny91vx3KUxEIp61jBd1", {
    featureAllowList: [], // To allow specific features only
    // userIdAllowList: ['abcd'], // To allow specific users only
    urlAllowList: [], // To allow snippyly in specific screens only
  });
  console.log("init Snippyly", client);
  SnippylyClient.setClient(client);

  // To enable text comment feature
  const commentElement = client.getCommentElement();
  commentElement.enableTextComments(true);

  if (getUser()) {
    selectedUser = getUser();
    identify();
  }
};

const identify = async () => {
  await client.identify(selectedUser);
};

const signIn = (user) => {
  selectedUser = user;
  localStorage.setItem("user", JSON.stringify(selectedUser));
  identify();
  this.componentKey += 1;
};

const signOut = () => {
  localStorage.removeItem("user");
  window.location.reload();
};

const getUser = () => {
  return (
    selectedUser ||
    (localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null)
  );
};

const navigateTo = (path, target = "_self") => {
  window.open(path, target);
};

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
      boxes: Array.from({ length: 25 }, (_, i) => i + 1),
    };
  },
  methods: {
    signIn(user) {
      this.renderActionContainer = false;
      signIn(user);
      this.$nextTick(() => {
        this.renderActionContainer = true;
        this.selectedUser = selectedUser;
      });
    },
    signOut,
    navigateTo(path, target) {
      navigateTo(path, target);
    },
    // isUserLoggedIn: () => !!selectedUser
  },
  computed: {
    loggedInUser: () => selectedUser,
  },
  mounted() {
    loadSnippyly(initSnippyly);
  },
};
</script>

<style>
.header {
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-btn {
  color: white;
  border: 0;
  background: #0084ff;
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
.box-container {
  display: flex;
  flex-wrap: wrap;
}

.box {
  height: 200px;
  /* min-width: 200px; */
  background: greenyellow;
  border-radius: 8px;
  flex: 0 0 202px;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
}

snippyly-comment-tool {
  position: fixed;
  z-index: 1000000;
  bottom: 24px;
  right: 24px;
}

snippyly-comment-tool .add-comment-btn {
  padding: 0.75rem;
  background: #fff3d1;
  border-radius: 50%;
  cursor: pointer;
  background: white;
  /* background: #e7e7e7; */
  box-shadow: 2px 2px 8px -2px grey;
}

snippyly-comment-tool .add-comment-btn img {
  width: 1.5rem;
  height: 1.5rem;
}

.text-comments-container {
  padding: 24px;
}

.menu {
  margin: 0 12px;
  cursor: pointer;
}

.menu:hover {
  color: #0084ff;
}
</style>
