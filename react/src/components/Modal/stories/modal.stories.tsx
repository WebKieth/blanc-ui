import { Meta, StoryObj } from '@storybook/react'
import { Modal } from '../Modal'
import { useState } from 'react'
import { Button } from '../../Button'


const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isCloseByBackdropClick: {
      type: 'boolean'
    },
    title: {
      type: 'string',
    },
    content: {
      type: 'string'
    }
  },
  args: {
    isCloseByBackdropClick: false,
    title: 'Dialog',
    content: 'Modal content'
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render(args) {
    const [isOpened, setIsOpened] = useState(false)
    const handleOpen = () => setIsOpened(true)
    const handleClose = () => setIsOpened(false)
    return (
      <>
        <p>React DOM createPortal function in storybook <a href='https://github.com/storybookjs/storybook/issues/21780' target="_blank">still is not working</a></p>
        <p>But you can render it to document.body using createPortal in your project like this:</p>
        <pre>{`{ isOpened && createPortal(<Modal onClose={() => setIsOpened(false)} />, document.body) }`}</pre>
        <Button onClick={handleOpen}>Open</Button>
        {isOpened && <Modal {...args} onClose={handleClose} />}
      </>
    )
  }
}