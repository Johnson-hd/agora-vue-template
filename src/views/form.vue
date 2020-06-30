<template>
  <div class="your-component-name form">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>your breadcrumb one</el-breadcrumb-item>
      <el-breadcrumb-item>your breadcrumb two</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card v-loading="loading">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="getLabel('Test')" prop="test">
          <el-input v-model="form.test"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="onSubmit">{{ $t("Ok") }}</el-button>
      <el-button @click="back">{{ $t("Cancel") }}</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import GlobalMixins from "../mixins/global-mixins";
import i18n from "../i18n";

@Component({})
export default class YourComponenetName extends GlobalMixins {
  loading = false;
  form = {
    test: ""
  };
  rules = {
    test: [{ required: true, message: i18n.t("Required"), trigger: "blur" }]
  };

  onSubmit() {
    (this.$refs.form as any).validate((valid: boolean) => {
      if (valid) {
        // dosomething
      } else {
        return false;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.your-component-name {
}
</style>
