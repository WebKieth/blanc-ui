import { App } from "vue";
import { $iconify, installIcons } from "./main";
import { IconifyOptions } from "./types";

export const IconifyPlugin = {
  install: (app: App, options: IconifyOptions) => {
    app.provide($iconify, installIcons(app, options))
  }
}