import { defineComponent } from 'vue'

export const iconComponentProps = {
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  stroke: {
    type: Number,
    required: true,
  },
}

export default defineComponent({
  props: iconComponentProps,
  setup(props) {
    return () => (
      <svg
        id="ri-alert-line"
        fill="currentColor"
        viewBox="0 0 24 24"
        width={props.width}
        height={props.height}
      >
        <g>
          <path fill="none"
            d="M0 0h24v24H0z"
          ></path>
          <path fill-rule="nonzero"
            d="M12.866 3l9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0zm-8.66 16h15.588L12 5.5 4.206 19zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z"
          ></path>
        </g>
      </svg>
    )
  },
})
