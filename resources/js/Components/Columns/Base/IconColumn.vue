<script setup>
import { computed } from 'vue'
import { Icon } from 'invue/core'
import { getNestedValue } from '../../../support/getNestedValue'

const TEXT_COLOR_CLASSES = {
    gray: 'text-gray-400 dark:text-gray-500',
    red: 'text-red-500 dark:text-red-400',
    green: 'text-green-600 dark:text-green-400',
    blue: 'text-blue-500 dark:text-blue-400',
    yellow: 'text-yellow-500 dark:text-yellow-400',
    amber: 'text-amber-500 dark:text-amber-400',
    sky: 'text-sky-500 dark:text-sky-400',
    rose: 'text-rose-500 dark:text-rose-400',
    purple: 'text-purple-500 dark:text-purple-400',
    pink: 'text-pink-500 dark:text-pink-400',
}

const props = defineProps({
    row: {
        type: Object,
        required: true,
    },
    field: {
        type: String,
        required: true,
    },
    boolean: {
        type: Boolean,
        default: false,
    },
    // Icon *names*, resolved through invue/core's <Icon> registry (see
    // Icon.vue) — not literal glyphs. Register 'check'/'x' (Lucide's own
    // names) via invue.registerIcons({...}), or any other registered name.
    trueIcon: {
        type: String,
        default: 'check',
    },
    falseIcon: {
        type: String,
        default: 'x',
    },
    trueColor: {
        type: String,
        default: 'green',
    },
    falseColor: {
        type: String,
        default: 'red',
    },
    icon: {
        type: [String, Function],
        default: null,
    },
    color: {
        type: [String, Function],
        default: 'gray',
    },
    size: {
        type: String,
        default: 'md',
    },
})

const rawValue = computed(() => getNestedValue(props.row, props.field))

const resolvedIcon = computed(() => {
    if (props.boolean) {
        return rawValue.value ? props.trueIcon : props.falseIcon
    }

    return typeof props.icon === 'function' ? props.icon(rawValue.value, props.row) : props.icon
})

const resolvedColor = computed(() => {
    if (props.boolean) {
        return rawValue.value ? props.trueColor : props.falseColor
    }

    return typeof props.color === 'function' ? props.color(rawValue.value, props.row) : props.color
})

const sizeClass = computed(() => ({ sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-5 w-5' })[props.size] ?? 'h-4 w-4')
</script>

<template>
    <Icon
        v-if="resolvedIcon"
        :name="resolvedIcon"
        :class="[TEXT_COLOR_CLASSES[resolvedColor] ?? TEXT_COLOR_CLASSES.gray, sizeClass]"
    />
</template>
