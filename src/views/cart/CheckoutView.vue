<template>
  <div class="checkout-view">
    <div class="checkout-header">
      <h1 class="page-title">Thanh toán</h1>
    </div>

    <div v-if="cartItems.length === 0" class="empty-checkout">
      <div class="empty-checkout-content">
        <span class="material-icons">shopping_cart</span>
        <h2>Giỏ hàng trống</h2>
        <p>Bạn cần có sản phẩm trong giỏ hàng để tiến hành thanh toán.</p>
        <router-link to="/shoes" class="btn-primary">Tiếp tục mua sắm</router-link>
      </div>
    </div>

    <div v-else class="checkout-content">
      <div class="checkout-form">
        <div class="shipping-info">
          <h2>Thông tin giao hàng</h2>
          
          <div class="form-row">
            <div class="form-group">
              <label for="fullName">Họ tên <span class="required">*</span></label>
              <input 
                type="text" 
                id="fullName" 
                v-model="shippingInfo.fullName" 
                required
                :class="{ 'error': validationErrors.fullName }"
              >
              <p v-if="validationErrors.fullName" class="error-message">{{ validationErrors.fullName }}</p>
            </div>
          </div>
          
          <div class="form-row two-columns">
            <div class="form-group">
              <label for="phone">Số điện thoại <span class="required">*</span></label>
              <input 
                type="tel" 
                id="phone" 
                v-model="shippingInfo.phone" 
                required
                :class="{ 'error': validationErrors.phone }"
              >
              <p v-if="validationErrors.phone" class="error-message">{{ validationErrors.phone }}</p>
            </div>
            
            <div class="form-group">
              <label for="email">Email <span class="required">*</span></label>
              <input 
                type="email" 
                id="email" 
                v-model="shippingInfo.email" 
                required
                :class="{ 'error': validationErrors.email }"
              >
              <p v-if="validationErrors.email" class="error-message">{{ validationErrors.email }}</p>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="address">Địa chỉ <span class="required">*</span></label>
              <input 
                type="text" 
                id="address" 
                v-model="shippingInfo.address" 
                required
                :class="{ 'error': validationErrors.address }"
              >
              <p v-if="validationErrors.address" class="error-message">{{ validationErrors.address }}</p>
            </div>
          </div>
          
          <div class="form-row three-columns">
            <div class="form-group">
              <label for="province">Tỉnh/Thành phố <span class="required">*</span></label>
              <select 
                id="province" 
                v-model="shippingInfo.province" 
                required
                :class="{ 'error': validationErrors.province }"
              >
                <option value="">Chọn Tỉnh/Thành phố</option>
                <option value="hanoi">Hà Nội</option>
                <option value="hochiminh">TP. Hồ Chí Minh</option>
                <option value="danang">Đà Nẵng</option>
                <option value="other">Tỉnh/Thành phố khác</option>
              </select>
              <p v-if="validationErrors.province" class="error-message">{{ validationErrors.province }}</p>
            </div>
            
            <div class="form-group">
              <label for="district">Quận/Huyện <span class="required">*</span></label>
              <select 
                id="district" 
                v-model="shippingInfo.district" 
                required
                :class="{ 'error': validationErrors.district }"
              >
                <option value="">Chọn Quận/Huyện</option>
                <option value="district1">Quận/Huyện 1</option>
                <option value="district2">Quận/Huyện 2</option>
                <option value="district3">Quận/Huyện 3</option>
              </select>
              <p v-if="validationErrors.district" class="error-message">{{ validationErrors.district }}</p>
            </div>
            
            <div class="form-group">
              <label for="ward">Phường/Xã <span class="required">*</span></label>
              <select 
                id="ward" 
                v-model="shippingInfo.ward" 
                required
                :class="{ 'error': validationErrors.ward }"
              >
                <option value="">Chọn Phường/Xã</option>
                <option value="ward1">Phường/Xã 1</option>
                <option value="ward2">Phường/Xã 2</option>
                <option value="ward3">Phường/Xã 3</option>
              </select>
              <p v-if="validationErrors.ward" class="error-message">{{ validationErrors.ward }}</p>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="note">Ghi chú</label>
              <textarea 
                id="note" 
                v-model="shippingInfo.note" 
                rows="3"
                placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay địa điểm giao hàng chi tiết hơn."
              ></textarea>
            </div>
          </div>
        </div>
        
        <div class="payment-methods">
          <h2>Phương thức thanh toán</h2>
          
          <div class="payment-method-list">
            <div class="payment-method" :class="{ 'active': paymentMethod === 'cod' }">
              <div class="payment-method-selector">
                <input 
                  type="radio" 
                  id="cod" 
                  value="cod" 
                  v-model="paymentMethod"
                >
                <label for="cod">Thanh toán khi nhận hàng (COD)</label>
              </div>
              <div class="payment-method-icon">
                <span class="material-icons">local_shipping</span>
              </div>
            </div>
            
            <div class="payment-method" :class="{ 'active': paymentMethod === 'bank' }">
              <div class="payment-method-selector">
                <input 
                  type="radio" 
                  id="bank" 
                  value="bank" 
                  v-model="paymentMethod"
                >
                <label for="bank">Chuyển khoản ngân hàng</label>
              </div>
              <div class="payment-method-icon">
                <span class="material-icons">account_balance</span>
              </div>
            </div>
            
            <div class="payment-method" :class="{ 'active': paymentMethod === 'card' }">
              <div class="payment-method-selector">
                <input 
                  type="radio" 
                  id="card" 
                  value="card" 
                  v-model="paymentMethod"
                >
                <label for="card">Thẻ tín dụng/ghi nợ</label>
              </div>
              <div class="payment-method-icon">
                <span class="material-icons">credit_card</span>
              </div>
            </div>
          </div>
          
          <div v-if="paymentMethod === 'bank'" class="payment-method-details">
            <div class="bank-info">
              <p><strong>Thông tin chuyển khoản:</strong></p>
              <p>Ngân hàng: Vietcombank</p>
              <p>Chủ tài khoản: SHOES STORE</p>
              <p>Số tài khoản: 1234567890</p>
              <p>Nội dung: Thanh toán đơn hàng #{{ generateOrderNumber() }}</p>
            </div>
          </div>
          
          <div v-if="paymentMethod === 'card'" class="payment-method-details">
            <div class="credit-card-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="cardName">Tên chủ thẻ <span class="required">*</span></label>
                  <input type="text" id="cardName" v-model="cardInfo.name">
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="cardNumber">Số thẻ <span class="required">*</span></label>
                  <input type="text" id="cardNumber" v-model="cardInfo.number" placeholder="XXXX XXXX XXXX XXXX">
                </div>
              </div>
              
              <div class="form-row two-columns">
                <div class="form-group">
                  <label for="cardExpiry">Ngày hết hạn <span class="required">*</span></label>
                  <input type="text" id="cardExpiry" v-model="cardInfo.expiry" placeholder="MM/YY">
                </div>
                
                <div class="form-group">
                  <label for="cardCvv">Mã CVV <span class="required">*</span></label>
                  <input type="text" id="cardCvv" v-model="cardInfo.cvv" placeholder="123">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="order-summary">
        <h2>Tóm tắt đơn hàng</h2>
        
        <div class="order-items">
          <div class="order-item" v-for="item in cartItems" :key="item.id">
            <div class="item-image">
              <img :src="item.imageUrl" :alt="item.name">
              <span class="item-quantity">{{ item.quantity }}</span>
            </div>
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p class="item-options">
                Size: {{ item.size }}, Màu: {{ item.color }}
              </p>
            </div>
            <div class="item-price">
              {{ formatPrice(getItemSubtotal(item)) }}đ
            </div>
          </div>
        </div>
        
        <div class="coupon-form">
          <input type="text" v-model="couponCode" placeholder="Nhập mã giảm giá">
          <button class="btn-outline" @click="applyCoupon">Áp dụng</button>
        </div>
        
        <div class="summary-totals">
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
        </div>
        
        <div class="checkout-actions">
          <button class="btn-primary place-order" @click="placeOrder">
            Đặt hàng
          </button>
          <router-link to="/cart" class="btn-outline">Quay lại giỏ hàng</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore, CartItem } from '@/stores/cart';

interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  note: string;
}

interface CardInfo {
  name: string;
  number: string;
  expiry: string;
  cvv: string;
}

interface ValidationErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  province?: string;
  district?: string;
  ward?: string;
}

export default defineComponent({
  name: 'CheckoutView',
  setup() {
    const router = useRouter();
    const cartStore = useCartStore();
    
    // Thông tin giao hàng
    const shippingInfo = reactive<ShippingInfo>({
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
    const cardInfo = reactive<CardInfo>({
      name: '',
      number: '',
      expiry: '',
      cvv: ''
    });
    
    // Phương thức thanh toán
    const paymentMethod = ref<string>('cod');
    
    // Mã giảm giá
    const couponCode = ref<string>('');
    const discount = ref<number>(0);
    const shippingFee = ref<number>(30000); // Phí vận chuyển mặc định
    
    // Lỗi validation
    const validationErrors = reactive<ValidationErrors>({});
    
    // Lấy thông tin giỏ hàng
    const cartItems = computed(() => cartStore.getCartItems.value);
    const cartTotal = computed(() => cartStore.getCartTotal.value);
    
    // Tính tổng đơn hàng
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
    
    // Tính thành tiền của một item
    const getItemSubtotal = (item: CartItem): number => {
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
      } else if (couponCode.value.toUpperCase() === 'FREESHIP') {
        // Miễn phí vận chuyển
        shippingFee.value = 0;
        alert('Áp dụng mã miễn phí vận chuyển thành công!');
      } else {
        alert('Mã giảm giá không hợp lệ hoặc đã hết hạn');
        discount.value = 0;
      }
    };
    
    // Kiểm tra form
    const validateForm = (): boolean => {
      // Reset lỗi
      Object.keys(validationErrors).forEach(key => {
        delete validationErrors[key as keyof ValidationErrors];
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
      } else if (!/^[0-9]{10}$/.test(shippingInfo.phone.trim())) {
        validationErrors.phone = 'Số điện thoại không hợp lệ';
        isValid = false;
      }
      
      // Kiểm tra email
      if (!shippingInfo.email.trim()) {
        validationErrors.email = 'Vui lòng nhập email';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email.trim())) {
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
    const generateOrderNumber = (): string => {
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
</script>

<style scoped>
.checkout-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.checkout-header {
  margin-bottom: 30px;
}

.page-title {
  font-size: 2rem;
  color: #333;
  margin: 0 0 10px 0;
}

/* Empty Checkout */
.empty-checkout {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 40px 20px;
  text-align: center;
}

.empty-checkout-content {
  max-width: 500px;
  margin: 0 auto;
}

.empty-checkout .material-icons {
  font-size: 5rem;
  color: #ddd;
  margin-bottom: 20px;
}

.empty-checkout h2 {
  margin: 0 0 10px 0;
  color: #333;
}

.empty-checkout p {
  color: #666;
  margin: 0 0 30px 0;
}

/* Checkout Layout */
.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
}

/* Form Styling */
.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.shipping-info,
.payment-methods {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

h2 {
  margin: 0 0 20px 0;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  font-size: 1.3rem;
}

.form-row {
  margin-bottom: 20px;
}

.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.three-columns {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  color: #555;
}

.required {
  color: #f63;
}

input,
select,
textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #f63;
}

input.error,
select.error {
  border-color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: 0.85rem;
  margin: 5px 0 0 0;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

/* Payment Methods */
.payment-method-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.payment-method {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.payment-method:hover {
  border-color: #f63;
}

.payment-method.active {
  border-color: #f63;
  background-color: #fff9f5;
}

.payment-method-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

.payment-method-icon .material-icons {
  font-size: 1.5rem;
  color: #666;
}

.payment-method.active .payment-method-icon .material-icons {
  color: #f63;
}

.payment-method-details {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.bank-info p {
  margin: 5px 0;
}

/* Order Summary */
.order-summary {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
  height: fit-content;
}

.order-items {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 5px;
}

.order-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.order-item:last-child {
  border-bottom: none;
}

.item-image {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 5px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-quantity {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  background-color: #f63;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

.item-details h3 {
  margin: 0 0 5px 0;
  font-size: 0.95rem;
  border: none;
  padding: 0;
}

.item-options {
  font-size: 0.85rem;
  color: #777;
  margin: 0;
}

.item-price {
  font-weight: 600;
}

/* Coupon Form */
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

/* Summary Totals */
.summary-totals {
  margin-top: 15px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #555;
}

.summary-discount {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
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

/* Checkout Actions */
.checkout-actions {
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
  cursor: pointer;
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
  .checkout-content {
    grid-template-columns: 1fr;
  }
  
  .three-columns,
  .two-columns {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}
</style>