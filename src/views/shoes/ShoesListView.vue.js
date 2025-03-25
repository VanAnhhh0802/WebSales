/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useShoeStore } from '@/stores/shoe';
export default defineComponent({
    name: 'ShoesListView',
    setup() {
        const shoeStore = useShoeStore();
        const { shoes, loading, error, fetchShoes } = shoeStore;
        // Filters state
        const searchQuery = ref('');
        const sortOption = ref('default');
        const selectedBrands = ref([]);
        const selectedCategories = ref([]);
        const priceRange = ref({
            min: null,
            max: null
        });
        // Derived data
        const brands = computed(() => {
            const uniqueBrands = new Set();
            shoes.forEach(shoe => uniqueBrands.add(shoe.brand));
            return Array.from(uniqueBrands).sort();
        });
        const categories = computed(() => [
            { label: 'Thể thao', value: 'the-thao' },
            { label: 'Thời trang', value: 'thoi-trang' },
            { label: 'Cao cấp', value: 'cao-cap' }
        ]);
        // Filter functionality
        const filteredShoes = ref([]);
        const filterShoes = () => {
            filteredShoes.value = shoes.filter((shoe) => {
                // Tìm kiếm theo tên
                const nameMatch = !searchQuery.value ||
                    shoe.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                    shoe.brand.toLowerCase().includes(searchQuery.value.toLowerCase());
                // Lọc theo thương hiệu
                const brandMatch = selectedBrands.value.length === 0 ||
                    selectedBrands.value.includes(shoe.brand);
                // Lọc theo danh mục
                const categoryMatch = selectedCategories.value.length === 0 ||
                    selectedCategories.value.includes(shoe.category);
                // Lọc theo giá
                const priceMatch = (!priceRange.value.min || shoe.price >= priceRange.value.min) &&
                    (!priceRange.value.max || shoe.price <= priceRange.value.max);
                return nameMatch && brandMatch && categoryMatch && priceMatch;
            });
            // Sắp xếp
            sortFilteredShoes();
        };
        const sortFilteredShoes = () => {
            switch (sortOption.value) {
                case 'price-asc':
                    filteredShoes.value.sort((a, b) => getDiscountedPrice(a) - getDiscountedPrice(b));
                    break;
                case 'price-desc':
                    filteredShoes.value.sort((a, b) => getDiscountedPrice(b) - getDiscountedPrice(a));
                    break;
                case 'name-asc':
                    filteredShoes.value.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    filteredShoes.value.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'rating-desc':
                    filteredShoes.value.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                    break;
                default:
                    // Mặc định không sắp xếp
                    break;
            }
        };
        const clearFilters = () => {
            searchQuery.value = '';
            sortOption.value = 'default';
            selectedBrands.value = [];
            selectedCategories.value = [];
            priceRange.value = {
                min: null,
                max: null
            };
            filterShoes();
        };
        // Helpers
        const getDiscountedPrice = (shoe) => {
            if (shoe.discount) {
                return Math.round(shoe.price * (1 - shoe.discount / 100));
            }
            return shoe.price;
        };
        const formatPrice = (price) => {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        };
        // Load data
        const loadShoes = async () => {
            await fetchShoes();
            filterShoes();
        };
        onMounted(() => {
            loadShoes();
        });
        return {
            shoes,
            loading,
            error,
            searchQuery,
            sortOption,
            selectedBrands,
            selectedCategories,
            priceRange,
            brands,
            categories,
            filteredShoes,
            filterShoes,
            clearFilters,
            getDiscountedPrice,
            formatPrice,
            loadShoes
        };
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['search-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-section']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-options']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-option']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-option']} */ ;
/** @type {__VLS_StyleScopedClasses['price-inputs']} */ ;
/** @type {__VLS_StyleScopedClasses['clear-filters-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-card']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-card']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-img']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-card']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-img']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['shoes-content']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-sidebar']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "shoes-list-view" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "shoes-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filter-options" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "search-bar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onInput: (__VLS_ctx.filterShoes) },
    type: "text",
    value: (__VLS_ctx.searchQuery),
    placeholder: "Tìm kiếm sản phẩm...",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "sort-options" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (__VLS_ctx.filterShoes) },
    value: (__VLS_ctx.sortOption),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "default",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "price-asc",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "price-desc",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "name-asc",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "name-desc",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "rating-desc",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "shoes-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.aside, __VLS_intrinsicElements.aside)({
    ...{ class: "filter-sidebar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filter-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filter-options" },
});
for (const [brand] of __VLS_getVForSourceType((__VLS_ctx.brands))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (brand),
        ...{ class: "filter-option" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onChange: (__VLS_ctx.filterShoes) },
        type: "checkbox",
        id: (brand),
        value: (brand),
    });
    (__VLS_ctx.selectedBrands);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: (brand),
    });
    (brand);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filter-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filter-options" },
});
for (const [category] of __VLS_getVForSourceType((__VLS_ctx.categories))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (category.value),
        ...{ class: "filter-option" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onChange: (__VLS_ctx.filterShoes) },
        type: "checkbox",
        id: (category.value),
        value: (category.value),
    });
    (__VLS_ctx.selectedCategories);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: (category.value),
    });
    (category.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filter-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "price-range" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "price-inputs" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onChange: (__VLS_ctx.filterShoes) },
    type: "number",
    placeholder: "Từ",
});
(__VLS_ctx.priceRange.min);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onChange: (__VLS_ctx.filterShoes) },
    type: "number",
    placeholder: "Đến",
});
(__VLS_ctx.priceRange.max);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.clearFilters) },
    ...{ class: "clear-filters-btn" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "shoes-grid" },
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
        ...{ onClick: (__VLS_ctx.loadShoes) },
    });
}
else if (__VLS_ctx.filteredShoes.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "empty-state" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
else {
    for (const [shoe] of __VLS_getVForSourceType((__VLS_ctx.filteredShoes))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (shoe.id),
            ...{ class: "shoe-card" },
        });
        const __VLS_0 = {}.RouterLink;
        /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            to: (`/shoe/${shoe.id}`),
        }));
        const __VLS_2 = __VLS_1({
            to: (`/shoe/${shoe.id}`),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        __VLS_3.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "shoe-img" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
            src: (shoe.imageUrl),
            alt: (shoe.name),
        });
        if (shoe.discount) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "discount-tag" },
            });
            (shoe.discount);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "shoe-info" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: "shoe-name" },
        });
        (shoe.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "shoe-brand" },
        });
        (shoe.brand);
        if (shoe.rating) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "shoe-rating" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "stars" },
            });
            for (const [i] of __VLS_getVForSourceType((5))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    key: (i),
                    ...{ class: (['star', { 'filled': i <= Math.floor(shoe.rating) }]) },
                });
            }
            if (shoe.reviews) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "rating-count" },
                });
                (shoe.reviews);
            }
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "shoe-price" },
        });
        if (shoe.discount) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "original-price" },
            });
            (__VLS_ctx.formatPrice(shoe.price));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "current-price" },
        });
        (__VLS_ctx.formatPrice(__VLS_ctx.getDiscountedPrice(shoe)));
        var __VLS_3;
    }
}
/** @type {__VLS_StyleScopedClasses['shoes-list-view']} */ ;
/** @type {__VLS_StyleScopedClasses['shoes-header']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-options']} */ ;
/** @type {__VLS_StyleScopedClasses['search-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['sort-options']} */ ;
/** @type {__VLS_StyleScopedClasses['shoes-content']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-section']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-options']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-option']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-section']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-options']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-option']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-section']} */ ;
/** @type {__VLS_StyleScopedClasses['price-range']} */ ;
/** @type {__VLS_StyleScopedClasses['price-inputs']} */ ;
/** @type {__VLS_StyleScopedClasses['clear-filters-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['shoes-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-card']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-img']} */ ;
/** @type {__VLS_StyleScopedClasses['discount-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-info']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-name']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-brand']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-rating']} */ ;
/** @type {__VLS_StyleScopedClasses['stars']} */ ;
/** @type {__VLS_StyleScopedClasses['star']} */ ;
/** @type {__VLS_StyleScopedClasses['filled']} */ ;
/** @type {__VLS_StyleScopedClasses['rating-count']} */ ;
/** @type {__VLS_StyleScopedClasses['shoe-price']} */ ;
/** @type {__VLS_StyleScopedClasses['original-price']} */ ;
/** @type {__VLS_StyleScopedClasses['current-price']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=ShoesListView.vue.js.map