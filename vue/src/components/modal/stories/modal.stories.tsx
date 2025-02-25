import { Meta, StoryObj } from '@storybook/vue3'
import { Modal } from '../Modal'
import { ref, Teleport } from 'vue'
import { Button } from '../../button'

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
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpened = ref(false)
      const handleOpen = () => isOpened.value = true
      const handleClose = () => isOpened.value = false
      return () => (
        <>
          <Button onClick={handleOpen}>Open</Button>
          {isOpened.value && (
            <Teleport to='body'>
              <Modal
                onClose={handleClose}
                {...args}
              />
            </Teleport>
          )}
        </>
      )
    }
  })
}