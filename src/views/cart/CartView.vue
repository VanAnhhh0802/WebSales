<template>
  <div class="cart-view">
    <div class="cart-header">
      <h1 class="page-title">Giỏ hàng của bạn</h1>
    </div>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <div class="empty-cart-content">
        <span class="material-icons">shopping_cart</span>
        <h2>Giỏ hàng trống</h2>
        <p>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
        <router-link to="/shoes" class="btn-primary">Tiếp tục mua sắm</router-link>
      </div>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div class="cart-item" v-for="item in cartItems" :key="item.id">
          <div class="item-image">
            <img :src="item.imageUrl" :alt="item.name">
          </div>
          
          <div class="item-details">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-options">
              <span class="item-size">Size: {{ item.size }}</span>
              <span class="item-color">Màu: {{ item.color }}</span>
            </p>
            <p class="item-price">
              <span v-if="item.discount" class="original-price">{{ formatPrice(item.price) }}đ</span>
              <span class="current-price">{{ formatPrice(getItemPrice(item)) }}đ</span>
            </p>
          </div>
          
          <div class="item-quantity">
            <div class="quantity-control">
              <button 
                class="quantity-btn" 
                @click="updateQuantity(item.id, item.quantity - 1)" 
                :disabled="item.quantity <= 1"
              >-</button>
              <input 
                type="number" 
                :value="item.quantity" 
                min="1" 
                max="10"
                @change="(e: Event) => updateQuantity(item.id, parseInt((e.target as HTMLInputElement).value, 10))"
              />
              <button 
                class="quantity-btn" 
                @click="updateQuantity(item.id, item.quantity + 1)"
                :disabled="item.quantity >= 10"
              >+</button>
            </div>
          </div>
          
          <div class="item-subtotal">
            <span class="subtotal-label">Thành tiền:</span>
            <span class="subtotal-value">{{ formatPrice(getItemSubtotal(item)) }}đ</span>
          </div>
          
          <div class="item-actions">
            <button class="remove-item" @click="removeItem(item.id)">
              <span class="material-icons">delete</span>
            </button>
          </div>
        </div>
      </div>
      
      <div class="cart-summary">
        <h2>Tổng giỏ hàng</h2>
        
        <div class="summary-row">
          <span>Tạm tính</span>
          <span>{{ formatPrice(cartTotal) }}đ</span>
        </div>
        
        <div class="summary-row">
          <span>Phí vận chuyển</span>
          <span>{{ formatPrice(shippingFee) }}đ</span>
        </div>
        
        <div class="summary-discount" v-if="discount > 0">
          <span>Giảm giá</span>
          <span>-{{ formatPrice(discount) }}đ</span>
        </div>
        
        <div class="summary-row total">
          <span>Tổng cộng</span>
          <span>{{ formatPrice(orderTotal) }}đ</span>
        </div>
        
        <div class="coupon-form">
          <input type="text" v-model="couponCode" placeholder="Nhập mã giảm giá">
          <button class="btn-outline" @click="applyCoupon">Áp dụng</button>
        </div>
        
        <div class="cart-actions">
          <router-link to="/checkout" class="btn-primary">Tiến hành thanh toán</router-link>
          <router-link to="/shoes" class="btn-outline">Tiếp tục mua sắm</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useCartStore, CartItem } from '@/stores/cart';

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
    const getItemPrice = (item: CartItem): number => {
      if (item.discount) {
        return Math.round(item.price * (1 - item.discount / 100));
      }
      return item.price;
    };
    
    // Tính thành tiền của một item (số lượng * giá sau giảm giá)
    const getItemSubtotal = (item: CartItem): number => {
      return getItemPrice(item) * item.quantity;
    };
    
    // Cập nhật số lượng sản phẩm
    const updateQuantity = (itemId: number, quantity: number) => {
      if (quantity > 0 && quantity <= 10) {
        cartStore.updateCartItem(itemId, quantity);
      }
    };
    
    // Xóa sản phẩm khỏi giỏ hàng
    const removeItem = (itemId: number) => {
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
      } else if (couponCode.value.toUpperCase() === 'FREESHIP') {
        // Miễn phí vận chuyển
        shippingFee.value = 0;
        alert('Áp dụng mã miễn phí vận chuyển thành công!');
      } else {
        alert('Mã giảm giá không hợp lệ hoặc đã hết hạn');
        discount.value = 0;
      }
    };
    
    // Định dạng giá tiền
    const formatPrice = (price: number): string => {
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
</script>

<style scoped>
.cart-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.cart-header {
  margin-bottom: 30px;
}

.page-title {
  font-size: 2rem;
  color: #333;
  margin: 0 0 10px 0;
}

/* Empty Cart */
.empty-cart {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 40px 20px;
  text-align: center;
}

.empty-cart-content {
  max-width: 500px;
  margin: 0 auto;
}

.empty-cart .material-icons {
  font-size: 5rem;
  color: #ddd;
  margin-bottom: 20px;
}

.empty-cart h2 {
  margin: 0 0 10px 0;
  color: #333;
}

.empty-cart p {
  color: #666;
  margin: 0 0 30px 0;
}

/* Cart Layout */
.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
}

/* Cart Items */
.cart-items {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 2fr 1fr 1fr auto;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.item-name {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
}

.item-options {
  display: flex;
  gap: 15px;
  margin: 5px 0;
  color: #666;
  font-size: 0.9rem;
}

.item-price {
  margin: 5px 0 0 0;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.9rem;
  margin-right: 8px;
}

.current-price {
  color: #f63;
  font-weight: 600;
}

/* Quantity Control */
.quantity-control {
  display: flex;
  align-items: center;
  width: fit-content;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}

.quantity-btn:first-child {
  border-radius: 3px 0 0 3px;
}

.quantity-btn:last-child {
  border-radius: 0 3px 3px 0;
}

.quantity-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.quantity-control input {
  width: 40px;
  height: 30px;
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
  text-align: center;
  font-size: 0.9rem;
}

.quantity-control input::-webkit-inner-spin-button,
.quantity-control input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Item Subtotal */
.item-subtotal {
  text-align: right;
}

.subtotal-label {
  display: block;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 5px;
}

.subtotal-value {
  font-weight: 600;
  color: #333;
}

/* Item Actions */
.item-actions {
  display: flex;
  justify-content: flex-end;
}

.remove-item {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  transition: color 0.2s ease;
}

.remove-item:hover {
  color: #f44336;
}

/* Cart Summary */
.cart-summary {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
  height: fit-content;
}

.cart-summary h2 {
  margin: 0 0 20px 0;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  font-size: 1.3rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #555;
}

.summary-discount {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #4caf50;
}

.summary-row.total {
  padding-top: 15px;
  border-top: 1px dashed #eee;
  margin-top: 10px;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.coupon-form {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.coupon-form input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem;
}

.cart-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.btn-primary,
.btn-outline {
  display: inline-block;
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #f63;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #e62;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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

/* Responsive */
@media (max-width: 992px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-item {
    grid-template-columns: 80px 1fr;
  }
  
  .item-quantity,
  .item-subtotal {
    grid-column: 2;
  }
  
  .item-actions {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}

@media (max-width: 576px) {
  .cart-item {
    position: relative;
    padding-top: 40px;
  }
}
</style>