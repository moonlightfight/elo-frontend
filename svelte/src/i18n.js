import { register, init, getLocaleFromNavigator } from "svelte-i18n";

register("en", () => import("./locales/en.json"));
register("fr", () => import("./locales/fr.json"));
register("ja", () => import("./locales/ja.json"));
register("ko", () => import("./locales/ko.json"));
register("zh", () => import("./locales/zh.json"));
register("it", () => import("./locales/it.json"));
register("pt", () => import("./locales/pt.json"));
register("es", () => import("./locales/es.json"));

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
