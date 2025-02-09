import type { Preview } from "@storybook/vue3";
import { setup } from '@storybook/vue3'
//@ts-ignore
import { applyCssReset, applyCssVariables } from '@shared/styles'
import { Notify, $notify } from '../src/plugins/notify'
import { ViewLayers, $viewLayers } from '../src/plugins/view-layers'
import { EventBus, $eventBus } from '../src/plugins/event-bus'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

setup((app) => {
  applyCssReset()
  applyCssVariables()
  app.provide($notify, new Notify(app))
  app.provide($viewLayers, new ViewLayers(app))
  app.provide($eventBus, new EventBus())
})

export default preview;
