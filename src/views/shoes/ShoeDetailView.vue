<template>
  <div class="shoe-detail-view">
    <div v-if="loading" class="loading-state">
      <p>Đang tải thông tin sản phẩm...</p>
    </div>
    
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="fetchShoe" class="btn-primary">Thử lại</button>
      <router-link to="/shoes" class="btn-outline">Quay lại danh sách</router-link>
    </div>
    
    <div v-else-if="!selectedShoe" class="error-state">
      <p>Không tìm thấy sản phẩm</p>
      <router-link to="/shoes" class="btn-outline">Quay lại danh sách</router-link>
    </div>
    
    <div v-else class="shoe-detail-container">
      <div class="shoe-images">
        <div class="main-image">
          <img :src="currentImage" :alt="selectedShoe.name" />
          <div v-if="selectedShoe.discount" class="discount-tag">-{{ selectedShoe.discount }}%</div>
        </div>
        <div class="image-gallery">
          <div 
            v-for="(image, index) in allImages" 
            :key="index" 
            class="thumbnail"
            :class="{ active: currentImage === image }"
            @click="currentImage = image"
          >
            <img :src="image" :alt="`${selectedShoe.name} - Ảnh ${index + 1}`" />
          </div>
        </div>
      </div>
      
      <div class="shoe-info">
        <div class="breadcrumbs">
          <router-link to="/">Trang chủ</router-link> &gt;
          <router-link to="/shoes">Sản phẩm</router-link> &gt;
          <span>{{ selectedShoe.name }}</span>
        </div>
        
        <h1 class="shoe-name">{{ selectedShoe.name }}</h1>
        <p class="shoe-brand">Thương hiệu: <strong>{{ selectedShoe.brand }}</strong></p>
        
        <div class="shoe-rating" v-if="selectedShoe.rating">
          <span class="stars">
            <span 
              v-for="i in 5" 
              :key="i" 
              :class="['star', { 'filled': i <= Math.floor(selectedShoe.rating) }]"
            >★</span>
          </span>
          <span class="rating-text">
            {{ selectedShoe.rating.toFixed(1) }}
            <span v-if="selectedShoe.reviews">({{ selectedShoe.reviews }} đánh giá)</span>
          </span>
        </div>
        
        <div class="shoe-price">
          <span v-if="selectedShoe.discount" class="original-price">{{ formatPrice(selectedShoe.price) }}đ</span>
          <span class="current-price">{{ formatPrice(discountedPrice) }}đ</span>
          <span v-if="selectedShoe.discount" class="discount-percentage">-{{ selectedShoe.discount }}%</span>
        </div>
        
        <div class="shoe-description">
          <h3>Mô tả sản phẩm</h3>
          <p>{{ selectedShoe.description }}</p>
        </div>
        
        <div class="shoe-options">
          <div class="size-options">
            <h3>Kích cỡ</h3>
            <div class="option-list">
              <button 
                v-for="size in selectedShoe.sizes" 
                :key="size"
                :class="['size-option', { active: size === selectedSize }]"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
            <p v-if="!selectedSize" class="option-error">Vui lòng chọn kích cỡ</p>
          </div>
          
          <div class="color-options">
            <h3>Màu sắc</h3>
            <div class="option-list">
              <button 
                v-for="color in selectedShoe.colors" 
                :key="color"
                :class="['color-option', { active: color === selectedColor }]"
                @click="selectedColor = color"
              >
                {{ color }}
              </button>
            </div>
            <p v-if="!selectedColor" class="option-error">Vui lòng chọn màu sắc</p>
          </div>
          
          <div class="quantity-selector">
            <h3>Số lượng</h3>
            <div class="quantity-control">
              <button 
                class="quantity-btn" 
                @click="decreaseQuantity"
                :disabled="quantity <= 1"
              >-</button>
              <input 
                type="number" 
                v-model.number="quantity" 
                min="1" 
                max="10"
              />
              <button 
                class="quantity-btn" 
                @click="increaseQuantity"
                :disabled="quantity >= 10"
              >+</button>
            </div>
          </div>
        </div>
        
        <div class="shoe-actions">
          <button 
            class="btn-primary add-to-cart" 
            @click="addToCart"
            :disabled="!canAddToCart"
          >
            <span class="material-icons">shopping_cart</span>
            Thêm vào giỏ hàng
          </button>
          
          <router-link to="/checkout" class="btn-outline buy-now" @click="buyNow">
            Mua ngay
          </router-link>
        </div>
        
        <div class="additional-info">
          <div class="info-item">
            <span class="material-icons">local_shipping</span>
            <span>Miễn phí vận chuyển cho đơn hàng từ 500.000đ</span>
          </div>
          <div class="info-item">
            <span class="material-icons">verified</span>
            <span>Bảo hành chính hãng 12 tháng</span>
          </div>
          <div class="info-item">
            <span class="material-icons">replay</span>
            <span>Đổi trả trong vòng 30 ngày nếu có lỗi từ nhà sản xuất</span>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="selectedShoe" class="related-products">
      <h2 class="section-title">Sản phẩm liên quan</h2>
      <div class="product-slider">
        <div 
          v-for="product in relatedProducts" 
          :key="product.id" 
          class="product-card"
        >
          <router-link :to="`/shoe/${product.id}`">
            <div class="product-img">
              <img :src="product.imageUrl" :alt="product.name">
              <div v-if="product.discount" class="discount-tag">-{{ product.discount }}%</div>
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="product-brand">{{ product.brand }}</p>
              <div class="product-price">
                <span v-if="product.discount" class="original-price">{{ formatPrice(product.price) }}đ</span>
                <span class="current-price">{{ formatPrice(getDiscountedPrice(product)) }}đ</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useShoeStore, Shoe } from '@/stores/shoe';
