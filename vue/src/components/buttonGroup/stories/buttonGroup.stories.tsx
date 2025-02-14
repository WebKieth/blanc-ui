import { Meta, StoryObj } from "@storybook/vue3";
import { ButtonGroup } from "../ButtonGroup";
import { Button } from "../../button";
import { ref } from "vue";

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: {
        type: 'text'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => ({
    components: { ButtonGroup, Button },
    setup() {
      return () => (
        <ButtonGroup>
          <Button>one</Button>
          <Button>two</Button>
          <Button>three</Button>
        </ButtonGroup>
      )
    }
  })
}

export const RadioChoosen: Story = {
  render: () => ({
    components: { ButtonGroup, Button },
    setup() {
      const selectedKey = ref('one')
      return () => (
        <ButtonGroup
          value={selectedKey.value}
          onChange={(newKey) => selectedKey.value = newKey as string}
        >
          <Button groupKey={'one'}>one</Button>
          <Button groupKey={'two'}>two</Button>
          <Button groupKey={'three'}>three</Button>
        </ButtonGroup>
      )
    }
  })
}