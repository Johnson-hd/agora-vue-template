import { Component, Vue } from "vue-property-decorator";
import { omitBy } from "lodash";

@Component({})
export default class TableMixins extends Vue {
  getLabel(type: string) {
    return (this as any).$t(type);
  }

  changeRoute(obj: any) {
    this.$router.replace({
      name: this.$route.name as string,
      query: omitBy(
        Object.assign({}, this.$route.query, obj),
        (v: string) => v === ""
      )
    });
  }

  back() {
    this.$router.back();
  }
}
