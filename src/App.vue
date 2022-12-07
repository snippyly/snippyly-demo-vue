<template>
  <div>
    <snippyly-cursor></snippyly-cursor>
    <snippyly-comments-sidebar></snippyly-comments-sidebar>
    <snippyly-comment-tool></snippyly-comment-tool>
    <snippyly-recorder-control-panel></snippyly-recorder-control-panel>
    <snippyly-recorder-notes></snippyly-recorder-notes>
    <snippyly-huddle></snippyly-huddle>
    <div class="header">
      <snippyly-presence></snippyly-presence>
      <div class="menu-container">
        <span class="menu" v-on:click="navigateTo('/')">Home</span>
        <span class="menu" v-on:click="navigateTo('/stream-view')">Stream View</span>
        <span class="menu" v-on:click="
          navigateTo('https://snippyly-demo-vue-wdp.web.app/', '_blank')
        ">Document Params</span>
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
import { SnippylyClient } from "./snippylyClient";
import {initSnippyly, getSnippylyClient} from '@snippyly/client';

let selectedUser;

/**
 * @type {import('@snippyly/types').Snippyly}
 */
var client;

const initializeSnippyly = async () => {
  await initSnippyly('hny91vx3KUxEIp61jBd1');
  client = await getSnippylyClient();
  console.log("snippyly loaded", window.Snippyly);
  console.log("init Snippyly", client);
  SnippylyClient.setClient(client);

  // To enable text comment feature
  const commentElement = client.getCommentElement();
  commentElement.enableTextComments(true);
  // Enable attachment feature
  commentElement.enableAttachment(true);
  // Show screen size info
  commentElement.showScreenSizeInfo(true);
  // To enable live selection feature
  const selectionElement = client.getSelectionElement();
  selectionElement.enableLiveSelection(true);

  // Set document id
  client.setDocumentId(excludeSnippylyParamsFromUrl(window.location.href));

  if (getUser()) {
    selectedUser = getUser();
    identify();
  }
};

const excludeSnippylyParamsFromUrl = (url) => {
  try {
    const tempUrl = new URL(url);
    ['review', 'sreviewId', 'snippyly-user', 'scommentId', 'stagId'].forEach((param) => {
      tempUrl.searchParams.delete(param);
    });
    return tempUrl.href;
  } catch (err) {
    return url;
  }
}

const identify = async () => {
  await client.identify(selectedUser);
};

const signIn = (user) => {
  selectedUser = user;
  localStorage.setItem("user", JSON.stringify(selectedUser));
  identify();
  this.componentKey += 1;
};

const signOut = async () => {
  if (client) {
    await client.signOutUser();
  }
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
    initializeSnippyly();
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
  bottom: 24px;
  right: 24px;
  z-index: 100000;
  padding: 8px;
  background: black;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  background: white;
  box-shadow: 2px 2px 8px -2px grey;
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
