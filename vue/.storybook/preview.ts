import type { Preview } from "@storybook/vue3";
import { setup } from '@storybook/vue3'
import { globals, reset } from '../src/styles/variables.css'
import { Notify, $notify } from '../src/plugins/notify'
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
  globals
  reset
  app.provide($notify, new Notify(app))
  app.provide($eventBus, new EventBus())
})

export default preview;
