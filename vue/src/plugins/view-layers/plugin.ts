import { App } from "vue";
import { $viewLayers, ViewLayers } from "./main";

export const ViewLayersPlugin = {
  install(app: App) {
    app.provide($viewLayers, new ViewLayers(app))
  }
}