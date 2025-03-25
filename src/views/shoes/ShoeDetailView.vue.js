/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useShoeStore } from '@/stores/shoe';
import { useCartStore } from '@/stores/cart';
export default defineComponent({
    name: 'ShoeDetailView',
    setup() {
        const route = useRoute();
        const router = useRouter();
        const shoeStore = useShoeStore();
        const cartStore = useCartStore();
        const selectedSize = ref(null);
        const selectedColor = ref(null);
        const quantity = ref(1);
        const loading = ref(false);
        const error = ref(null);
        const currentImage = ref('');
        // Lấy thông tin sản phẩm từ ID trên URL
        const shoeId = computed(() => {
            const id = route.params.id;
            return typeof id === 'string' ? parseInt(id, 10) : -1;
        });
        const selectedShoe = computed(() => {
            return shoeStore.getShoeById(shoeId.value);
        });
        const discountedPrice = computed(() => {
            if (!selectedShoe.value)
                return 0;
            if (selectedShoe.value.discount) {
                return Math.round(selectedShoe.value.price * (1 - selectedShoe.value.discount / 100));
            }
            return selectedShoe.value.price;
        });
        const allImages = computed(() => {
            if (!selectedShoe.value)
                return [];
            // Kết hợp ảnh chính và gallery
            return [selectedShoe.value.imageUrl, ...(selectedShoe.value.gallery || [])];
        });
        const canAddToCart = computed(() => {
            return selectedShoe.value && selectedSize.value !== null && selectedColor.value !== null;
        });
        // Sản phẩm liên quan (cùng thương hiệu hoặc danh mục)
        const relatedProducts = computed(() => {
            if (!selectedShoe.value)
                return [];
            return shoeStore.shoes
                .filter((shoe) => shoe.id !== selectedShoe.value?.id &&
                (shoe.brand === selectedShoe.value?.brand ||
                    shoe.category === selectedShoe.value?.category))
                .slice(0, 4);
        });
        // Fetch thông tin sản phẩm
        const fetchShoe = async () => {
            loading.value = true;
            error.value = null;
            try {
                await shoeStore.fetchShoes();
                // Kiểm tra sản phẩm có tồn tại không
                if (!selectedShoe.value) {
                    error.value = 'Không tìm thấy sản phẩm';
                    return;
                }
                // Đặt ảnh mặc định
                currentImage.value = selectedShoe.value.imageUrl;
            }
            catch (err) {
                console.error('Error fetching shoe details:', err);
                error.value = 'Có lỗi xảy ra khi tải thông tin sản phẩm. Vui lòng thử lại sau.';
            }
            finally {
                loading.value = false;
            }
        };
        // Các phương thức hỗ trợ
        const formatPrice = (price) => {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        };
        const getDiscountedPrice = (shoe) => {
            if (shoe.discount) {
                return Math.round(shoe.price * (1 - shoe.discount / 100));
            }
            return shoe.price;
        };
        const increaseQuantity = () => {
            if (quantity.value < 10) {
                quantity.value++;
            }
        };
        const decreaseQuantity = () => {
            if (quantity.value > 1) {
                quantity.value--;
            }
        };
        // Thêm vào giỏ hàng
        const addToCart = () => {
            if (!selectedShoe.value || !selectedSize.value || !selectedColor.value) {
                return;
            }
            cartStore.addToCart(selectedShoe.value, quantity.value, selectedSize.value, selectedColor.value);
            // Hiển thị thông báo thành công (trong ứng dụng thực tế)
            alert('Đã thêm sản phẩm vào giỏ hàng!');
        };
        const buyNow = () => {
            if (canAddToCart.value) {
                addToCart();
                router.push('/checkout');
            }
        };
        // Theo dõi thay đổi ID và fetch lại dữ liệu khi cần
        watch(shoeId, () => {
            fetchShoe();
        });
        onMounted(() => {
            fetchShoe();
        });
        return {
            selectedShoe,
            loading,
            error,
            selectedSize,
            selectedColor,
            quantity,
            currentImage,
            allImages,
            discountedPrice,
            relatedProducts,
            canAddToCart,
            formatPrice,
            getDiscountedPrice,
            increaseQuantity,
            decreaseQuantity,
            addToCart,
            buyNow,
            fetchShoe
        };
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['main-image']} */ ;
/** @type {__VLS_StyleScopedClasses['thumbnail']} */ ;
/** @type {__VLS_StyleScopedClasses['thumbnail']} */ ;
/** @type {__VLS_StyleScopedClasses['breadcrumbs']} */ ;
/** @type {__VLS_StyleScopedClasses['breadcrumbs']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-description']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-description']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-options']} */ ;
/** @type {__VLS_StyleScopedClasses['size-option']} */ ;
/** @type {__VLS_StyleScopedClasses['size-option']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['color-option']} */ ;
/** @type {__VLS_StyleScopedClasses['color-option']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-control']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-control']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-control']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['product-card']} */ ;
/** @type {__VLS_StyleScopedClasses['product-card']} */ ;
/** @type {__VLS_StyleScopedClasses['product-img']} */ ;
/** @type {__VLS_StyleScopedClasses['product-card']} */ ;
/** @type {__VLS_StyleScopedClasses['product-img']} */ ;
/** @type {__VLS_StyleScopedClasses['product-info']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-detail-container']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-actions']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "shoe-detail-view" },
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
else if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-state" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.error);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.fetchShoe) },
        ...{ class: "btn-primary" },
    });
    const __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: "/shoes",
        ...{ class: "btn-outline" },
    }));
    const __VLS_2 = __VLS_1({
        to: "/shoes",
        ...{ class: "btn-outline" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    var __VLS_3;
}
else if (!__VLS_ctx.selectedShoe) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-state" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    const __VLS_4 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        to: "/shoes",
        ...{ class: "btn-outline" },
    }));
    const __VLS_6 = __VLS_5({
        to: "/shoes",
        ...{ class: "btn-outline" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    var __VLS_7;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "shoe-detail-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "shoe-images" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "main-image" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.currentImage),
        alt: (__VLS_ctx.selectedShoe.name),
    });
    if (__VLS_ctx.selectedShoe.discount) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "discount-tag" },
        });
        (__VLS_ctx.selectedShoe.discount);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "image-gallery" },
    });
    for (const [image, index] of __VLS_getVForSourceType((__VLS_ctx.allImages))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.error))
                        return;
                    if (!!(!__VLS_ctx.selectedShoe))
                        return;
                    __VLS_ctx.currentImage = image;
                } },
            key: (index),
            ...{ class: "thumbnail" },
            ...{ class: ({ active: __VLS_ctx.currentImage === image }) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            src: (image),
            alt: (`${__VLS_ctx.selectedShoe.name} - Ảnh ${index + 1}`),
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "shoe-info" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "breadcrumbs" },
    });
    const __VLS_8 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        to: "/",
    }));
    const __VLS_10 = __VLS_9({
        to: "/",
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_11.slots.default;
    var __VLS_11;
    const __VLS_12 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        to: "/shoes",
    }));
    const __VLS_14 = __VLS_13({
        to: "/shoes",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_15.slots.default;
    var __VLS_15;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.selectedShoe.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: "shoe-name" },
    });
    (__VLS_ctx.selectedShoe.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "shoe-brand" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.selectedShoe.brand);
    if (__VLS_ctx.selectedShoe.rating) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "shoe-rating" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "stars" },
        });
        for (const [i] of __VLS_getVForSourceType((5))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                key: (i),
                ...{ class: (['star', { 'filled': i <= Math.floor(__VLS_ctx.selectedShoe.rating) }]) },
            });
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "rating-text" },
        });
        (__VLS_ctx.selectedShoe.rating.toFixed(1));
        if (__VLS_ctx.selectedShoe.reviews) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (__VLS_ctx.selectedShoe.reviews);
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "shoe-price" },
    });
    if (__VLS_ctx.selectedShoe.discount) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "original-price" },
        });
        (__VLS_ctx.formatPrice(__VLS_ctx.selectedShoe.price));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "current-price" },
    });
    (__VLS_ctx.formatPrice(__VLS_ctx.discountedPrice));
    if (__VLS_ctx.selectedShoe.discount) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "discount-percentage" },
        });
        (__VLS_ctx.selectedShoe.discount);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "shoe-description" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.selectedShoe.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "shoe-options" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "size-options" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "option-list" },
    });
    for (const [size] of __VLS_getVForSourceType((__VLS_ctx.selectedShoe.sizes))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.error))
                        return;
                    if (!!(!__VLS_ctx.selectedShoe))
                        return;
                    __VLS_ctx.selectedSize = size;
                } },
            key: (size),
            ...{ class: (['size-option', { active: size === __VLS_ctx.selectedSize }]) },
        });
        (size);
    }
    if (!__VLS_ctx.selectedSize) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "option-error" },
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "color-options" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "option-list" },
    });
    for (const [color] of __VLS_getVForSourceType((__VLS_ctx.selectedShoe.colors))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.error))
                        return;
                    if (!!(!__VLS_ctx.selectedShoe))
                        return;
                    __VLS_ctx.selectedColor = color;
                } },
            key: (color),
            ...{ class: (['color-option', { active: color === __VLS_ctx.selectedColor }]) },
        });
        (color);
    }
    if (!__VLS_ctx.selectedColor) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "option-error" },
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "quantity-selector" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "quantity-control" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.decreaseQuantity) },
        ...{ class: "quantity-btn" },
        disabled: (__VLS_ctx.quantity <= 1),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "number",
        min: "1",
        max: "10",
    });
    (__VLS_ctx.quantity);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.increaseQuantity) },
        ...{ class: "quantity-btn" },
        disabled: (__VLS_ctx.quantity >= 10),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "shoe-actions" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.addToCart) },
        ...{ class: "btn-primary add-to-cart" },
        disabled: (!__VLS_ctx.canAddToCart),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    const __VLS_16 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        ...{ 'onClick': {} },
        to: "/checkout",
        ...{ class: "btn-outline buy-now" },
    }));
    const __VLS_18 = __VLS_17({
        ...{ 'onClick': {} },
        to: "/checkout",
        ...{ class: "btn-outline buy-now" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    let __VLS_20;
    let __VLS_21;
    let __VLS_22;
    const __VLS_23 = {
        onClick: (__VLS_ctx.buyNow)
    };
    __VLS_19.slots.default;
    var __VLS_19;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "additional-info" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
if (__VLS_ctx.selectedShoe) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "related-products" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "section-title" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "product-slider" },
    });
    for (const [product] of __VLS_getVForSourceType((__VLS_ctx.relatedProducts))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (product.id),
            ...{ class: "product-card" },
        });
        const __VLS_24 = {}.RouterLink;
        /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
            to: (`/shoe/${product.id}`),
        }));
        const __VLS_26 = __VLS_25({
            to: (`/shoe/${product.id}`),
        }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        __VLS_27.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "product-img" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
            src: (product.imageUrl),
            alt: (product.name),
        });
        if (product.discount) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "discount-tag" },
            });
            (product.discount);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "product-info" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (product.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "product-brand" },
        });
        (product.brand);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "product-price" },
        });
        if (product.discount) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "original-price" },
            });
            (__VLS_ctx.formatPrice(product.price));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "current-price" },
        });
        (__VLS_ctx.formatPrice(__VLS_ctx.getDiscountedPrice(product)));
        var __VLS_27;
    }
}
/** @type {__VLS_StyleScopedClasses['shoe-detail-view']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-detail-container']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-images']} */ ;
/** @type {__VLS_StyleScopedClasses['main-image']} */ ;
/** @type {__VLS_StyleScopedClasses['discount-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['image-gallery']} */ ;
/** @type {__VLS_StyleScopedClasses['thumbnail']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-info']} */ ;
/** @type {__VLS_StyleScopedClasses['breadcrumbs']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-name']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-brand']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-rating']} */ ;
/** @type {__VLS_StyleScopedClasses['stars']} */ ;
/** @type {__VLS_StyleScopedClasses['star']} */ ;
/** @type {__VLS_StyleScopedClasses['filled']} */ ;
/** @type {__VLS_StyleScopedClasses['rating-text']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-price']} */ ;
/** @type {__VLS_StyleScopedClasses['original-price']} */ ;
/** @type {__VLS_StyleScopedClasses['current-price']} */ ;
/** @type {__VLS_StyleScopedClasses['discount-percentage']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-description']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-options']} */ ;
/** @type {__VLS_StyleScopedClasses['size-options']} */ ;
/** @type {__VLS_StyleScopedClasses['option-list']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['size-option']} */ ;
/** @type {__VLS_StyleScopedClasses['option-error']} */ ;
/** @type {__VLS_StyleScopedClasses['color-options']} */ ;
/** @type {__VLS_StyleScopedClasses['option-list']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['color-option']} */ ;
/** @type {__VLS_StyleScopedClasses['option-error']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-selector']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-control']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['quantity-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['add-to-cart']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['buy-now']} */ ;
/** @type {__VLS_StyleScopedClasses['additional-info']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['related-products']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['product-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['product-card']} */ ;
/** @type {__VLS_StyleScopedClasses['product-img']} */ ;
/** @type {__VLS_StyleScopedClasses['discount-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['product-info']} */ ;
/** @type {__VLS_StyleScopedClasses['product-brand']} */ ;
/** @type {__VLS_StyleScopedClasses['product-price']} */ ;
/** @type {__VLS_StyleScopedClasses['original-price']} */ ;
/** @type {__VLS_StyleScopedClasses['current-price']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=ShoeDetailView.vue.js.map