<template>
  <div class="stream-view-container" id="streamViewContainer">
    <div class="stream-view-docs">
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora omnis
        eius iusto voluptatibus mollitia in. Quae, totam porro? Sint optio,
        dolore voluptates inventore similique voluptate facere molestiae porro
        ipsam fugit aperiam. Consectetur saepe ipsam quia nisi aut nemo nostrum,
        quisquam voluptatibus maxime, fuga optio voluptates hic pariatur beatae
        ut iste corporis ipsum sed ullam esse. Autem reiciendis voluptate dolore
        laboriosam commodi? Nemo perspiciatis aliquid expedita nostrum, quasi
        praesentium hic inventore adipisci fugiat ut cum cumque. Amet, illo!
        Cupiditate nobis sunt facilis voluptatibus sed ipsum dolorum placeat
        alias! Natus totam aliquid quos quam eligendi cum, maiores quidem? A,
        minima? Fugit, quasi.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
        repellat mollitia quaerat optio delectus impedit voluptates sit
        provident omnis facilis veniam quisquam suscipit repudiandae nobis,
        expedita similique eveniet corporis. Illo quam officia recusandae minus
        delectus ut. Sapiente, similique atque voluptate quis voluptas hic
        possimus labore perspiciatis, excepturi quidem harum!
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
        veritatis aliquid expedita non earum, eum maiores quod necessitatibus
        quos id libero architecto placeat deserunt natus ipsum eligendi quo hic
        numquam excepturi sed asperiores, nulla animi! Natus ipsam expedita
        veritatis eveniet, ipsa fugit voluptatem nihil necessitatibus id facere
        accusamus accusantium temporibus quam nisi voluptates dolore animi
        totam. Culpa inventore tempora quas blanditiis placeat voluptatum ipsam
        libero, recusandae officiis fugiat suscipit.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque
        obcaecati quam, ratione rem ipsum exercitationem sapiente reprehenderit
        tempore nam molestiae necessitatibus dolor iusto recusandae nostrum
        quidem laboriosam. Consequuntur possimus vel inventore quasi facere,
        officiis laudantium sed illo! Illo recusandae unde rerum earum a.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
        repellat mollitia quaerat optio delectus impedit voluptates sit
        provident omnis facilis veniam quisquam suscipit repudiandae nobis,
        expedita similique eveniet corporis. Illo quam officia recusandae minus
        delectus ut. Sapiente, similique atque voluptate quis voluptas hic
        possimus labore perspiciatis, excepturi quidem harum!
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
        veritatis aliquid expedita non earum, eum maiores quod necessitatibus
        quos id libero architecto placeat deserunt natus ipsum eligendi quo hic
        numquam excepturi sed asperiores, nulla animi! Natus ipsam expedita
        veritatis eveniet, ipsa fugit voluptatem nihil necessitatibus id facere
        accusamus accusantium temporibus quam nisi voluptates dolore animi
        totam. Culpa inventore tempora quas blanditiis placeat voluptatum ipsam
        libero, recusandae officiis fugiat suscipit.
      </p>
    </div>
    <div class="stream-view-comments-container">
      <snippyly-comments
        stream-view-container-id="streamViewContainer"
      ></snippyly-comments>
    </div>
  </div>
</template>

<script>
import { SnippylyClient } from "../snippylyClient";

// /**
//  * @type {import('@snippyly/types').Snippyly}
//  */
var client;

const enableStreamView = () => {
  if (client) {
    const commentElement = client.getCommentElement();
    commentElement.enableStreamMode(true);
    commentElement.allowedElementIds(["streamViewContainer"]);
  }
};

export default {
  name: "StreamView",
  mounted() {
    SnippylyClient.getClient().subscribe((snippylyClient) => {
      if (snippylyClient) {
        client = snippylyClient;
        enableStreamView();
      }
    });
  },
};
</script>

<style>
.stream-view-container {
  height: calc(100vh - 98px);
  overflow: auto;
  position: relative;
  border-top: 1px solid lightgrey;
}

.stream-view-docs {
  max-width: 600px;
  padding: 24px;
  box-shadow: 0px 0px 8px -3px #8d8d8d;
  border-radius: 8px;
  margin: 12px 0;
  margin-left: 10rem;
  display: inline-block;
}

.stream-view-comments-container {
  margin-left: 24px;
  display: inline-block;
}

.stream-view-comments-container .snippyly-comments-on-right-container {
  right: unset !important;
}
</style>
