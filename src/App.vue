<template>
  <div class="app" :class="getLanguage() === 'zh' ? 'app-zh' : 'app-en'">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getLanguage } from "./utils/lang";

@Component({})
export default class App extends Vue {
  getLanguage = getLanguage;
}
</script>

<style lang="scss">
.app-en {
  font-family: Consolas, "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.app-zh {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", 微软雅黑, Arial, sans-serif;
}
</style>
