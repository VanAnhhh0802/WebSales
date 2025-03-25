/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { defineComponent } from 'vue';
import { useCounter } from '@/composables/useCounter';
export default defineComponent({
    name: 'CounterButton',
    props: {
        initialCount: {
            type: Number,
            default: 0,
        },
    },
    emits: ['count-changed'],
    setup(props, { emit }) {
        const { count, increment, decrement, reset } = useCounter(props.initialCount);
        // Watch for changes in count and emit to parent
        const incrementWithEmit = () => {
            increment();
            emit('count-changed', count.value);
        };
        const decrementWithEmit = () => {
            decrement();
            emit('count-changed', count.value);
        };
        const resetWithEmit = () => {
            reset();
            emit('count-changed', count.value);
        };
        return {
            count,
            increment: incrementWithEmit,
            decrement: decrementWithEmit,
            reset: resetWithEmit,
        };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "counter-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.count);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "buttons" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.increment) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.decrement) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.reset) },
});
/** @type {__VLS_StyleScopedClasses['counter-button']} */ ;
/** @type {__VLS_StyleScopedClasses['buttons']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=CounterButton.vue.js.map