import Cookie from "js-cookie";

export const getLanguage = () => {
  let locale = Cookie.get("locale");
  if (!locale) {
    locale = navigator.language === "zh-CN" ? "zh" : "en";
  }
  return locale;
};
