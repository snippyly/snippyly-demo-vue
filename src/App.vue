<template>
  <div>
    <velt-cursor></velt-cursor>
    <velt-comments-sidebar></velt-comments-sidebar>
    <velt-comment-tool></velt-comment-tool>
    <velt-recorder-control-panel></velt-recorder-control-panel>
    <velt-recorder-notes></velt-recorder-notes>
    <velt-huddle></velt-huddle>
    <div class="header">
      <velt-presence></velt-presence>
      <div class="menu-container">
        <span class="menu" v-on:click="navigateTo('/')">Home</span>
        <span class="menu" v-on:click="navigateTo('/stream-view')">Stream View</span>
        <span class="menu" v-on:click="
          navigateTo('https://velt-demo-vue-wdp.web.app/', '_blank')
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
import { VeltClient } from "./veltClient";
import {initVelt, getVeltClient} from '@veltdev/client';

let selectedUser;

/**
 * @type {import('@veltdev/types').Velt}
 */
var client;

const initializeVelt = async () => {
  await initVelt('hny91vx3KUxEIp61jBd1');
  client = await getVeltClient();
  console.log("velt loaded", window.Velt);
  console.log("init Velt", client);
  VeltClient.setClient(client);

  // To enable text comment feature
  const commentElement = client.getCommentElement();
  commentElement.enableTextComments();
  // Enable attachment feature
  commentElement.enableAttachments();
  // Show screen size info
  commentElement.enableDeviceInfo();
  // To enable live selection feature
  const selectionElement = client.getSelectionElement();
  selectionElement.enableLiveSelection();

  // Set document id
  client.setDocumentId(excludeVeltParamsFromUrl(window.location.href));

  if (getUser()) {
    selectedUser = getUser();
    identify();
  }
};

const excludeVeltParamsFromUrl = (url) => {
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
    initializeVelt();
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

velt-comment-tool {
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
