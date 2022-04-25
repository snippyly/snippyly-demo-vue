<template>
  <div>
    <snippyly-cursor></snippyly-cursor>
    <snippyly-comments></snippyly-comments>
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
        <span
          v-for="menu in menus"
          :key="menu.name"
          class="menu"
          :class="{ selected: selectedMenu.name === menu.name }"
          v-on:click="onMenuChange(menu)"
        >
          {{ menu.name }}
        </span>
      </div>
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
    <div>
      <div class="tabs-container">
        <div class="tabs-block">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            class="tab"
            :class="{ selected: selectedTab === index + 1 }"
            v-on:click="onSelectTab(index + 1)"
          >
            {{ tab }}
            <div class="presence-container">
              <snippyly-presence
                :id="'tab' + index"
                max-users="1"
                :document-params="tabDocumentParams[index]"
              ></snippyly-presence>
            </div>
          </div>
        </div>
        <div class="tabs-content">
          <div v-if="selectedTab">
            <span
              >You are on {{ selectedMenu.name }},
              {{ tabs[selectedTab - 1] }}.</span
            ><br />
            <span class="clear-btn" v-on:click="onSelectTab(undefined)"
              >Clear Selection</span
            >
          </div>
          <div v-if="!selectedTab">
            You are on {{ selectedMenu.name }}.<br />You haven't selected any
            sections.
          </div>
        </div>
      </div>
      <div class="notes-container">
        <div class="notes-block">
          <h3>NOTE:</h3>
          <ul>
            <li>
              Presence: The avatar of other online users shows at document
              level.
            </li>
            <li>
              Cursors: Cursors of others online show at Section level. If no
              section is selected it will show at Document level.
            </li>
            <li>Sections are always under Documents in hierarchy.</li>
          </ul>
        </div>
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
/**
 * @type {import('@snippyly/types').Snippyly}
 */
var Snippyly;
/**
 * @type {import('@snippyly/types').Snippyly}
 */
var client;

const menus = [
  { name: "Document 1", link: "" },
  { name: "Document 2", link: "document-2" },
  { name: "Document 3", link: "document-3" },
];

let selectedMenu = menus[0];

const tabs = ["Child Document 1", "Child Document 2", "Child Document 3"];
const tabDocumentParams = tabs.map((tab, index) => {
  return JSON.stringify({ selectedTab: index + 1 });
});
let selectedTab;

const initSnippyly = async () => {
  console.log("snippyly loaded", window.Snippyly);
  Snippyly = window.Snippyly;
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

const updateDocumentId = (documentId) => {
  if (client) {
    client.setDocumentId(documentId);
  }
};

const updateDocumentParams = () => {
  if (client) {
    if (selectedTab) {
      const params = { selectedTab };
      client.setDocumentParams(params);
    } else {
      client.removeDocumentParams();
    }
  }
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
      menus,
      selectedMenu,
      tabs,
      selectedTab,
      tabDocumentParams,
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
    onSelectTab(value) {
      this.renderActionContainer = false;
      this.selectedTab = value;
      selectedTab = value;
      this.$nextTick(() => {
        this.renderActionContainer = true;
      });
      updateDocumentParams();
    },
    onMenuChange(menu) {
      if (menu.name !== selectedMenu.name) {
        this.renderActionContainer = false;
        this.selectedMenu = menu;
        selectedMenu = menu;
        this.selectedTab = undefined;
        selectedTab = undefined;
        this.$nextTick(() => {
          this.renderActionContainer = true;
        });
        updateDocumentId(`${window.location.href}${menu.link}`);
      }
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

.menu {
  margin: 0 12px;
  cursor: pointer;
}

.menu.selected {
  color: #0084ff;
  font-weight: bold;
}

.tabs-container {
  display: flex;
  padding: 24px;
}

.tabs-block {
  margin-right: 64px;
}

.tab {
  padding: 1rem;
  margin: 1rem;
  background: #f7f7f7;
  min-width: 12rem;
  text-align: center;
  cursor: pointer;
  min-height: 6rem;
  position: relative;
  box-sizing: content-box;
}

.tab.selected {
  background: #0084ff;
  color: white;
  font-weight: bold;
}

.tabs-content {
  flex: 100%;
  text-align: center;
  align-self: center;
}

.clear-btn {
  cursor: pointer;
  color: #0084ff;
  text-decoration: underline;
}

.notes-container {
  position: fixed;
  width: 100%;
  bottom: 0;
}

.notes-block {
  margin: 24px;
  padding: 8px 24px;
  background: #f7f7f7;
  border-radius: 8px;
}

.presence-container {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}

.presence-container .s-presence-avatar {
  width: 1rem !important;
  height: 1rem !important;
  font-size: 0.7rem;
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
