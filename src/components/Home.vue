<template>
  <div>
    <velt-comments></velt-comments>
    <div class='toolbar-2'>
      <div class="recorder-buttons">
        <div>Recorders:</div>
        <velt-recorder-tool type="all"></velt-recorder-tool>
        <velt-recorder-tool type="audio"></velt-recorder-tool>
        <velt-recorder-tool type="video"></velt-recorder-tool>
        <velt-recorder-tool type="screen"></velt-recorder-tool>
      </div>
      <div class="huddle-buttons">
        <div>Huddle:</div>
        <velt-huddle-tool type="all"></velt-huddle-tool>
        <velt-huddle-tool></velt-huddle-tool>
        <velt-huddle-tool type="video"></velt-huddle-tool>
        <velt-huddle-tool type="presentation"></velt-huddle-tool>
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
        <strong>mollit esse cupidatat cillum tempor esse deserunt mollit aliquip.
          Occaecat consectetur proident do deserunt nostrud pariatur
          quis</strong>
        minim eiusmod eu cillum.
        <i>Excepteur sunt deserunt et duis exercitation
          <b>nostrud commodo dolor ipsum irure ea.</b> Sit non dolor nisi
          occaecat consectetur labore excepteur consectetur. Reprehenderit</i>
        labore ad deserunt nulla dolor veniam cupidatat nostrud consectetur.
        Cillum ea minim consequat cillum aliquip
        <u>ad ea elit mollit eu culpa et eu. Amet Lorem deserunt voluptate
          aliqua</u>
        esse tempor culpa mollit exercitation veniam exercitation. Consectetur
        cupidatat <b>quis minim aliqua. Irure esse id fugiat</b> occaecat nulla
        ipsum excepteur ea sit aliquip dolore et culpa. Id in officia dolore
        aliqua ullamco anim
        <s>adipisicing deserunt reprehenderit et.
          <b>Mollit ea consequat exercitation
            <u>deserunt cupidatat nulla irure</u> Lorem quis deserunt.</b>
          Anim id veniam id aliquip occae</s>cat cupidatat duis labore aliquip in sint. Consectetur ea sit velit eu
        culpa est eiusmod nisi do aliquip mollit officia tempor aliqua. Ea
        cupidatat <sub>consequat laboris ipsum</sub> consequat est nostrud sint.
        Minim officia occaecat <sup>sint culpa</sup> consequat. Esse amet
        eiusmod exercitation irure ullamco enim et sunt ex aliquip non.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => {
    return {
      boxes: Array.from({ length: 25 }, (_, i) => i + 1),
    };
  },
};
</script>

<style>
.toolbar-2 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  gap: 24px;
}

.recorder-buttons,
.huddle-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
