<template>
  <div
    class="alert text-white font-weight-bold"
    role="alert"
    :class="getClasses(color, dismissible)"
  >
    <span class="alert-icon">
      <i :class="getIcon(icon)" />
    </span>
    <span class="alert-text">
      &nbsp;
      <slot />
    </span>
    <button
      v-if="dismissible"
      type="button"
      class="btn-close d-flex justify-content-center align-items-center"
      data-bs-dismiss="alert"
      aria-label="Close"
    >
      <span aria-hidden="true" class="text-lg font-weight-bold">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "VsudAlert",
  props: {
    size: {
      type: String,
      default: "default",
    },
    success: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    iconDir: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Type here...",
    },
    type: {
      type: String,
      default: "text",
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getClasses: (color, dismissible) => {
      let colorValue, dismissibleValue;

      colorValue = color ? `alert-${color}` : null;

      dismissibleValue = dismissible ? "alert-dismissible fade show" : null;

      return `${colorValue} ${dismissibleValue}`;
    },
    getIcon: (icon) => (icon ? icon : null),
  },
};
</script>
