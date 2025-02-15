import { Meta, StoryObj } from '@storybook/vue3'
import { RadioGroup } from '../RadioGroup'
import { Radio } from '../../radio'
import { ref } from 'vue'
import { radioWrapper } from './styles.css'


const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => ({
    components: {
      RadioGroup,
      Radio
    },
    setup() {
      const keys = ['One', 'Two', 'Three']
      const selected = ref('One')
      const handleChange = (newValue: string) => selected.value = newValue
      return () => (
        <div class={radioWrapper}>
          <RadioGroup
            value={selected.value}
            onChange={(value) => handleChange(value as string)}
          >
            {keys.map((key) => (
              <Radio
                key={key}
                groupKey={key}
                label={key}
              />
            ))}
          </RadioGroup>
        </div>
      )
    }
  })
}