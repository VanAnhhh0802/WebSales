/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { defineComponent, reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
export default defineComponent({
    name: 'RegisterView',
    setup() {
        const router = useRouter();
        const userStore = useUserStore();
        // Form state
        const registerForm = reactive({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false
        });
        // UI state
        const showPassword = ref(false);
        const showConfirmPassword = ref(false);
        const isLoading = computed(() => userStore.getLoading);
        const registerError = computed(() => userStore.getError);
        const validationErrors = reactive({});
        // Validate form
        const validateForm = () => {
            // Reset errors
            Object.keys(validationErrors).forEach(key => {
                delete validationErrors[key];
            });
            let isValid = true;
            // Validate name
            if (!registerForm.name.trim()) {
                validationErrors.name = 'Vui lòng nhập họ tên';
                isValid = false;
            }
            // Validate email
            if (!registerForm.email.trim()) {
                validationErrors.email = 'Vui lòng nhập email';
                isValid = false;
            }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email.trim())) {
                validationErrors.email = 'Email không hợp lệ';
                isValid = false;
            }
            // Validate password
            if (!registerForm.password) {
                validationErrors.password = 'Vui lòng nhập mật khẩu';
                isValid = false;
            }
            else if (registerForm.password.length < 8) {
                validationErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
                isValid = false;
            }
            else if (!/(?=.*[A-Za-z])(?=.*\d).+/.test(registerForm.password)) {
                validationErrors.password = 'Mật khẩu phải bao gồm cả chữ cái và số';
                isValid = false;
            }
            // Validate confirm password
            if (!registerForm.confirmPassword) {
                validationErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
                isValid = false;
            }
            else if (registerForm.confirmPassword !== registerForm.password) {
                validationErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
                isValid = false;
            }
            // Validate terms agreement
            if (!registerForm.agreeToTerms) {
                validationErrors.agreeToTerms = 'Bạn phải đồng ý với điều khoản dịch vụ để tiếp tục';
                isValid = false;
            }
            return isValid;
        };
        // Handle register
        const handleRegister = async () => {
            if (!validateForm()) {
                return;
            }
            const { name, email, password, confirmPassword } = registerForm;
            const success = await userStore.register({
                name,
                email,
                password,
                confirmPassword
            });
            if (success) {
                // Chuyển hướng đến trang chủ hoặc trang hồ sơ người dùng
                router.push('/profile');
            }
        };
        return {
            registerForm,
            showPassword,
            showConfirmPassword,
            isLoading,
            registerError,
            validationErrors,
            handleRegister
        };
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['auth-header']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-header']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['terms-agreement']} */ ;
/** @type {__VLS_StyleScopedClasses['terms-agreement']} */ ;
/** @type {__VLS_StyleScopedClasses['terms-link']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-error']} */ ;
/** @type {__VLS_StyleScopedClasses['divider']} */ ;
/** @type {__VLS_StyleScopedClasses['divider']} */ ;
/** @type {__VLS_StyleScopedClasses['divider']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-social']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-footer']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "register-view" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "auth-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "auth-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleRegister) },
    ...{ class: "auth-form" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "name",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "required" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: "text",
    id: "name",
    value: (__VLS_ctx.registerForm.name),
    required: true,
    ...{ class: ({ 'error': __VLS_ctx.validationErrors.name }) },
});
if (__VLS_ctx.validationErrors.name) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "error-message" },
    });
    (__VLS_ctx.validationErrors.name);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "email",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "required" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: "email",
    id: "email",
    required: true,
    ...{ class: ({ 'error': __VLS_ctx.validationErrors.email }) },
});
(__VLS_ctx.registerForm.email);
if (__VLS_ctx.validationErrors.email) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "error-message" },
    });
    (__VLS_ctx.validationErrors.email);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "password",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "required" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "password-input" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: (__VLS_ctx.showPassword ? 'text' : 'password'),
    id: "password",
    required: true,
    ...{ class: ({ 'error': __VLS_ctx.validationErrors.password }) },
});
(__VLS_ctx.registerForm.password);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showPassword = !__VLS_ctx.showPassword;
        } },
    type: "button",
    ...{ class: "toggle-password" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "material-icons" },
});
(__VLS_ctx.showPassword ? 'visibility_off' : 'visibility');
if (__VLS_ctx.validationErrors.password) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "error-message" },
    });
    (__VLS_ctx.validationErrors.password);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "password-hint" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "confirmPassword",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "required" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "password-input" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: (__VLS_ctx.showConfirmPassword ? 'text' : 'password'),
    id: "confirmPassword",
    required: true,
    ...{ class: ({ 'error': __VLS_ctx.validationErrors.confirmPassword }) },
});
(__VLS_ctx.registerForm.confirmPassword);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showConfirmPassword = !__VLS_ctx.showConfirmPassword;
        } },
    type: "button",
    ...{ class: "toggle-password" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "material-icons" },
});
(__VLS_ctx.showConfirmPassword ? 'visibility_off' : 'visibility');
if (__VLS_ctx.validationErrors.confirmPassword) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "error-message" },
    });
    (__VLS_ctx.validationErrors.confirmPassword);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-options" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "terms-agreement" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: "checkbox",
    id: "terms",
});
(__VLS_ctx.registerForm.agreeToTerms);
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "terms",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#",
    ...{ class: "terms-link" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#",
    ...{ class: "terms-link" },
});
if (__VLS_ctx.validationErrors.agreeToTerms) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "error-message" },
    });
    (__VLS_ctx.validationErrors.agreeToTerms);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "btn-primary" },
    disabled: (__VLS_ctx.isLoading || !__VLS_ctx.registerForm.agreeToTerms),
});
if (__VLS_ctx.isLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "loader" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
if (__VLS_ctx.registerError) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "auth-error" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.registerError);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "social-login" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "divider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "social-buttons" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "btn-social btn-google" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "material-icons" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "btn-social btn-facebook" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "material-icons" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "auth-footer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/login",
}));
const __VLS_2 = __VLS_1({
    to: "/login",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['register-view']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-container']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-header']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['password-hint']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-options']} */ ;
/** @type {__VLS_StyleScopedClasses['terms-agreement']} */ ;
/** @type {__VLS_StyleScopedClasses['terms-link']} */ ;
/** @type {__VLS_StyleScopedClasses['terms-link']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['loader']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-error']} */ ;
/** @type {__VLS_StyleScopedClasses['social-login']} */ ;
/** @type {__VLS_StyleScopedClasses['divider']} */ ;
/** @type {__VLS_StyleScopedClasses['social-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-social']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-google']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-social']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-facebook']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-footer']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=RegisterView.vue.js.map