import { useCartStore } from '@/stores/cart';

export default defineComponent({
  name: 'ShoeDetailView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const shoeStore = useShoeStore();
    const cartStore = useCartStore();
    
    const selectedSize = ref<number | null>(null);
    const selectedColor = ref<string | null>(null);
    const quantity = ref(1);
    const loading = ref(false);
    const error = ref<string | null>(null);
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
      if (!selectedShoe.value) return 0;
      
      if (selectedShoe.value.discount) {
        return Math.round(selectedShoe.value.price * (1 - selectedShoe.value.discount / 100));
      }
      return selectedShoe.value.price;
    });
    
    const allImages = computed(() => {
      if (!selectedShoe.value) return [];
      
      // Kết hợp ảnh chính và gallery
      return [selectedShoe.value.imageUrl, ...(selectedShoe.value.gallery || [])];
    });
    
    const canAddToCart = computed(() => {
      return selectedShoe.value && selectedSize.value !== null && selectedColor.value !== null;
    });
    
    // Sản phẩm liên quan (cùng thương hiệu hoặc danh mục)
    const relatedProducts = computed(() => {
      if (!selectedShoe.value) return [];
      
      return shoeStore.shoes
        .filter((shoe: Shoe) => 
          shoe.id !== selectedShoe.value?.id && 
          (shoe.brand === selectedShoe.value?.brand || 
          shoe.category === selectedShoe.value?.category)
        )
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
        
      } catch (err) {
        console.error('Error fetching shoe details:', err);
        error.value = 'Có lỗi xảy ra khi tải thông tin sản phẩm. Vui lòng thử lại sau.';
      } finally {
        loading.value = false;
      }
    };
    
    // Các phương thức hỗ trợ
    const formatPrice = (price: number): string => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    
    const getDiscountedPrice = (shoe: Shoe): number => {
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
      
      cartStore.addToCart(
        selectedShoe.value,
        quantity.value,
        selectedSize.value,
        selectedColor.value
      );
      
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
</script>

<style scoped>
.shoe-detail-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.shoe-detail-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
}

/* Images Section */
.shoe-images {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.main-image {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.discount-tag {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #ff3366;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}

.image-gallery {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 5px;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  flex-shrink: 0;
}

.thumbnail.active {
  border-color: #f63;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Info Section */
.shoe-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.breadcrumbs {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 10px;
}

.breadcrumbs a {
  color: #777;
  text-decoration: none;
}

.breadcrumbs a:hover {
  color: #f63;
}

.shoe-name {
  font-size: 1.8rem;
  margin: 0;
  color: #333;
}

.shoe-brand {
  margin: 0;
  color: #666;
}

/* Ratings */
.shoe-rating {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stars {
  color: #ccc;
  font-size: 1.2rem;
}

.star.filled {
  color: #ffc107;
}

.rating-text {
  color: #666;
}

/* Price */
.shoe-price {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 5px 0;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 1rem;
}

.current-price {
  color: #f63;
  font-size: 1.5rem;
  font-weight: 600;
}

.discount-percentage {
  background-color: #f63;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

/* Description */
.shoe-description {
  margin: 15px 0;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.shoe-description h3 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
}

.shoe-description p {
  margin: 0;
  color: #555;
  line-height: 1.6;
}

/* Options */
.shoe-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.shoe-options h3 {
  margin: 0 0 10px 0;
  font-size: 1rem;
}

.option-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.size-option {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.size-option:hover {
  border-color: #f63;
}

.size-option.active {
  background-color: #f63;
  color: white;
  border-color: #f63;
}

.color-option {
  min-width: 60px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-option:hover {
  border-color: #f63;
}

.color-option.active {
  background-color: #f63;
  color: white;
  border-color: #f63;
}

.option-error {
  color: #f44336;
  font-size: 0.85rem;
  margin: 5px 0 0 0;
}

/* Quantity Control */
.quantity-control {
  display: flex;
  align-items: center;
  width: fit-content;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  user-select: none;
}

.quantity-btn:first-child {
  border-radius: 5px 0 0 5px;
}

.quantity-btn:last-child {
  border-radius: 0 5px 5px 0;
}

.quantity-control input {
  width: 50px;
  height: 40px;
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
  text-align: center;
  font-size: 1rem;
}

.quantity-control input::-webkit-inner-spin-button,
.quantity-control input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Action Buttons */
.shoe-actions {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.btn-primary,
.btn-outline {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
}

.btn-primary {
  background-color: #f63;
  color: white;
}

.btn-primary:hover {
  background-color: #e62;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-outline {
  border: 2px solid #f63;
  color: #f63;
  background-color: transparent;
}

.btn-outline:hover {
  background-color: #f63;
  color: white;
}

/* Additional Info */
.additional-info {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #666;
}

.info-item .material-icons {
  color: #f63;
}

/* Related Products */
.related-products {
  margin-top: 60px;
}

.section-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.8rem;
  position: relative;
  padding-bottom: 15px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: #f63;
}

.product-slider {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-card a {
  text-decoration: none;
  color: inherit;
}

.product-img {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-img img {
  transform: scale(1.05);
}

.product-info {
  padding: 15px;
}

.product-info h3 {
  margin: 0 0 5px 0;
  font-size: 1rem;
}

.product-brand {
  color: #777;
  margin: 0 0 10px 0;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Status States */
.loading-state,
.error-state {
  text-align: center;
  padding: 60px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
}

.error-state .btn-primary,
.error-state .btn-outline {
  display: inline-block;
  margin: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .shoe-detail-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .shoe-actions {
    flex-direction: column;
  }
}
</style>