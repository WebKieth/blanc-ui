import type { Preview } from "@storybook/react";
//@ts-ignore
import { applyCssReset, applyCssVariables } from '@shared/styles'

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

applyCssReset()
applyCssVariables()

export default preview;
