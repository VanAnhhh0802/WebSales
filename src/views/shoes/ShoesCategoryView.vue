<template>
  <div class="shoes-category-view">
    <div class="category-header">
      <h1 class="page-title">{{ categoryTitle }}</h1>
      <div class="filter-options">
        <div class="search-bar">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Tìm kiếm sản phẩm..."
            @input="filterShoes"
          >
        </div>
        <div class="sort-options">
          <select v-model="sortOption" @change="filterShoes">
            <option value="default">Sắp xếp theo</option>
            <option value="price-asc">Giá: Thấp đến cao</option>
            <option value="price-desc">Giá: Cao đến thấp</option>
            <option value="name-asc">Tên: A-Z</option>
            <option value="name-desc">Tên: Z-A</option>
            <option value="rating-desc">Đánh giá cao nhất</option>
          </select>
        </div>
      </div>
    </div>

    <div class="shoes-content">
      <aside class="filter-sidebar">
        <h3>Bộ lọc</h3>
        
        <div class="filter-section">
          <h4>Thương hiệu</h4>
          <div class="filter-options">
            <div v-for="brand in brands" :key="brand" class="filter-option">
              <input 
                type="checkbox" 
                :id="brand" 
                :value="brand" 
                v-model="selectedBrands"
                @change="filterShoes"
              >
              <label :for="brand">{{ brand }}</label>
            </div>
          </div>
        </div>
        
        <div class="filter-section">
          <h4>Giá</h4>
          <div class="price-range">
            <div class="price-inputs">
              <input 
                type="number" 
                v-model.number="priceRange.min" 
                placeholder="Từ"
                @change="filterShoes"
              >
              <span>-</span>
              <input 
                type="number" 
                v-model.number="priceRange.max" 
                placeholder="Đến"
                @change="filterShoes"
              >
            </div>
          </div>
        </div>
        
        <button class="clear-filters-btn" @click="clearFilters">Xóa bộ lọc</button>
      </aside>
      
      <div class="shoes-grid">
        <div v-if="loading" class="loading-state">
          <p>Đang tải sản phẩm...</p>
        </div>
        
        <div v-else-if="error" class="error-state">
          <p>{{ error }}</p>
          <button @click="loadShoes">Thử lại</button>
        </div>
        
        <div v-else-if="filteredShoes.length === 0" class="empty-state">
          <p>Không tìm thấy sản phẩm phù hợp.</p>
        </div>
        
        <template v-else>
          <div 
            v-for="shoe in filteredShoes" 
            :key="shoe.id" 
            class="shoe-card"
          >
            <router-link :to="`/shoe/${shoe.id}`">
              <div class="shoe-img">
                <img :src="shoe.imageUrl" :alt="shoe.name">
                <div v-if="shoe.discount" class="discount-tag">-{{ shoe.discount }}%</div>
              </div>
              <div class="shoe-info">
                <h3 class="shoe-name">{{ shoe.name }}</h3>
                <p class="shoe-brand">{{ shoe.brand }}</p>
                <div class="shoe-rating" v-if="shoe.rating">
                  <span class="stars">
                    <span 
                      v-for="i in 5" 
                      :key="i" 
                      :class="['star', { 'filled': i <= Math.floor(shoe.rating) }]"
                    >★</span>
                  </span>
                  <span class="rating-count" v-if="shoe.reviews">({{ shoe.reviews }})</span>
                </div>
                <div class="shoe-price">
                  <span v-if="shoe.discount" class="original-price">{{ formatPrice(shoe.price) }}đ</span>
                  <span class="current-price">{{ formatPrice(getDiscountedPrice(shoe)) }}đ</span>
                </div>
              </div>
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useShoeStore, Shoe } from '@/stores/shoe';

interface PriceRange {
  min: number | null;
  max: number | null;
}

