<template>
  <div>
    <BaseInput
      v-model="model"
      :label="label"
      type="password"
      :placeholder="placeholder"
      :error="isInvalid"
    />

    <!-- Rules -->
    <div v-if="showRules" class="text-sm mt-3">
      <ul class="space-y-1 list-disc pl-5">

        <li :class="hasMinLength ? okClass : errorClass">
          {{ $t('auth.password_rules.min_length') }}
        </li>

        <li :class="hasLetters ? okClass : errorClass">
          {{ $t('auth.password_rules.letters') }}
        </li>

        <li :class="hasNumber ? okClass : errorClass">
          {{ $t('auth.password_rules.number') }}
        </li>

      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '••••••••'
  }
})

/* =========================
   EMITS
========================= */

const emit = defineEmits([
  'update:modelValue',
  'validity'
])

/* =========================
   MODEL
========================= */

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

/* =========================
   RULES
========================= */

const hasMinLength = computed(() => model.value.length >= 8)

const hasLetters = computed(() =>
  /(?=.*[a-z])(?=.*[A-Z])/.test(model.value)
)

const hasNumber = computed(() =>
  /\d/.test(model.value)
)

const isValid = computed(() =>
  hasMinLength.value &&
  hasLetters.value &&
  hasNumber.value
)

const isInvalid = computed(() =>
  model.value.length > 0 && !isValid.value
)

/* =========================
   EMIT VALIDITY TO PARENT
========================= */

watch(
  () => model.value,
  () => emit('validity', isValid.value),
  { immediate: true }
)

/* =========================
   UI
========================= */

const showRules = computed(() =>
  model.value.length > 0
)

/* =========================
   STYLES
========================= */

const okClass = 'text-emerald-600 dark:text-emerald-500'
const errorClass = 'text-red-500 dark:text-red-400'
</script>