import { App } from "vue";
import { $notify, Notify } from "./main";

export const NotifyPlugin = {
  install: (app: App) => {
    app.provide($notify, new Notify(app))
  }
}