<template>
  <div>
    <snippyly-cursor></snippyly-cursor>
    <snippyly-comments></snippyly-comments>
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
    <div class="text-comments-container">
      <h1>Google Docs Style Comments</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint commodi
        architecto aliquid explicabo exercitationem nemo reprehenderit, rerum
        autem nostrum aperiam corrupti ab, cumque tenetur incidunt dolor vel,
        atque qui! Veritatis itaque omnis est in architecto eligendi temporibus
        ipsa consectetur. Pariatur dolor beatae maxime suscipit repellat
        consectetur nulla placeat, iusto ipsa labore. Eaque, ab quod! Illum
        quibusdam ipsa possimus, aliquam dolore laborum dicta iusto temporibus
        iste dolores officia minima ad porro ducimus facere esse, tenetur
        exercitationem quae vitae? Soluta dicta sed ullam debitis accusamus
        necessitatibus sequi perspiciatis. Exercitationem at voluptatum magni,
        nisi repellat unde a delectus! Neque quod quae necessitatibus nisi.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint commodi
        architecto aliquid explicabo exercitationem nemo reprehenderit, rerum
        autem nostrum aperiam corrupti ab, cumque tenetur incidunt dolor vel,
        atque qui! Veritatis itaque omnis est in architecto eligendi temporibus
        ipsa consectetur. Pariatur dolor beatae maxime suscipit repellat
        consectetur nulla placeat, iusto ipsa labore. Eaque, ab quod! Illum
        quibusdam ipsa possimus, aliquam dolore laborum dicta iusto temporibus
        iste dolores officia minima ad porro ducimus facere esse, tenetur
        exercitationem quae vitae? Soluta dicta sed ullam debitis accusamus
        necessitatibus sequi perspiciatis. Exercitationem at voluptatum magni,
        nisi repellat unde a delectus! Neque quod quae necessitatibus nisi.
      </p>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
        reiciendis optio fuga?
      </h3>
      <ul>
        <li>Lorem ipsum dolor sit amet.</li>
        <li>
          Consequat exercitation consequat et laborum do consequat nostrud
          adipisicing sunt laboris id eiusmod pariatur.
        </li>
        <li>Non non aliquip proident amet.</li>
        <li>
          Et labore sit amet ad do labore cupidatat tempor ad cillum excepteur
          anim.
        </li>
        <li>
          Consequat duis excepteur aute sit ipsum qui id dolore est cupidatat.
        </li>
        <li>
          Incididunt ea veniam minim aute sunt exercitation ad amet non anim ut.
        </li>
      </ul>
      <p>
        Exercitation minim ad
        <strong
          >mollit esse cupidatat cillum tempor esse deserunt mollit aliquip.
          Occaecat consectetur proident do deserunt nostrud pariatur
          quis</strong
        >
        minim eiusmod eu cillum.
        <i
          >Excepteur sunt deserunt et duis exercitation
          <b>nostrud commodo dolor ipsum irure ea.</b> Sit non dolor nisi
          occaecat consectetur labore excepteur consectetur. Reprehenderit</i
        >
        labore ad deserunt nulla dolor veniam cupidatat nostrud consectetur.
        Cillum ea minim consequat cillum aliquip
        <u
          >ad ea elit mollit eu culpa et eu. Amet Lorem deserunt voluptate
          aliqua</u
        >
        esse tempor culpa mollit exercitation veniam exercitation. Consectetur
        cupidatat <b>quis minim aliqua. Irure esse id fugiat</b> occaecat nulla
        ipsum excepteur ea sit aliquip dolore et culpa. Id in officia dolore
        aliqua ullamco anim
        <s
          >adipisicing deserunt reprehenderit et.
          <b
            >Mollit ea consequat exercitation
            <u>deserunt cupidatat nulla irure</u> Lorem quis deserunt.</b
          >
          Anim id veniam id aliquip occae</s
        >cat cupidatat duis labore aliquip in sint. Consectetur ea sit velit eu
        culpa est eiusmod nisi do aliquip mollit officia tempor aliqua. Ea
        cupidatat <sub>consequat laboris ipsum</sub> consequat est nostrud sint.
        Minim officia occaecat <sup>sint culpa</sup> consequat. Esse amet
        eiusmod exercitation irure ullamco enim et sunt ex aliquip non.
      </p>
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

const initSnippyly = async () => {
  console.log("snippyly loaded", window.Snippyly);
  Snippyly = window.Snippyly;
  client = await Snippyly.init("hny91vx3KUxEIp61jBd1", {
    featureAllowList: [], // To allow specific features only
    // userIdAllowList: ['abcd'], // To allow specific users only
    urlAllowList: [], // To allow snippyly in specific screens only
  });
  console.log("init Snippyly", client);

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
</style>
