import { Component } from "vue-property-decorator";
import GlobalMixins from "./global-mixins";

/**
 * TableMixins
 * table列表的基础类
 * 子类必须实现的属性如下：
 * listApi - 列表请求api
 *
 * 子类可选实现的属性如下：
 * delApi- 删除请求api
 * init() - 初始化方法，一般用来重写请求参数的值
 * getTableListCallback() - 获取tableList之后的回调函数
 */
@Component({})
export default class TableMixins extends GlobalMixins {
  loading = false;
  isAdvanceTools = false;
  tableList: any = [];
  multipleSelection: any[] = [];
  pagination = {
    total: 0,
    page: 1,
    pageSize: 10
  };
  defaultSort: any = {
    prop: "",
    order: "descending"
  };
  keyword = "";
  filter: any = {};
  listApi = "";
  delApi = "";

  created() {
    this.pagination.page = Number(this.$route.query.page) || 1;
    this.pagination.pageSize = Number(this.$route.query.pageSize) || 10;
    this.defaultSort.prop = this.$route.query.sortProp || "";
    this.defaultSort.order = this.$route.query.sortOrder || "descending";
    this.keyword = this.$route.query && (this.$route.query.keyword as string);
  }

  async mounted() {
    this.init();
    await this.getTableList();
  }

  // 初始化方法
  init() {
    console.log("init");
  }

  onSortChange(column: any) {
    this.defaultSort.prop = column.prop;
    this.defaultSort.order = column.order;
    this.changeRoute({
      sortProp: this.defaultSort.prop,
      sortOrder: this.defaultSort.order
    });
    this.getTableList();
  }

  onKeywordsChange(val: string) {
    this.changeRoute({
      keyword: val
    });
  }

  onSelectionChange(val: number | string) {
    (this as any).multipleSelection = val;
  }

  onSizeChange(val: number) {
    this.pagination.page = 1;
    this.pagination.pageSize = val;
    this.changeRoute({
      page: 1,
      pageSize: val
    });
    this.getTableList();
  }

  onCurrentChange(val: number) {
    this.pagination.page = val;
    this.changeRoute({
      page: val
    });
    this.getTableList();
  }

  toAddPage(obj: any, isBlank = false) {
    if (isBlank) {
      const url = obj.id ? `${obj.path}?id=${obj.id}` : `${obj.path}`;
      window.open(url, "_blank");
      return;
    }
    const router: any = {
      name: obj.routerName
    };
    obj.id &&
      (router.query = {
        id: obj.id
      });
    this.$router.push(router);
  }

  async search() {
    this.pagination.page = 1;
    this.changeRoute({
      page: 1
    });
    await this.getTableList();
  }

  async refresh() {
    await this.getTableList();
  }

  async getTableListCallback(data: any[]) {
    console.log("TableList Data", data);
  }

  async getTableList() {
    this.loading = true;
    const res = await (this as any).$service[this.listApi]({
      page: this.pagination.page,
      pageSize: this.pagination.pageSize,
      sortProp: this.defaultSort.prop,
      sortOrder: this.defaultSort.order === "descending" ? "desc" : "asc",
      keyword: this.keyword,
      filter: JSON.stringify(this.filter)
    });
    this.loading = false;
    if (res.$code === 0) {
      this.tableList = (res.$data && res.$data.items) || [];
      this.pagination.total = (res.$data && res.$data.total) || 0;
      await this.getTableListCallback(this.tableList);
    }
  }

  async delItem() {
    if (this.multipleSelection.length === 0) {
      this.$message.warning(this.$t("Delete Tip") as string);
      return;
    } else {
      this.$confirm(
        this.$t("Delete Confirm") as string,
        this.$t("Prompt") as string,
        {
          confirmButtonText: this.$t("Ok") as string,
          cancelButtonText: this.$t("Cancel") as string,
          type: "warning"
        }
      ).then(async () => {
        this.loading = true;
        const ids = this.multipleSelection.map(item => item.id);
        const res = await (this as any).$service[this.delApi](ids);
        this.loading = false;
        if (res.$code === 0) {
          this.$message.success(this.$t("Success") as string);
          await this.getTableList();
        }
      });
    }
  }
}
