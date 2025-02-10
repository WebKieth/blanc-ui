import { App } from "vue";
import { $eventBus, EventBus } from "./main";

export const EventBusPlugin = {
  install: (app: App) => {
    app.provide($eventBus, new EventBus())
  }
}