<template>
  <error-page :code="500" :desc="desc"></error-page>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ErrorPage from "../../components/error-page.vue";
import i18n from "../../i18n";

@Component({
  components: {
    ErrorPage: ErrorPage
  }
})
export default class ErrorPage500 extends Vue {
  desc: string = i18n.t("500 Tip") as string;
}
</script>
