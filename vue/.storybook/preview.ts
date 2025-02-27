import type { Preview } from "@storybook/vue3";
import { setup } from '@storybook/vue3'
//@ts-ignore
import { applyCssReset, applyCssVariables } from '@shared/styles'
import { NotifyPlugin } from '../src/plugins/notify'
import { ViewLayersPlugin } from '../src/plugins/view-layers'
import { EventBusPlugin } from '../src/plugins/event-bus'
import { IconifyPlugin } from '../src/plugins/iconify'

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
  app.use(IconifyPlugin)
  app.use(NotifyPlugin)
  app.use(ViewLayersPlugin)
  app.use(EventBusPlugin)
})

export default preview;
