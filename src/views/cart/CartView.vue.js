/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { defineComponent, ref, computed } from 'vue';
import { useCartStore } from '@/stores/cart';
export default defineComponent({
    name: 'CartView',
    setup() {
        const cartStore = useCartStore();
        const couponCode = ref('');
        const discount = ref(0);
        const shippingFee = ref(30000); // Phí vận chuyển mặc định
        // Lấy danh sách giỏ hàng từ store
        const cartItems = computed(() => cartStore.getCartItems);
        const cartTotal = computed(() => cartStore.getCartTotal);
        // Tính tổng đơn hàng (đã bao gồm phí vận chuyển và giảm giá)
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
        // Tính thành tiền của một item (số lượng * giá sau giảm giá)
        const getItemSubtotal = (item) => {
            return getItemPrice(item) * item.quantity;
        };
        // Cập nhật số lượng sản phẩm
        const updateQuantity = (itemId, quantity) => {
            if (quantity > 0 && quantity <= 10) {
                cartStore.updateCartItem(itemId, quantity);
            }
        };
        // Xóa sản phẩm khỏi giỏ hàng
        const removeItem = (itemId) => {
            if (confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
                cartStore.removeCartItem(itemId);
            }
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
            getItemPrice,
            getItemSubtotal,
            updateQuantity,
            removeItem,
            applyCoupon,
            formatPrice
        };
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['empty-cart']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-cart']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-cart']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-item']} */ ;
/** @type {__VLS_StyleScopedClasses['item-image']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-control']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-control']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-control']} */ ;
/** @type {__VLS_StyleScopedClasses['remove-item']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-summary']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-row']} */ ;
/** @type {__VLS_StyleScopedClasses['coupon-form']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-content']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-item']} */ ;
/** @type {__VLS_StyleScopedClasses['item-subtotal']} */ ;
/** @type {__VLS_StyleScopedClasses['item-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-item']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "cart-view" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "cart-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
});
if (__VLS_ctx.cartItems.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "empty-cart" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "empty-cart-content" },
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
        ...{ class: "cart-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cart-items" },
    });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.cartItems))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cart-item" },
            key: (item.id),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "item-image" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
            src: (item.imageUrl),
            alt: (item.name),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "item-details" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: "item-name" },
        });
        (item.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "item-options" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "item-size" },
        });
        (item.size);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "item-color" },
        });
        (item.color);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "item-price" },
        });
        if (item.discount) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "original-price" },
            });
            (__VLS_ctx.formatPrice(item.price));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "current-price" },
        });
        (__VLS_ctx.formatPrice(__VLS_ctx.getItemPrice(item)));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "item-quantity" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "quantity-control" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.cartItems.length === 0))
                        return;
                    __VLS_ctx.updateQuantity(item.id, item.quantity - 1);
                } },
            ...{ class: "quantity-btn" },
            disabled: (item.quantity <= 1),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onChange: ((e) => __VLS_ctx.updateQuantity(item.id, parseInt(e.target.value, 10))) },
            type: "number",
            value: (item.quantity),
            min: "1",
            max: "10",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.cartItems.length === 0))
                        return;
                    __VLS_ctx.updateQuantity(item.id, item.quantity + 1);
                } },
            ...{ class: "quantity-btn" },
            disabled: (item.quantity >= 10),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "item-subtotal" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "subtotal-label" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "subtotal-value" },
        });
        (__VLS_ctx.formatPrice(__VLS_ctx.getItemSubtotal(item)));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "item-actions" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.cartItems.length === 0))
                        return;
                    __VLS_ctx.removeItem(item.id);
                } },
            ...{ class: "remove-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cart-summary" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
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
        ...{ class: "cart-actions" },
    });
    const __VLS_4 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        to: "/checkout",
        ...{ class: "btn-primary" },
    }));
    const __VLS_6 = __VLS_5({
        to: "/checkout",
        ...{ class: "btn-primary" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    var __VLS_7;
    const __VLS_8 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        to: "/shoes",
        ...{ class: "btn-outline" },
    }));
    const __VLS_10 = __VLS_9({
        to: "/shoes",
        ...{ class: "btn-outline" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_11.slots.default;
    var __VLS_11;
}
/** @type {__VLS_StyleScopedClasses['cart-view']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-header']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-cart']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-cart-content']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-content']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-items']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-item']} */ ;
/** @type {__VLS_StyleScopedClasses['item-image']} */ ;
/** @type {__VLS_StyleScopedClasses['item-details']} */ ;
/** @type {__VLS_StyleScopedClasses['item-name']} */ ;
/** @type {__VLS_StyleScopedClasses['item-options']} */ ;
/** @type {__VLS_StyleScopedClasses['item-size']} */ ;
/** @type {__VLS_StyleScopedClasses['item-color']} */ ;
/** @type {__VLS_StyleScopedClasses['item-price']} */ ;
/** @type {__VLS_StyleScopedClasses['original-price']} */ ;
/** @type {__VLS_StyleScopedClasses['current-price']} */ ;
/** @type {__VLS_StyleScopedClasses['item-quantity']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-control']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['item-subtotal']} */ ;
/** @type {__VLS_StyleScopedClasses['subtotal-label']} */ ;
/** @type {__VLS_StyleScopedClasses['subtotal-value']} */ ;
/** @type {__VLS_StyleScopedClasses['item-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['remove-item']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-summary']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-row']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-row']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-discount']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-row']} */ ;
/** @type {__VLS_StyleScopedClasses['total']} */ ;
/** @type {__VLS_StyleScopedClasses['coupon-form']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=CartView.vue.js.map