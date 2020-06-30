<template>
  <div class="error-page">
    <h1 class="code">{{ code }}</h1>
    <p class="desc">{{ desc }}</p>
    <div class="router">
      <el-select filterable v-model="url">
        <el-option
          v-for="(item, index) in routes"
          :key="index"
          :value="item.name"
        >
          <span style="float: left">
            {{ item.name }}
          </span>
          <span style="float: right">{{ item.name }}</span>
        </el-option>
      </el-select>
      <el-button size="medium" round @click="navTo">跳转</el-button>
    </div>
    <div class="link">
      <el-link @click="home">
        回到首页
      </el-link>
      <el-link @click="back">返回上一页</el-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import { routes } from "../router";
import { getLanguage } from "../utils/lang";

@Component({})
export default class ErrorPage extends Vue {
  @Prop({
    type: Number
  })
  code!: number;
  @Prop({
    type: String,
    default: ""
  })
  desc!: string;

  url = "";

  get isZh() {
    return getLanguage() === "zh";
  }

  get routes() {
    const _routes: any[] = [];
    routes.map(item => {
      if (item.children && item.children.length > 0) {
        _routes.push(...item.children);
      } else {
        _routes.push(item);
      }
    });
    return _routes;
  }

  navTo() {
    this.$router.push({ name: this.url });
  }

  back() {
    history.back();
  }

  home() {
    this.$router.push("/");
  }
}
</script>
<style lang="scss" scoped>
.error-page {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;

  .code {
    font-size: 120px;
    font-weight: normal;
    color: #6c757d;
    font-family: "Segoe UI";
  }

  .desc {
    font-size: 16px;
    font-weight: 400;
    color: #34395e;
    margin-top: 30px;
  }

  .router {
    margin-top: 50px;
    display: flex;

    .el-select {
      font-size: 14px;
      width: 300px;
    }

    .el-button {
      margin-left: 15px;
      box-shadow: 0 1px 6px var(--colorPrimary);
      background-color: var(--colorPrimary);
      border-color: var(--colorPrimary);
      color: #fff;
      padding: 0 25px;
      letter-spacing: 1px;
    }
  }

  .link {
    margin-top: 40px;

    a {
      color: var(--colorPrimary);
      font-weight: 500;
      cursor: pointer;
      font-size: 14px;
      margin: 0 15px;
    }
  }
}
</style>
