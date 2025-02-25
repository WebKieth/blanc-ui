import type { Preview } from "@storybook/react";
//@ts-ignore
import { applyCssReset, applyCssVariables } from '@shared/styles'
import React from "react";
import { IconifyProvider } from '../src/providers/iconify'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (S) => (<IconifyProvider spriteUrl="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.symbol.svg"><S/></IconifyProvider>)
  ]
};

applyCssReset()
applyCssVariables()

export default preview;
