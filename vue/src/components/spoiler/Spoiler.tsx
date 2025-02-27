import { SpoilerEmitters, SpoilerSize } from "@shared/components/spoiler/types";
import cn from 'classnames'
import { definePropType } from "../../utils";
import { computed, defineComponent, ExtractPublicPropTypes, inject, ref } from "vue";
import { Button } from "../button";
import { Icon } from "../icon";
import {
  spoilerContentStyle,
  spoilerContentVariants,
  spoilerHeaderStyle,
  spoilerHeaderVariants,
  spoilerStyle,
  spoilerTitleStyle,
  spoilerTitleVariants,
  spoilerVariants
} from "@shared/components/spoiler";
import { $accordionSymbol, AccordionProvided } from "../accordion/Accordion";

export const spoilerProps = {
  style: {
    type: String,
    default: spoilerStyle
  },
  variants: {
    type: Object,
    default: spoilerVariants
  },
  headerStyle: {
    type: String,
    default: spoilerHeaderStyle
  },
  headerVariants: {
    type: Object,
    default: spoilerHeaderVariants
  },
  titleStyle: {
    type: String,
    default: spoilerTitleStyle
  },
  titleVariants: {
    type: Object,
    default: spoilerTitleVariants
  },
  contentStyle: {
    type: String,
    default: spoilerContentStyle
  },
  contentVariants: {
    type: Object,
    default: spoilerContentVariants
  },
  openedIcon: {
    type: String,
    default: 'ri-arrow-up-s-line'
  },
  closedIcon: {
    type: String,
    default: 'ri-arrow-down-s-line'
  },
  title: {
    type: definePropType<string>(String),
    default: ''
  },
  groupKey: {
    type: definePropType<string | symbol>(String),
    default: ''
  },
  opened: {
    type: definePropType<boolean>(Boolean),
    default: false
  },
  disabled: {
    type: definePropType<boolean>(Boolean),
    default: false
  },
  size: {
    type: definePropType<SpoilerSize>(String),
    default: 'medium'
  }
}

export type SpoilerProps = ExtractPublicPropTypes<typeof spoilerProps>

export const spoilerEmitters: SpoilerEmitters = {
  toggle: (value) => typeof value === 'boolean'
}

export const Spoiler = defineComponent({
  name: 'Spoiler',
  props: spoilerProps,
  emits: spoilerEmitters,
  setup(props, { slots, attrs, emit }) {
    const accordion = inject<AccordionProvided | undefined>($accordionSymbol, undefined)

    const $el = ref()

    const isInGroup = computed(() => Boolean(accordion))

    const isLast = computed(() => isInGroup.value && !$el.value?.nextElementSibling)
    const isMiddle = computed(() => isInGroup.value && Boolean($el.value?.previousElementSibling && $el.value?.nextElementSibling))
    const isFirst = computed(() => isInGroup.value && !$el.value?.previousElementSibling)

    const opened = computed(() => props.opened || accordion?.openedKey.value === props.groupKey)

    const handleToggle = () => {
      if (props.disabled) return
      if (accordion) {
        if (accordion.openedKey.value === props.groupKey) {
          accordion.emit('toggle')
        } else {
          accordion.emit('toggle', props.groupKey)
        }
      }
      emit('toggle', !opened.value)
    }
    return () => (
      <div
        {...attrs}
        ref={$el}
        class={cn({
          [props.style]: props.style,
          [props.variants[props.size]]: props.variants[props.size] && props.size,
          [props.variants.disabled]: props.variants.disabled && props.disabled,
          [props.variants.opened]: props.variants.opened && opened.value,
          [props.variants.last]: props.variants.last && isLast.value,
          [props.variants.middle]: props.variants.middle && isMiddle.value,
          [props.variants.first]: props.variants.first && isFirst.value
        })}
      >
        <div class={cn({
          [props.headerStyle]: props.headerStyle,
          [props.headerVariants[props.size]]: props.headerVariants[props.size] && props.size,
          [props.headerVariants.disabled]: props.headerVariants.disabled && props.disabled,
          [props.headerVariants.opened]: props.headerVariants.opened && opened.value
        })}>
          {slots.title
            ? slots.title({
                toggle: handleToggle
              })
            : <div class={cn({
                [props.titleStyle]: props.titleStyle,
                [props.titleVariants[props.size]]: props.titleVariants[props.size] && props.size,
                [props.titleVariants.disabled]: props.titleVariants.disabled && props.disabled
              })}>
                {props.title}
              </div>
          }
          {slots.expander
            ? slots.expander()
            : <Button
                variant='secondary'
                size={props.size}
                onClick={() => handleToggle()}
              >
                <Icon
                  name={opened.value ? props.openedIcon : props.closedIcon}
                  size={props.size}
                />
              </Button>
          }
        </div>
        <div class={cn({
          [props.contentStyle]: props.contentStyle,
          [props.contentVariants[props.size]]: props.contentVariants[props.size] && props.size,
          [props.contentVariants.disabled]: props.contentVariants.disabled && props.disabled,
          [props.contentVariants.opened]: props.contentVariants.opened && opened.value
        })}>
          {slots.default && slots.default()}
        </div>
      </div>
    )
  }
})