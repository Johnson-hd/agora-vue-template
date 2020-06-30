import Vue from "vue";
import VueI18n from "vue-i18n";
import Element from "element-ui";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import enLocale from "element-ui/lib/locale/lang/en";

import { GlobalI18N } from "./global";
import { getLanguage } from "../utils/lang";

interface CustomeDict {
  [propName: string]: string
}

interface I18n {
  en: string
  zh: string
}

interface SummaryI18n {
  [propName: string]: I18n
}

Vue.use(VueI18n);

let enCustomDict: CustomeDict = {};
let zhCustomDict: CustomeDict = {};

const createCustomDict = () => {
  const summaryI18n: SummaryI18n = {
    ...GlobalI18N,
  };
  const keys = Object.keys(summaryI18n);

  keys.forEach(key => {
    const data = summaryI18n[key] || {};
    enCustomDict[key] = data["en"] || key;
    zhCustomDict[key] = data["zh"] || key;
  });
};

createCustomDict();

const currentLocale = getLanguage();
const i18n = new VueI18n({
  locale: currentLocale,
  messages: {
    en: {
      ...enLocale,
      ...enCustomDict
    },
    zh: {
      ...zhLocale,
      ...zhCustomDict
    }
  }
});

Vue.use(Element, {
  i18n: (key: string, value: any) => i18n.t(key, value)
});

export default i18n;
