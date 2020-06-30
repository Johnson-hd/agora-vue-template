<template>
  <error-page :code="404" :desc="desc"></error-page>
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
export default class ErrorPage404 extends Vue {
  desc: string = i18n.t("404 Tip") as string;
}
</script>
