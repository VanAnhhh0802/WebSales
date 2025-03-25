/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'HelloWorld',
    props: {
        msg: {
            type: String,
            required: true,
        },
    },
    emits: ['message-sent'],
    setup(props, { emit }) {
        const emitMessage = () => {
            emit('message-sent', 'Hello from the HelloWorld component!');
        };
        return {
            emitMessage,
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
    ...{ class: "hello-world" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.msg);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.emitMessage) },
});
/** @type {__VLS_StyleScopedClasses['hello-world']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=HelloWorld.vue.js.map