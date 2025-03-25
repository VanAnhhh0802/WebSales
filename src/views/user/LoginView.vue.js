/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'LoginView',
    setup() {
        const router = useRouter();
        // Form state
        const loginForm = reactive({
            email: '',
            password: '',
            remember: false
        });
        // UI state
        const showPassword = ref(false);
        const isLoading = ref(false);
        const loginError = ref(null);
        const validationErrors = reactive({});
        // Validate form
        const validateForm = () => {
            // Reset errors
            Object.keys(validationErrors).forEach(key => {
                delete validationErrors[key];
            });
            let isValid = true;
            // Validate email
            if (!loginForm.email.trim()) {
                validationErrors.email = 'Vui lòng nhập email';
                isValid = false;
            }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email.trim())) {
                validationErrors.email = 'Email không hợp lệ';
                isValid = false;
            }
            // Validate password
            if (!loginForm.password) {
                validationErrors.password = 'Vui lòng nhập mật khẩu';
                isValid = false;
            }
            return isValid;
        };
        // Handle login
        const handleLogin = async () => {
            if (!validateForm()) {
                return;
            }
            isLoading.value = true;
            loginError.value = null;
            try {
                // Mô phỏng gọi API đăng nhập (trong ứng dụng thực tế, đây là nơi gọi API)
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Mô phỏng đăng nhập thành công với email mặc định
                if (loginForm.email === 'user@example.com' && loginForm.password === 'password') {
                    // Lưu thông tin đăng nhập vào localStorage nếu "remember me" được chọn
                    if (loginForm.remember) {
                        localStorage.setItem('user', JSON.stringify({
                            email: loginForm.email,
                            name: 'Người dùng mẫu'
                        }));
                    }
                    // Chuyển hướng đến trang chủ hoặc trang được bảo vệ
                    router.push('/profile');
                }
                else {
                    // Hiển thị lỗi đăng nhập
                    loginError.value = 'Email hoặc mật khẩu không đúng';
                }
            }
            catch (error) {
                console.error('Login error:', error);
                loginError.value = 'Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.';
            }
            finally {
                isLoading.value = false;
            }
        };
        return {
            loginForm,
            showPassword,
            isLoading,
            loginError,
            validationErrors,
            handleLogin
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
/** @type {__VLS_StyleScopedClasses['remember-me']} */ ;
/** @type {__VLS_StyleScopedClasses['forgot-password']} */ ;
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
    ...{ class: "login-view" },
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
    ...{ onSubmit: (__VLS_ctx.handleLogin) },
    ...{ class: "auth-form" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "email",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: "email",
    id: "email",
    required: true,
    ...{ class: ({ 'error': __VLS_ctx.validationErrors.email }) },
});
(__VLS_ctx.loginForm.email);
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "password-input" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: (__VLS_ctx.showPassword ? 'text' : 'password'),
    id: "password",
    required: true,
    ...{ class: ({ 'error': __VLS_ctx.validationErrors.password }) },
});
(__VLS_ctx.loginForm.password);
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-options" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "remember-me" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: "checkbox",
    id: "remember",
});
(__VLS_ctx.loginForm.remember);
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "remember",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#",
    ...{ class: "forgot-password" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "btn-primary" },
    disabled: (__VLS_ctx.isLoading),
});
if (__VLS_ctx.isLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "loader" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
if (__VLS_ctx.loginError) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "auth-error" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.loginError);
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
    to: "/register",
}));
const __VLS_2 = __VLS_1({
    to: "/register",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['login-view']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-container']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-header']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-options']} */ ;
/** @type {__VLS_StyleScopedClasses['remember-me']} */ ;
/** @type {__VLS_StyleScopedClasses['forgot-password']} */ ;
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
//# sourceMappingURL=LoginView.vue.js.map