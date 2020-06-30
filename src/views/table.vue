<template>
  <div class="table">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>your breadcrumb one</el-breadcrumb-item>
      <el-breadcrumb-item>your breadcrumb two</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="table-tools">
        <section class="basic-tools">
          <section class="btn-group">
            <el-button size="mini" type="success" @click="refresh">
              {{ $t("Refresh") }}
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="toAddPage({ routerName: '' })"
            >
              {{ $t("Add") }}
            </el-button>
            <el-button size="mini" type="danger" @click="delItem">
              {{ $t("Delete") }}
            </el-button>
          </section>
          <section class="search-group">
            <el-input
              size="mini"
              :placeholder="$t('Keyword Tip')"
              v-model="keyword"
              class="search"
              @change="onKeywordsChange"
              @keyup.enter.native="search"
            ></el-input>
            <el-button size="mini" type="primary" @click="search">
              {{ $t("Search") }}
            </el-button>
            <el-button
              size="mini"
              icon="el-icon-search"
              @click="isAdvanceTools = !isAdvanceTools"
            >
              {{ $t("Advanced Search") }}
            </el-button>
          </section>
        </section>
        <section class="advance-tools" v-show="isAdvanceTools">
          <el-form :inline="true" :model="filter"></el-form>
        </section>
      </el-row>
      <el-table
        :data="tableList"
        :default-sort="defaultSort"
        v-loading="loading"
        @selection-change="onSelectionChange"
        @sort-change="onSortChange"
        border
        stripe
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column
          :label="getLabel('Create Time')"
          prop="creatdeAt"
          sortable
        >
          <template slot-scope="scope">
            {{ moment(scope.row.creatdeAt).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :current-page="pagination.page"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import TableMixins from "../mixins/table-mixins";

@Component({})
export default class Table extends TableMixins {
  listApi = "";
  delApi = "";

  async getTableList() {
    this.tableList = [
      {
        id: 1,
        creatdeAt: "2020-06-06"
      }
    ];
  }
}
</script>

<style lang="scss" scoped>
.table {
}
</style>
