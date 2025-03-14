import { Meta, StoryObj } from '@storybook/vue3'
import { $viewLayers, ViewLayers } from '../main'
import { Button } from '../../../components/button'
import { Modal, modalProps } from '../../../components/modal'
import { defineComponent, inject, onMounted } from 'vue'
import { Icon } from '../../../components/icon'
import { closeIconStyle, dialogBoxStyle, modalBodyStyle, modalHeaderStyle, warningBoxStyle } from './styles.css'

const meta: Meta<typeof ViewLayers> = {
  title: 'Plugins/ViewLayers',
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ViewLayers>

const DialogModal = defineComponent({
  name: 'Dialog',
  props: {
    ...modalProps
  },
  setup(props) {
    const viewLayers: ViewLayers | undefined = inject($viewLayers)
    onMounted(() => {
      setTimeout(() => viewLayers?.close('Warning'), 3000)
    })
    return () => (
      <Modal {...props}>
        {{
          default: ({ onClose = () => {} }) => (
            <div class={dialogBoxStyle}>
              <div class={modalHeaderStyle}>
                <div>{props.title}</div>
                <div class={closeIconStyle} onClick={() => onClose()}>
                  <Icon name='ri-close-line' />
                </div>
              </div>
              <div class={modalBodyStyle}>
                {props.content}
              </div>
            </div>
          )
        }}
      </Modal>
    )
  }
})

const WarningModal = defineComponent({
  name: 'Warning',
  props: {
    ...modalProps
  },
  setup(props) {
    const viewLayers: ViewLayers | undefined = inject($viewLayers)
    const open = () => {
      viewLayers?.open(DialogModal, {
        title: 'Диалог тайтл',
        content: 'Хелоу мазафака. Варнинг диалог вилл клоуз сри секондс лейтер'
      })
    }
    return () => (
      <Modal {...props}>
        {{
          default: ({ onClose = () => {} }) => (
            <div class={warningBoxStyle}>
              <div class={modalHeaderStyle}>
                <div>{props.title}</div>
                <div class={closeIconStyle} onClick={() => onClose()}>
                  <Icon name='ri-close-line' />
                </div>
              </div>
              <div class={modalBodyStyle}>
                {props.content}
                <Button onClick={open}>open</Button>
              </div>
            </div>
          )
        }}
      </Modal>
    )
  }
})

export const Default: Story = {
  render: () => ({
    components: {
      Button
    },
    setup() {
      const viewLayers: ViewLayers | undefined = inject($viewLayers)
      const open = () => {
        viewLayers?.open(WarningModal, {
          title: 'Варнинг',
          content: 'А ю шур ту опен диалог?'
        })
      }
      return () => (
        <>
          <Button onClick={open}>
            опен
          </Button>
        </>
      )
    }
  })
}