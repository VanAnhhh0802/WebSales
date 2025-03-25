/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
export default defineComponent({
    name: 'OrdersView',
    setup() {
        const userStore = useUserStore();
        const isAuthenticated = computed(() => userStore.getAuthStatus);
        const orders = ref([]);
        const filteredOrders = ref([]);
        const loading = ref(true);
        // Filters
        const searchQuery = ref('');
        const statusFilter = ref('all');
        const timeFilter = ref('all');
        // Mô phỏng fetch dữ liệu đơn hàng
        const fetchOrders = async () => {
            loading.value = true;
            try {
                // Giả lập thời gian tải dữ liệu
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Trong ứng dụng thực tế, dữ liệu này sẽ đến từ API
                orders.value = [
                    {
                        id: 1,
                        orderNumber: '123456',
                        orderDate: new Date(2025, 2, 25), // 25/03/2025
                        status: 'completed',
                        products: [
                            {
                                id: 1,
                                name: 'Giày Thể Thao Air Max',
                                imageUrl: 'https://placehold.co/100x100?text=Nike+Air+Max',
                                price: 1500000,
                                quantity: 1
                            },
                            {
                                id: 2,
                                name: 'Giày Adidas Ultraboost',
                                imageUrl: 'https://placehold.co/100x100?text=Adidas+Ultraboost',
                                price: 1000000,
                                quantity: 1
                            }
                        ],
                        total: 2500000
                    },
                    {
                        id: 2,
                        orderNumber: '123457',
                        orderDate: new Date(2025, 2, 20), // 20/03/2025
                        status: 'shipping',
                        products: [
                            {
                                id: 3,
                                name: 'Giày Converse Classic',
                                imageUrl: 'https://placehold.co/100x100?text=Converse+Classic',
                                price: 800000,
                                quantity: 1
                            }
                        ],
                        total: 800000
                    },
                    {
                        id: 3,
                        orderNumber: '123458',
                        orderDate: new Date(2025, 1, 15), // 15/02/2025
                        status: 'pending',
                        products: [
                            {
                                id: 4,
                                name: 'Giày Vans Old Skool',
                                imageUrl: 'https://placehold.co/100x100?text=Vans+Old+Skool',
                                price: 1200000,
                                quantity: 1
                            },
                            {
                                id: 5,
                                name: 'Giày Jordan 1 Retro High',
                                imageUrl: 'https://placehold.co/100x100?text=Jordan+1+Retro',
                                price: 3500000,
                                quantity: 1
                            },
                            {
                                id: 6,
                                name: 'Giày Puma RS-X',
                                imageUrl: 'https://placehold.co/100x100?text=Puma+RS-X',
                                price: 1800000,
                                quantity: 1
                            },
                            {
                                id: 7,
                                name: 'Giày Balenciaga Triple S',
                                imageUrl: 'https://placehold.co/100x100?text=Balenciaga+Triple+S',
                                price: 20000000,
                                quantity: 1
                            }
                        ],
                        total: 26500000
                    }
                ];
                // Khởi tạo danh sách lọc
                filterOrders();
            }
            catch (error) {
                console.error('Error fetching orders:', error);
            }
            finally {
                loading.value = false;
            }
        };
        // Lọc đơn hàng
        const filterOrders = () => {
            filteredOrders.value = orders.value.filter(order => {
                // Lọc theo từ khóa tìm kiếm
                const matchesQuery = !searchQuery.value ||
                    order.orderNumber.includes(searchQuery.value);
                // Lọc theo trạng thái
                const matchesStatus = statusFilter.value === 'all' ||
                    order.status === statusFilter.value;
                // Lọc theo thời gian
                let matchesTime = true;
                const now = new Date();
                if (timeFilter.value === 'month') {
                    // Tháng này
                    matchesTime = order.orderDate.getMonth() === now.getMonth() &&
                        order.orderDate.getFullYear() === now.getFullYear();
                }
                else if (timeFilter.value === 'three_months') {
                    // 3 tháng gần đây
                    const threeMonthsAgo = new Date();
                    threeMonthsAgo.setMonth(now.getMonth() - 3);
                    matchesTime = order.orderDate >= threeMonthsAgo;
                }
                else if (timeFilter.value === 'six_months') {
                    // 6 tháng gần đây
                    const sixMonthsAgo = new Date();
                    sixMonthsAgo.setMonth(now.getMonth() - 6);
                    matchesTime = order.orderDate >= sixMonthsAgo;
                }
                else if (timeFilter.value === 'year') {
                    // Năm nay
                    matchesTime = order.orderDate.getFullYear() === now.getFullYear();
                }
                return matchesQuery && matchesStatus && matchesTime;
            });
        };
        // Xóa bộ lọc
        const resetFilters = () => {
            searchQuery.value = '';
            statusFilter.value = 'all';
            timeFilter.value = 'all';
            filterOrders();
        };
        // Format ngày
        const formatDate = (date) => {
            return date.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        };
        // Format giá
        const formatPrice = (price) => {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        };
        // Lấy label trạng thái
        const getStatusLabel = (status) => {
            switch (status) {
                case 'pending': return 'Chờ xác nhận';
                case 'processing': return 'Đang xử lý';
                case 'shipping': return 'Đang vận chuyển';
                case 'completed': return 'Đã giao hàng';
                case 'cancelled': return 'Đã hủy';
                default: return status;
            }
        };
        // Lấy class CSS cho trạng thái
        const getStatusClass = (status) => {
            switch (status) {
                case 'pending': return 'status-pending';
                case 'processing': return 'status-processing';
                case 'shipping': return 'status-shipping';
                case 'completed': return 'status-completed';
                case 'cancelled': return 'status-cancelled';
                default: return '';
            }
        };
        onMounted(() => {
            fetchOrders();
        });
        return {
            isAuthenticated,
            orders,
            filteredOrders,
            loading,
            searchQuery,
            statusFilter,
            timeFilter,
            filterOrders,
            resetFilters,
            formatDate,
            formatPrice,
            getStatusLabel,
            getStatusClass
        };
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['auth-required']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-required']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-required']} */ ;
/** @type {__VLS_StyleScopedClasses['search-box']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-options']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['product-image']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-text']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-text']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-text-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-text-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['order-header']} */ ;
/** @type {__VLS_StyleScopedClasses['order-status']} */ ;
/** @type {__VLS_StyleScopedClasses['order-products']} */ ;
/** @type {__VLS_StyleScopedClasses['product-summary']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-options']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-options']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "orders-view" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "orders-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
});
if (!__VLS_ctx.isAuthenticated) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "auth-required" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "auth-required-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "auth-buttons" },
    });
    const __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: "/login",
        ...{ class: "btn-primary" },
    }));
    const __VLS_2 = __VLS_1({
        to: "/login",
        ...{ class: "btn-primary" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    var __VLS_3;
    const __VLS_4 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        to: "/register",
        ...{ class: "btn-outline" },
    }));
    const __VLS_6 = __VLS_5({
        to: "/register",
        ...{ class: "btn-outline" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    var __VLS_7;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "orders-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "orders-filter" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "search-box" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onInput: (__VLS_ctx.filterOrders) },
        type: "text",
        value: (__VLS_ctx.searchQuery),
        placeholder: "Tìm kiếm theo mã đơn hàng...",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "filter-options" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        ...{ onChange: (__VLS_ctx.filterOrders) },
        value: (__VLS_ctx.statusFilter),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "all",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "pending",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "processing",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "shipping",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "completed",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "cancelled",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        ...{ onChange: (__VLS_ctx.filterOrders) },
        value: (__VLS_ctx.timeFilter),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "all",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "month",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "three_months",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "six_months",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "year",
    });
    if (__VLS_ctx.loading) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "loading-state" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "loader" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    else if (__VLS_ctx.filteredOrders.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "empty-state" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
        if (__VLS_ctx.searchQuery || __VLS_ctx.statusFilter !== 'all' || __VLS_ctx.timeFilter !== 'all') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.resetFilters) },
                ...{ class: "reset-filter" },
            });
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        }
        const __VLS_8 = {}.RouterLink;
        /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
            to: "/shoes",
            ...{ class: "btn-primary" },
        }));
        const __VLS_10 = __VLS_9({
            to: "/shoes",
            ...{ class: "btn-primary" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        __VLS_11.slots.default;
        var __VLS_11;
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "orders-list" },
        });
        for (const [order] of __VLS_getVForSourceType((__VLS_ctx.filteredOrders))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                key: (order.id),
                ...{ class: "order-card" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "order-header" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "order-info" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
            (order.orderNumber);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                ...{ class: "order-date" },
            });
            (__VLS_ctx.formatDate(order.orderDate));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "order-status" },
                ...{ class: (__VLS_ctx.getStatusClass(order.status)) },
            });
            (__VLS_ctx.getStatusLabel(order.status));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "order-products" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "product-images" },
            });
            for (const [product, index] of __VLS_getVForSourceType((order.products.slice(0, 3)))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    key: (index),
                    ...{ class: "product-image" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
                    src: (product.imageUrl),
                    alt: (product.name),
                });
            }
            if (order.products.length > 3) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "more-products" },
                });
                (order.products.length - 3);
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "product-summary" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                ...{ class: "product-count" },
            });
            (order.products.length);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                ...{ class: "order-total" },
            });
            (__VLS_ctx.formatPrice(order.total));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "order-actions" },
            });
            const __VLS_12 = {}.RouterLink;
            /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
            // @ts-ignore
            const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
                to: (`/order/${order.id}`),
                ...{ class: "btn-outline" },
            }));
            const __VLS_14 = __VLS_13({
                to: (`/order/${order.id}`),
                ...{ class: "btn-outline" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_13));
            __VLS_15.slots.default;
            var __VLS_15;
            if (order.status === 'completed') {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                    ...{ class: "btn-text" },
                });
            }
            if (order.status === 'pending') {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                    ...{ class: "btn-text-danger" },
                });
            }
        }
    }
}
/** @type {__VLS_StyleScopedClasses['orders-view']} */ ;
/** @type {__VLS_StyleScopedClasses['orders-header']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-required']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-required-content']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['orders-content']} */ ;
/** @type {__VLS_StyleScopedClasses['orders-filter']} */ ;
/** @type {__VLS_StyleScopedClasses['search-box']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-options']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loader']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['reset-filter']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['orders-list']} */ ;
/** @type {__VLS_StyleScopedClasses['order-card']} */ ;
/** @type {__VLS_StyleScopedClasses['order-header']} */ ;
/** @type {__VLS_StyleScopedClasses['order-info']} */ ;
/** @type {__VLS_StyleScopedClasses['order-date']} */ ;
/** @type {__VLS_StyleScopedClasses['order-status']} */ ;
/** @type {__VLS_StyleScopedClasses['order-products']} */ ;
/** @type {__VLS_StyleScopedClasses['product-images']} */ ;
/** @type {__VLS_StyleScopedClasses['product-image']} */ ;
/** @type {__VLS_StyleScopedClasses['more-products']} */ ;
/** @type {__VLS_StyleScopedClasses['product-summary']} */ ;
/** @type {__VLS_StyleScopedClasses['product-count']} */ ;
/** @type {__VLS_StyleScopedClasses['order-total']} */ ;
/** @type {__VLS_StyleScopedClasses['order-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-text']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-text-danger']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=OrdersView.vue.js.map