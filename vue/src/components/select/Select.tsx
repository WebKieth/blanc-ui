import { computed, defineComponent, useTemplateRef, watch } from "vue";
import cn from 'classnames'
import { definePropType } from "../../utils";
import { Option, OptionId, SelectEmitters, SelectSize } from "./types";
import { Dropdown } from "../dropdown";
import { selectBodyStyle, selectDropdownStyle, selectOptionStyle, selectOptionVariants, selectPlaceholderStyle, selectPlaceholderVariants, selectStyle, selectValueStyle, selectValueVariants, selectVariants } from "./styles.css";
import { Icon } from "../icon";
import { DropdownAgentScope } from "../dropdown/types";
import { Checkbox } from "../checkbox";

export const selectProps = {
  style: {
    type: String,
    default: selectStyle
  },
  variants: {
    type: Object,
    default: selectVariants
  },
  bodyStyle: {
    type: String,
    default: selectBodyStyle
  },
  valueStyle: {
    type: String,
    default: selectValueStyle
  },
  valueVariants: {
    type: Object,
    default: selectValueVariants
  },
  placeholderStyle: {
    type: String,
    default: selectPlaceholderStyle
  },
  placeholderVariants: {
    type: Object,
    default: selectPlaceholderVariants
  },
  gutter: {
    type: Number,
    default: 2
  },
  dropdownStyle: {
    type: String,
    default: selectDropdownStyle
  },
  optionStyle: {
    type: String,
    default: selectOptionStyle
  },
  optionVariants: {
    type: Object,
    default: selectOptionVariants
  },
  placeholder: {
    type: definePropType<string>(String),
    default: 'Выберите'
  },
  options: {
    type: definePropType<Option[]>(Array),
    default: []
  },
  value: {
    type: definePropType<OptionId | OptionId[] | undefined>(String || Array),
    default: undefined
  },
  size: {
    type: definePropType<SelectSize>(String),
    default: 'medium'
  }
}

export const selectEmitters: SelectEmitters = {
  search: (value) => typeof value === 'string',
  change: (value) => typeof value === 'object' || typeof value === 'string' || typeof value === 'undefined'
}

export const Select = defineComponent({
  name: 'Select',
  props: selectProps,
  emits: selectEmitters,
  setup(props, { emit, slots }) {
    const $agent = useTemplateRef<HTMLDivElement>('agent')

    const agentWidth = computed(() => (
      $agent.value?.clientWidth
    ))

    watch(agentWidth, () => {
      console.log(agentWidth.value)
      console.dir($agent.value)
    })

    const isSelected = (option: Option) => {
      const id = typeof option === 'object'
        ? option.id
        : option
      return Array.isArray(props.value)
        ? props.value.includes(id)
        : props.value === id
    }

    const selected = computed(() => {
      if (Array.isArray(props.value)) {
        const values: string[] = []
        props.value.forEach((id) => {
          const item = props.options.find((option) => (
            typeof option === 'object'
              ? option.id === id
              : option === id
          ))
          if (!item) return
          const value = typeof item === 'object'
            ? item.value
            : item
          values.push(value)
        })
        return values.join(', ')
      } else {
        const option = props.options.find((option) => (
          typeof option === 'object'
            ? option.id === props.value
            : option === props.value
        ))
        if (!option) return ''
        return typeof option === 'object'
          ? option.value
          : option
      }
    })

    const handleAgentClick = (
      e: MouseEvent,
      scope: DropdownAgentScope
    ) => {
      if (scope.opened.value === true) {
        e.stopPropagation()
      }
      scope.close()
    }

    const handleSelectOption = (
      option: Option,
      scope: DropdownAgentScope
    ) => {
      if (Array.isArray(props.value)) {
        const id = typeof option === 'object'
          ? option.id
          : option
        const updatedValue = [...props.value]
        if (updatedValue.includes(id)) {
          updatedValue.splice(updatedValue.findIndex((item) => item === id), 1)
        } else {
          updatedValue.push(id)
        }
        emit('change', updatedValue)
      } else {
        emit(
          'change',
          typeof option === 'object'
            ? option.id
            : option
        )
        scope.close()
      }
    }
    return () => (
      <Dropdown
        gutter={props.gutter}
        bodyStyle={props.dropdownStyle}
        bodyStyleRules={{width: agentWidth.value ? `${agentWidth.value}px` : 'auto'}}
      >
        {{
          agent: (scope: DropdownAgentScope) => (
            <div
              ref={'agent'}
              class={cn({
                [props.style]: props.style,
                [props.variants[props.size]]: props.variants[props.size] && props.size
              })}
              onClick={(e: MouseEvent) => handleAgentClick(e, scope)}
            >
              <div class={cn({
                [props.bodyStyle]: props.bodyStyle
              })}>
                <div
                  ref='nodeForValue'
                  class={cn({
                    [props.valueStyle]: props.valueStyle
                  })}
                >
                  {selected.value}
                </div>
                <div class={cn({
                  [props.placeholderStyle]: props.placeholderStyle,
                  [props.placeholderVariants[props.size]]: props.placeholderVariants[props.size] && props.size,
                  [props.placeholderVariants.opened]: props.placeholderVariants.opened && scope.opened.value,
                  [props.placeholderVariants.filled]: props.placeholderVariants.filled && (Array.isArray(props.value) ? props.value.length : props.value)
                })}>
                  {slots.placeholder
                    ? slots.placeholder()
                    : props.placeholder
                  }
                </div>
              </div>
              <Icon
                name={scope.opened.value
                  ? 'ri-arrow-up-s-line'
                  : 'ri-arrow-down-s-line'
                }
              />
            </div>
          ),
          default: (scope: DropdownAgentScope) => (
            props.options.map((option) => (
              <div
                key={typeof option === 'string' ? option : option.id}
                class={cn({
                  [props.optionStyle]: props.optionStyle,
                  [props.optionVariants[props.size]]: props.optionVariants[props.size] && props.size,
                  [props.optionVariants.selected]: props.optionVariants.selected && isSelected(option)
                })}
                onClick={() => handleSelectOption(option, scope)}
              >
                {Array.isArray(props.value)
                  ? <Checkbox
                      label={typeof option === 'string'
                        ? option
                        : option.value
                      }
                      value={isSelected(option)}
                    />
                  : typeof option === 'string'
                    ? option
                    : option.value
                }
              </div>
            ))
          )
        }}
      </Dropdown>
    )
  }
})