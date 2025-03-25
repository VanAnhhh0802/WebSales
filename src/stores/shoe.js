import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
export const useShoeStore = defineStore('shoe', () => {
    const shoes = ref([
        {
            id: 1,
            name: 'Giày Thể Thao Air Max',
            brand: 'Nike',
            category: 'the-thao',
            price: 2500000,
            description: 'Giày thể thao Nike Air Max với đệm khí độc quyền, mang lại cảm giác êm ái và thoải mái khi di chuyển.',
            sizes: [39, 40, 41, 42, 43],
            colors: ['Đen', 'Trắng', 'Xanh'],
            imageUrl: 'https://placehold.co/500x500?text=Nike+Air+Max',
            gallery: [
                'https://placehold.co/500x500?text=Nike+Air+Max+1',
                'https://placehold.co/500x500?text=Nike+Air+Max+2',
                'https://placehold.co/500x500?text=Nike+Air+Max+3'
            ],
            inStock: true,
            discount: 10,
            rating: 4.5,
            reviews: 120
        },
        {
            id: 2,
            name: 'Giày Adidas Ultraboost',
            brand: 'Adidas',
            category: 'the-thao',
            price: 2800000,
            description: 'Giày thể thao Adidas Ultraboost với công nghệ đệm Boost tiên tiến, mang lại sự thoải mái và đàn hồi tuyệt vời.',
            sizes: [38, 39, 40, 41, 42, 43, 44],
            colors: ['Đen', 'Trắng', 'Xám'],
            imageUrl: 'https://placehold.co/500x500?text=Adidas+Ultraboost',
            gallery: [
                'https://placehold.co/500x500?text=Adidas+Ultraboost+1',
                'https://placehold.co/500x500?text=Adidas+Ultraboost+2',
                'https://placehold.co/500x500?text=Adidas+Ultraboost+3'
            ],
            inStock: true,
            rating: 4.7,
            reviews: 85
        },
        {
            id: 3,
            name: 'Giày Converse Classic',
            brand: 'Converse',
            category: 'thoi-trang',
            price: 1500000,
            description: 'Giày Converse Classic với thiết kế vượt thời gian, là biểu tượng thời trang đường phố.',
            sizes: [38, 39, 40, 41, 42, 43],
            colors: ['Đen', 'Trắng', 'Đỏ'],
            imageUrl: 'https://placehold.co/500x500?text=Converse+Classic',
            gallery: [
                'https://placehold.co/500x500?text=Converse+Classic+1',
                'https://placehold.co/500x500?text=Converse+Classic+2',
                'https://placehold.co/500x500?text=Converse+Classic+3'
            ],
            inStock: true,
            discount: 5,
            rating: 4.3,
            reviews: 210
        },
        {
            id: 4,
            name: 'Giày Vans Old Skool',
            brand: 'Vans',
            category: 'thoi-trang',
            price: 1800000,
            description: 'Giày Vans Old Skool với thiết kế mang tính biểu tượng và độ bền cao, thích hợp cho cả nam và nữ.',
            sizes: [38, 39, 40, 41, 42, 43],
            colors: ['Đen', 'Xanh Navy', 'Đỏ đô'],
            imageUrl: 'https://placehold.co/500x500?text=Vans+Old+Skool',
            gallery: [
                'https://placehold.co/500x500?text=Vans+Old+Skool+1',
                'https://placehold.co/500x500?text=Vans+Old+Skool+2',
                'https://placehold.co/500x500?text=Vans+Old+Skool+3'
            ],
            inStock: true,
            rating: 4.4,
            reviews: 175
        },
        {
            id: 5,
            name: 'Giày Balenciaga Triple S',
            brand: 'Balenciaga',
            category: 'cao-cap',
            price: 25000000,
            description: 'Giày Balenciaga Triple S với thiết kế độc đáo, đế giày cao và phong cách thời trang cao cấp.',
            sizes: [39, 40, 41, 42, 43, 44],
            colors: ['Đen', 'Trắng', 'Vàng'],
            imageUrl: 'https://placehold.co/500x500?text=Balenciaga+Triple+S',
            gallery: [
                'https://placehold.co/500x500?text=Balenciaga+Triple+S+1',
                'https://placehold.co/500x500?text=Balenciaga+Triple+S+2',
                'https://placehold.co/500x500?text=Balenciaga+Triple+S+3'
            ],
            inStock: true,
            rating: 4.8,
            reviews: 45
        },
        {
            id: 6,
            name: 'Giày Jordan 1 Retro High',
            brand: 'Nike',
            category: 'the-thao',
            price: 4500000,
            description: 'Giày Nike Air Jordan 1 Retro High với thiết kế biểu tượng, mang tính lịch sử trong làng thời trang thể thao.',
            sizes: [40, 41, 42, 43, 44, 45],
            colors: ['Đen/Đỏ', 'Xanh/Trắng', 'Đen/Trắng'],
            imageUrl: 'https://placehold.co/500x500?text=Jordan+1+Retro',
            gallery: [
                'https://placehold.co/500x500?text=Jordan+1+Retro+1',
                'https://placehold.co/500x500?text=Jordan+1+Retro+2',
                'https://placehold.co/500x500?text=Jordan+1+Retro+3'
            ],
            inStock: true,
            rating: 4.9,
            reviews: 320
        },
        {
            id: 7,
            name: 'Giày Puma RS-X',
            brand: 'Puma',
            category: 'the-thao',
            price: 2200000,
            description: 'Giày thể thao Puma RS-X với thiết kế chunky đầy phong cách và công nghệ Running System.',
            sizes: [39, 40, 41, 42, 43],
            colors: ['Trắng/Xanh', 'Đen/Đỏ', 'Xám/Vàng'],
            imageUrl: 'https://placehold.co/500x500?text=Puma+RS-X',
            gallery: [
                'https://placehold.co/500x500?text=Puma+RS-X+1',
                'https://placehold.co/500x500?text=Puma+RS-X+2',
                'https://placehold.co/500x500?text=Puma+RS-X+3'
            ],
            inStock: true,
            discount: 15,
            rating: 4.2,
            reviews: 95
        }
    ]);
    const loading = ref(false);
    const error = ref(null);
    // Getters
    const getAllShoes = computed(() => shoes.value);
    const getFeaturedShoes = computed(() => shoes.value.filter(shoe => shoe.discount || shoe.rating && shoe.rating >= 4.5).slice(0, 4));
    const getShoesByCategory = computed(() => (category) => shoes.value.filter(shoe => shoe.category === category));
    const getShoeById = computed(() => (id) => shoes.value.find(shoe => shoe.id === id));
    // Actions
    const fetchShoes = async () => {
        loading.value = true;
        error.value = null;
        try {
            // Trong ứng dụng thực tế, đây sẽ là lệnh gọi API
            // const response = await fetch('/api/shoes');
            // shoes.value = await response.json();
            // Mô phỏng độ trễ mạng
            await new Promise(resolve => setTimeout(resolve, 500));
            // Dữ liệu mẫu đã được cung cấp trong ref 'shoes'
        }
        catch (err) {
            error.value = 'Không thể tải dữ liệu giày. Vui lòng thử lại sau.';
            console.error('Error fetching shoes:', err);
        }
        finally {
            loading.value = false;
        }
    };
    return {
        shoes,
        loading,
        error,
        getAllShoes,
        getFeaturedShoes,
        getShoesByCategory,
        getShoeById,
        fetchShoes
    };
});
//# sourceMappingURL=shoe.js.map