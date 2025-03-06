import { computed, defineComponent, onMounted, ref, SlotsType, useTemplateRef, VNodeChild, watch } from "vue";
import cn from 'classnames'
import { definePropType } from "../../utils";
import { Option, OptionId, SelectEmitters, SelectOptionScope, SelectOptionsScope, SelectSize } from "./types";
import { Dropdown } from "../dropdown";
import { selectFieldBodyStyle, selectDropdownStyle, selectOptionStyle, selectOptionVariants, selectPlaceholderStyle, selectPlaceholderVariants, selectFieldStyle, selectFieldValueStyle, selectFieldValueVariants, selectFieldVariants, selectLabelStyle, selectLabelVariants, selectStyle, selectVariants } from "./styles.css";
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
  labelStyle: {
    type: String,
    default: selectLabelStyle
  },
  labelVariants: {
    type: Object,
    default: selectLabelVariants
  },
  fieldStyle: {
    type: String,
    default: selectFieldStyle
  },
  fieldVariants: {
    type: Object,
    default: selectFieldVariants
  },
  fieldBodyStyle: {
    type: String,
    default: selectFieldBodyStyle
  },
  fieldValueStyle: {
    type: String,
    default: selectFieldValueStyle
  },
  fieldValueVariants: {
    type: Object,
    default: selectFieldValueVariants
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
  label: {
    type: String,
    default: ''
  },
  searchString: {
    type: definePropType<string | null>(String),
    default: null
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
    type: definePropType<OptionId | OptionId[] | undefined>(Array),
    default: undefined
  },
  size: {
    type: definePropType<SelectSize>(String),
    default: 'medium'
  },
  disabled: {
    type: definePropType<boolean>(Boolean),
    default: false
  }
}

export const selectEmitters: SelectEmitters = {
  search: (value) => typeof value === 'string',
  change: (value) => typeof value === 'object' || typeof value === 'string' || typeof value === 'undefined'
}

export const selectSlots: SlotsType<{
  placeholder: () => VNodeChild | undefined
  options: (props: SelectOptionsScope) => VNodeChild | undefined
  option: (props: SelectOptionScope) => VNodeChild | undefined
}> = {}

export const Select = defineComponent({
  name: 'Select',
  props: selectProps,
  emits: selectEmitters,
  slots: selectSlots,
  setup(props, { emit, slots }) {
    const $agent = useTemplateRef<HTMLDivElement>('agent')

    const agentWidth = ref<number>(0)
    watch(() => props.size, () => {
      setTimeout(() => {
        agentWidth.value = $agent.value?.clientWidth || 0
        console.log(props.size, agentWidth.value)
      })
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
            ? item.caption
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
          ? option.caption
          : option
      }
    })

    const handleAgentClick = (
      e: MouseEvent,
      scope: DropdownAgentScope
    ) => {
      if (scope.opened.value === true || props.disabled) {
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
    onMounted(() => {
      agentWidth.value = $agent.value?.clientWidth || 0
    })
    return () => (
      <Dropdown
        gutter={props.gutter}
        bodyStyle={props.dropdownStyle}
        bodyStyleRules={{width: agentWidth.value ? `${agentWidth.value}px` : 'auto'}}
      >
        {{
          agent: (scope: DropdownAgentScope) => (
            <div
              class={cn({
                [props.style]: props.style,
                [props.variants[props.size]]: props.variants[props.size] && props.size,
                [props.variants.opened]: props.variants.opened && scope.opened.value,
                [props.variants.filled]: props.variants.filled && (Array.isArray(props.value) ? props.value.length : props.value),
                [props.variants.disabled]: props.variants.disabled && props.disabled
              })}
              onClick={(e: MouseEvent) => handleAgentClick(e, scope)}
            >
              {props.label && (
                <label class={
                  cn({
                    [props.labelStyle]: props.labelStyle,
                    [props.labelVariants[props.size]]: props.labelVariants[props.size] && props.size,
                    [props.labelVariants.filled]: props.labelVariants.filled && (Array.isArray(props.value) ? props.value.length : props.value),
                    [props.labelVariants.opened]: props.labelVariants.opened && scope.opened.value,
                    [props.labelVariants.disabled]: props.labelVariants.disabled && props.disabled
                  })
                }>
                  {props.label}
                </label>
              )}
              <div
                ref={'agent'}
                class={cn({
                  [props.fieldStyle]: props.fieldStyle,
                  [props.fieldVariants[props.size]]: props.fieldVariants[props.size] && props.size,
                  [props.fieldVariants.filled]: props.fieldVariants.filled && (Array.isArray(props.value) ? props.value.length : props.value),
                  [props.fieldVariants.opened]: props.fieldVariants.opened && scope.opened.value,
                  [props.fieldVariants.disabled]: props.fieldVariants.disabled && props.disabled
                })}
              >
                <div class={cn({
                  [props.fieldBodyStyle]: props.fieldBodyStyle
                })}>
                  <div
                    ref='nodeForValue'
                    class={cn({
                      [props.fieldValueStyle]: props.fieldValueStyle,
                      [props.fieldValueVariants[props.size]]: props.fieldValueVariants[props.size] && props.size,
                      [props.fieldValueVariants.opened]: props.fieldValueVariants.opened && scope.opened.value,
                      [props.fieldValueVariants.disabled]: props.fieldValueVariants.disabled && props.disabled
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
                  size={props.size}
                  name={scope.opened.value
                    ? 'ri-arrow-up-s-line'
                    : 'ri-arrow-down-s-line'
                  }
                />
              </div>
            </div>
          ),
          default: (scope: DropdownAgentScope) => (
            slots.options
              ? slots.options({
                  options: props.options,
                  isSelected,
                  handleSelect: (option) => handleSelectOption(option, scope)
                })
              : props.options.map((option) => (
                  <div
                    key={typeof option === 'string' ? option : option.id}
                    class={cn({
                      [props.optionStyle]: props.optionStyle,
                      [props.optionVariants[props.size]]: props.optionVariants[props.size] && props.size,
                      [props.optionVariants.selected]: props.optionVariants.selected && isSelected(option)
                    })}
                    onClick={() => handleSelectOption(option, scope)}
                  >
                    {slots.option
                      ? slots.option({
                          option,
                          selected: isSelected(option),
                          handleSelect: (option) => handleSelectOption(option, scope)
                        })
                      : Array.isArray(props.value)
                        ? <Checkbox
                            size={props.size}
                            label={typeof option === 'string'
                              ? option
                              : option.caption
                            }
                            value={isSelected(option)}
                          />
                        : typeof option === 'string'
                          ? option
                          : option.caption
                    }
                  </div>
                ))
          )
        }}
      </Dropdown>
    )
  }
})