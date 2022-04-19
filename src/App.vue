<template>
  <div>
    <snippyly-cursor></snippyly-cursor>
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
      <div>
        <!-- <Home> -->
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
        <!-- </Home> -->
      </div>
    </div>
    <div class="box-container">
      <div class="box" v-for="box in boxes" :key="box" :id="'box' + box">
        <span>{{ box }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Home from "./components/Home.vue";
import { Users } from "./users";
import loadSnippyly from "./loadSnippyly";

let selectedUser;
var Snippyly;
var client;

const initSnippyly = async () => {
  client = await Snippyly.init("hny91vx3KUxEIp61jBd1", {
    featureAllowList: [], // To allow specific features only
    // userIdAllowList: ['abcd'], // To allow specific users only
    urlAllowList: [], // To allow snippyly in specific screens only
  });
  console.log("init Snippyly", client);

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
    // isUserLoggedIn: () => !!selectedUser
  },
  computed: {
    loggedInUser: () => selectedUser,
  },
  mounted() {
    loadSnippyly(() => {
      console.log("snippyly loaded", window.Snippyly);
      Snippyly = window.Snippyly;
      initSnippyly();
    });
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
</style>
