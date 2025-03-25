/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { defineComponent, ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
export default defineComponent({
    name: 'CheckoutView',
    setup() {
        const router = useRouter();
        const cartStore = useCartStore();
        // Thông tin giao hàng
        const shippingInfo = reactive({
            fullName: '',
            phone: '',
            email: '',
            address: '',
            province: '',
            district: '',
            ward: '',
            note: ''
        });
        // Thông tin thẻ
        const cardInfo = reactive({
            name: '',
            number: '',
            expiry: '',
            cvv: ''
        });
        // Phương thức thanh toán
        const paymentMethod = ref('cod');
        // Mã giảm giá
        const couponCode = ref('');
        const discount = ref(0);
        const shippingFee = ref(30000); // Phí vận chuyển mặc định
        // Lỗi validation
        const validationErrors = reactive({});
        // Lấy thông tin giỏ hàng
        const cartItems = computed(() => cartStore.getCartItems);
        const cartTotal = computed(() => cartStore.getCartTotal);
        // Tính tổng đơn hàng
        const orderTotal = computed(() => {
            // Miễn phí vận chuyển cho đơn hàng trên 500.000đ
            const actualShippingFee = cartTotal.value >= 500000 ? 0 : shippingFee.value;
            return cartTotal.value + actualShippingFee - discount.value;
        });
        // Tính giá của một item (đã áp dụng giảm giá nếu có)
        const getItemPrice = (item) => {
            if (item.discount) {
                return Math.round(item.price * (1 - item.discount / 100));
            }
            return item.price;
        };
        // Tính thành tiền của một item
        const getItemSubtotal = (item) => {
            return getItemPrice(item) * item.quantity;
        };
        // Áp dụng mã giảm giá
        const applyCoupon = () => {
            if (!couponCode.value) {
                alert('Vui lòng nhập mã giảm giá');
                return;
            }
            // Trong ứng dụng thực tế, đây sẽ là API call để kiểm tra mã giảm giá
            if (couponCode.value.toUpperCase() === 'WELCOME10') {
                // Giảm 10% tổng giá trị đơn hàng
                discount.value = Math.round(cartTotal.value * 0.1);
                alert('Áp dụng mã giảm giá thành công!');
            }
            else if (couponCode.value.toUpperCase() === 'FREESHIP') {
                // Miễn phí vận chuyển
                shippingFee.value = 0;
                alert('Áp dụng mã miễn phí vận chuyển thành công!');
            }
            else {
                alert('Mã giảm giá không hợp lệ hoặc đã hết hạn');
                discount.value = 0;
            }
        };
        // Kiểm tra form
        const validateForm = () => {
            // Reset lỗi
            Object.keys(validationErrors).forEach(key => {
                delete validationErrors[key];
            });
            let isValid = true;
            // Kiểm tra họ tên
            if (!shippingInfo.fullName.trim()) {
                validationErrors.fullName = 'Vui lòng nhập họ tên';
                isValid = false;
            }
            // Kiểm tra số điện thoại
            if (!shippingInfo.phone.trim()) {
                validationErrors.phone = 'Vui lòng nhập số điện thoại';
                isValid = false;
            }
            else if (!/^[0-9]{10}$/.test(shippingInfo.phone.trim())) {
                validationErrors.phone = 'Số điện thoại không hợp lệ';
                isValid = false;
            }
            // Kiểm tra email
            if (!shippingInfo.email.trim()) {
                validationErrors.email = 'Vui lòng nhập email';
                isValid = false;
            }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email.trim())) {
                validationErrors.email = 'Email không hợp lệ';
                isValid = false;
            }
            // Kiểm tra địa chỉ
            if (!shippingInfo.address.trim()) {
                validationErrors.address = 'Vui lòng nhập địa chỉ';
                isValid = false;
            }
            // Kiểm tra tỉnh/thành phố
            if (!shippingInfo.province) {
                validationErrors.province = 'Vui lòng chọn tỉnh/thành phố';
                isValid = false;
            }
            // Kiểm tra quận/huyện
            if (!shippingInfo.district) {
                validationErrors.district = 'Vui lòng chọn quận/huyện';
                isValid = false;
            }
            // Kiểm tra phường/xã
            if (!shippingInfo.ward) {
                validationErrors.ward = 'Vui lòng chọn phường/xã';
                isValid = false;
            }
            // Kiểm tra thông tin thẻ nếu chọn thanh toán bằng thẻ
            if (paymentMethod.value === 'card') {
                if (!cardInfo.name.trim() || !cardInfo.number.trim() || !cardInfo.expiry.trim() || !cardInfo.cvv.trim()) {
                    alert('Vui lòng điền đầy đủ thông tin thẻ');
                    isValid = false;
                }
            }
            return isValid;
        };
        // Tạo mã đơn hàng
        const generateOrderNumber = () => {
            const date = new Date();
            const year = date.getFullYear().toString().slice(-2);
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            return `${year}${month}${day}${randomNum}`;
        };
        // Đặt hàng
        const placeOrder = () => {
            if (!validateForm()) {
                // Scroll đến phần tử lỗi đầu tiên
                const firstError = document.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }
            // Trong ứng dụng thực tế, đây là nơi gửi thông tin đơn hàng lên server
            // Xóa giỏ hàng
            cartStore.clearCart();
            // Chuyển đến trang cảm ơn
            alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm.');
            router.push('/');
        };
        // Định dạng giá tiền
        const formatPrice = (price) => {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        };
        return {
            cartItems,
            cartTotal,
            shippingFee,
            discount,
            orderTotal,
            couponCode,
            shippingInfo,
            cardInfo,
            paymentMethod,
            validationErrors,
            getItemPrice,
            getItemSubtotal,
            applyCoupon,
            validateForm,
            generateOrderNumber,
            placeOrder,
            formatPrice
        };
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['empty-checkout']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-checkout']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-checkout']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-method']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-method']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-method']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-method-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['order-item']} */ ;
/** @type {__VLS_StyleScopedClasses['item-image']} */ ;
/** @type {__VLS_StyleScopedClasses['coupon-form']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-row']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['checkout-content']} */ ;
/** @type {__VLS_StyleScopedClasses['three-columns']} */ ;
/** @type {__VLS_StyleScopedClasses['two-columns']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "checkout-view" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "checkout-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
});
if (__VLS_ctx.cartItems.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "empty-checkout" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "empty-checkout-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    const __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: "/shoes",
        ...{ class: "btn-primary" },
    }));
    const __VLS_2 = __VLS_1({
        to: "/shoes",
        ...{ class: "btn-primary" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "checkout-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "checkout-form" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "shipping-info" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "fullName",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "required" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "text",
        id: "fullName",
        value: (__VLS_ctx.shippingInfo.fullName),
        required: true,
        ...{ class: ({ 'error': __VLS_ctx.validationErrors.fullName }) },
    });
    if (__VLS_ctx.validationErrors.fullName) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.validationErrors.fullName);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-row two-columns" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "phone",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "required" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "tel",
        id: "phone",
        required: true,
        ...{ class: ({ 'error': __VLS_ctx.validationErrors.phone }) },
    });
    (__VLS_ctx.shippingInfo.phone);
    if (__VLS_ctx.validationErrors.phone) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.validationErrors.phone);
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
    (__VLS_ctx.shippingInfo.email);
    if (__VLS_ctx.validationErrors.email) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.validationErrors.email);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "address",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "required" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "text",
        id: "address",
        value: (__VLS_ctx.shippingInfo.address),
        required: true,
        ...{ class: ({ 'error': __VLS_ctx.validationErrors.address }) },
    });
    if (__VLS_ctx.validationErrors.address) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.validationErrors.address);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-row three-columns" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "province",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "required" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        id: "province",
        value: (__VLS_ctx.shippingInfo.province),
        required: true,
        ...{ class: ({ 'error': __VLS_ctx.validationErrors.province }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "hanoi",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "hochiminh",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "danang",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "other",
    });
    if (__VLS_ctx.validationErrors.province) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.validationErrors.province);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "district",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "required" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        id: "district",
        value: (__VLS_ctx.shippingInfo.district),
        required: true,
        ...{ class: ({ 'error': __VLS_ctx.validationErrors.district }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "district1",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "district2",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "district3",
    });
    if (__VLS_ctx.validationErrors.district) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.validationErrors.district);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "ward",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "required" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        id: "ward",
        value: (__VLS_ctx.shippingInfo.ward),
        required: true,
        ...{ class: ({ 'error': __VLS_ctx.validationErrors.ward }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "ward1",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "ward2",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "ward3",
    });
    if (__VLS_ctx.validationErrors.ward) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.validationErrors.ward);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "note",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
        id: "note",
        value: (__VLS_ctx.shippingInfo.note),
        rows: "3",
        placeholder: "Ghi chú về đơn hàng, ví dụ: thời gian hay địa điểm giao hàng chi tiết hơn.",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "payment-methods" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "payment-method-list" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "payment-method" },
        ...{ class: ({ 'active': __VLS_ctx.paymentMethod === 'cod' }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "payment-method-selector" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "radio",
        id: "cod",
        value: "cod",
    });
    (__VLS_ctx.paymentMethod);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "cod",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "payment-method-icon" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "payment-method" },
        ...{ class: ({ 'active': __VLS_ctx.paymentMethod === 'bank' }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "payment-method-selector" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "radio",
        id: "bank",
        value: "bank",
    });
    (__VLS_ctx.paymentMethod);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "bank",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "payment-method-icon" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "payment-method" },
        ...{ class: ({ 'active': __VLS_ctx.paymentMethod === 'card' }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "payment-method-selector" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "radio",
        id: "card",
        value: "card",
    });
    (__VLS_ctx.paymentMethod);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "card",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "payment-method-icon" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    if (__VLS_ctx.paymentMethod === 'bank') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "payment-method-details" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "bank-info" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.generateOrderNumber());
    }
    if (__VLS_ctx.paymentMethod === 'card') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "payment-method-details" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "credit-card-form" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            for: "cardName",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "required" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
            type: "text",
            id: "cardName",
            value: (__VLS_ctx.cardInfo.name),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            for: "cardNumber",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "required" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
            type: "text",
            id: "cardNumber",
            value: (__VLS_ctx.cardInfo.number),
            placeholder: "XXXX XXXX XXXX XXXX",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-row two-columns" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            for: "cardExpiry",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "required" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
            type: "text",
            id: "cardExpiry",
            value: (__VLS_ctx.cardInfo.expiry),
            placeholder: "MM/YY",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            for: "cardCvv",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "required" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
            type: "text",
            id: "cardCvv",
            value: (__VLS_ctx.cardInfo.cvv),
            placeholder: "123",
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "order-summary" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "order-items" },
    });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.cartItems))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "order-item" },
            key: (item.id),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "item-image" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
            src: (item.imageUrl),
            alt: (item.name),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "item-quantity" },
        });
        (item.quantity);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "item-details" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (item.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "item-options" },
        });
        (item.size);
        (item.color);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "item-price" },
        });
        (__VLS_ctx.formatPrice(__VLS_ctx.getItemSubtotal(item)));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "coupon-form" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "text",
        value: (__VLS_ctx.couponCode),
        placeholder: "Nhập mã giảm giá",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.applyCoupon) },
        ...{ class: "btn-outline" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "summary-totals" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "summary-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.formatPrice(__VLS_ctx.cartTotal));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "summary-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.formatPrice(__VLS_ctx.shippingFee));
    if (__VLS_ctx.discount > 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "summary-discount" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.formatPrice(__VLS_ctx.discount));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "summary-row total" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.formatPrice(__VLS_ctx.orderTotal));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "checkout-actions" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.placeOrder) },
        ...{ class: "btn-primary place-order" },
    });
    const __VLS_4 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        to: "/cart",
        ...{ class: "btn-outline" },
    }));
    const __VLS_6 = __VLS_5({
        to: "/cart",
        ...{ class: "btn-outline" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    var __VLS_7;
}
/** @type {__VLS_StyleScopedClasses['checkout-view']} */ ;
/** @type {__VLS_StyleScopedClasses['checkout-header']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-checkout']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-checkout-content']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['checkout-content']} */ ;
/** @type {__VLS_StyleScopedClasses['checkout-form']} */ ;
/** @type {__VLS_StyleScopedClasses['shipping-info']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['two-columns']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['three-columns']} */ ;
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
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-methods']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-method-list']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-method']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-method-selector']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-method-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-method']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-method-selector']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-method-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-method']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-method-selector']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-method-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-method-details']} */ ;
/** @type {__VLS_StyleScopedClasses['bank-info']} */ ;
/** @type {__VLS_StyleScopedClasses['payment-method-details']} */ ;
/** @type {__VLS_StyleScopedClasses['credit-card-form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['two-columns']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['order-summary']} */ ;
/** @type {__VLS_StyleScopedClasses['order-items']} */ ;
/** @type {__VLS_StyleScopedClasses['order-item']} */ ;
/** @type {__VLS_StyleScopedClasses['item-image']} */ ;
/** @type {__VLS_StyleScopedClasses['item-quantity']} */ ;
/** @type {__VLS_StyleScopedClasses['item-details']} */ ;
/** @type {__VLS_StyleScopedClasses['item-options']} */ ;
/** @type {__VLS_StyleScopedClasses['item-price']} */ ;
/** @type {__VLS_StyleScopedClasses['coupon-form']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-totals']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-row']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-row']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-discount']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-row']} */ ;
/** @type {__VLS_StyleScopedClasses['total']} */ ;
/** @type {__VLS_StyleScopedClasses['checkout-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['place-order']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=CheckoutView.vue.js.map