export default defineComponent({
  name: 'ShoesCategoryView',
  setup() {
    const route = useRoute();
    const shoeStore = useShoeStore();
    const { shoes, loading, error, fetchShoes } = shoeStore;
    
    // Lấy category từ URL
    const category = computed(() => {
      return route.params.category as string;
    });
    
    // Hiển thị tên danh mục đúng định dạng
    const categoryTitle = computed(() => {
      switch (category.value) {
        case 'nam':
          return 'Giày Nam';
        case 'nu':
          return 'Giày Nữ';
        case 'tre-em':
          return 'Giày Trẻ Em';
        case 'the-thao':
          return 'Giày Thể Thao';
        case 'thoi-trang':
          return 'Giày Thời Trang';
        case 'cao-cap':
          return 'Giày Cao Cấp';
        default:
          return 'Danh mục sản phẩm';
      }
    });
    
    // Filters state
    const searchQuery = ref('');
    const sortOption = ref('default');
    const selectedBrands = ref<string[]>([]);
    const priceRange = ref<PriceRange>({
      min: null,
      max: null
    });
    
    // Derived data
    const categoryShoes = computed(() => {
      if (category.value === 'nam' || category.value === 'nu' || category.value === 'tre-em') {
        // Đây là giả lập, trong ứng dụng thực tế sẽ cần phần backend để lọc theo giới tính
        return shoes;
      } else {
        // Lọc theo category
        return shoes.filter(shoe => shoe.category === category.value);
      }
    });
    
    const brands = computed(() => {
      const uniqueBrands = new Set<string>();
      categoryShoes.value.forEach((shoe: Shoe) => uniqueBrands.add(shoe.brand));
      return Array.from(uniqueBrands).sort();
    });
    
    // Filter functionality
    const filteredShoes = ref<Shoe[]>([]);
    
    const filterShoes = () => {
      filteredShoes.value = categoryShoes.value.filter((shoe: Shoe) => {
        // Tìm kiếm theo tên
        const nameMatch = !searchQuery.value || 
          shoe.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          shoe.brand.toLowerCase().includes(searchQuery.value.toLowerCase());
        
        // Lọc theo thương hiệu
        const brandMatch = selectedBrands.value.length === 0 || 
          selectedBrands.value.includes(shoe.brand);
        
        // Lọc theo giá
        const priceMatch = 
          (!priceRange.value.min || shoe.price >= priceRange.value.min) && 
          (!priceRange.value.max || shoe.price <= priceRange.value.max);
        
        return nameMatch && brandMatch && priceMatch;
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
      priceRange.value = {
        min: null,
        max: null
      };
      filterShoes();
    };
    
    // Helpers
    const getDiscountedPrice = (shoe: Shoe) => {
      if (shoe.discount) {
        return Math.round(shoe.price * (1 - shoe.discount / 100));
      }
      return shoe.price;
    };
    
    const formatPrice = (price: number): string => {
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
    
    // Theo dõi thay đổi category và cập nhật lại dữ liệu
    watch(category, () => {
      filterShoes();
    });
    
    return {
      category,
      categoryTitle,
      shoes,
      loading,
      error,
      searchQuery,
      sortOption,
      selectedBrands,
      priceRange,
      brands,
      filteredShoes,
      filterShoes,
      clearFilters,
      getDiscountedPrice,
      formatPrice,
      loadShoes
    };
  }
});
</script>

<style scoped>
.shoes-category-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.category-header {
  margin-bottom: 30px;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.search-bar {
  flex: 1;
  min-width: 250px;
}

.search-bar input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
}

.sort-options select {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
}

/* Shoes Content Layout */
.shoes-content {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 30px;
}

/* Filter Sidebar */
.filter-sidebar {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  height: fit-content;
}

.filter-sidebar h3 {
  margin-top: 0;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.filter-section {
  margin-bottom: 20px;
}

.filter-section h4 {
  margin: 0 0 10px 0;
  font-size: 1rem;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-option input[type="checkbox"] {
  cursor: pointer;
}

.filter-option label {
  cursor: pointer;
}

.price-range {
  margin-top: 10px;
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price-inputs input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.clear-filters-btn {
  width: 100%;
  padding: 10px;
  background-color: #f3f3f3;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-filters-btn:hover {
  background-color: #e5e5e5;
}

/* Shoes Grid */
.shoes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.shoe-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.shoe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.shoe-card a {
  text-decoration: none;
  color: inherit;
}

.shoe-img {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.shoe-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.shoe-card:hover .shoe-img img {
  transform: scale(1.05);
}

.discount-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff3366;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
}

.shoe-info {
  padding: 15px;
}

.shoe-name {
  margin: 0 0 5px 0;
  font-size: 1rem;
  font-weight: 600;
}

.shoe-brand {
  color: #777;
  margin: 0 0 8px 0;
  font-size: 0.9rem;
}

.shoe-rating {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 8px;
}

.stars {
  color: #ccc;
}

.star.filled {
  color: #ffc107;
}

.rating-count {
  color: #777;
  font-size: 0.85rem;
}

.shoe-price {
  display: flex;
  align-items: center;
  gap: 10px;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.9rem;
}

.current-price {
  color: #f63;
  font-weight: 600;
}

/* Status States */
.loading-state,
.error-state,
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 50px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.error-state button {
  margin-top: 15px;
  padding: 8px 20px;
  background-color: #f63;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .shoes-content {
    grid-template-columns: 1fr;
  }
  
  .filter-sidebar {
    margin-bottom: 20px;
  }
}
</style>