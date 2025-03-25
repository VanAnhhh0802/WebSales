<template>
  <div class="order-detail-view">
    <div class="order-header">
      <router-link to="/orders" class="back-link">
        <span class="material-icons">arrow_back</span>
        <span>Quay lại danh sách đơn hàng</span>
      </router-link>
      <h1 class="page-title">Chi tiết đơn hàng #{{ order?.orderNumber }}</h1>
    </div>
    
    <div v-if="!isAuthenticated" class="auth-required">
      <div class="auth-required-content">
        <span class="material-icons">shopping_bag</span>
        <h2>Yêu cầu đăng nhập</h2>
        <p>Bạn cần đăng nhập để xem chi tiết đơn hàng.</p>
        <div class="auth-buttons">
          <router-link to="/login" class="btn-primary">Đăng nhập</router-link>
          <router-link to="/register" class="btn-outline">Đăng ký</router-link>
        </div>
      </div>
    </div>
    
    <div v-else>
      <div v-if="loading" class="loading-state">
        <div class="loader"></div>
        <p>Đang tải thông tin đơn hàng...</p>
      </div>
      
      <div v-else-if="!order" class="error-state">
        <span class="material-icons">error_outline</span>
        <h2>Không tìm thấy đơn hàng</h2>
        <p>Đơn hàng không tồn tại hoặc bạn không có quyền truy cập.</p>
        <router-link to="/orders" class="btn-primary">Quay lại danh sách đơn hàng</router-link>
      </div>
      
      <div v-else class="order-content">
        <div class="order-status-bar">
          <div class="order-status" :class="getStatusClass(order.status)">
            {{ getStatusLabel(order.status) }}
          </div>
          
          <div class="order-actions" v-if="order.status === 'pending'">
            <button @click="confirmCancelOrder" class="btn-text-danger">
              <span class="material-icons">cancel</span>
              Hủy đơn hàng
            </button>
          </div>
        </div>
        
        <div class="order-info-section">
          <div class="order-progress" v-if="order.status !== 'cancelled'">
            <div class="progress-track">
              <div class="progress-step" :class="{ active: isStepActive('pending') }">
                <div class="step-icon">
                  <span class="material-icons">receipt</span>
                </div>
                <div class="step-content">
                  <h4>Đặt hàng</h4>
                  <p>{{ formatDateTime(order.createdAt) }}</p>
                </div>
              </div>
              
              <div class="progress-step" :class="{ active: isStepActive('processing') }">
                <div class="step-icon">
                  <span class="material-icons">inventory_2</span>
                </div>
                <div class="step-content">
                  <h4>Xác nhận</h4>
                  <p>{{ getProcessingTime() }}</p>
                </div>
              </div>
              
              <div class="progress-step" :class="{ active: isStepActive('shipping') }">
                <div class="step-icon">
                  <span class="material-icons">local_shipping</span>
                </div>
                <div class="step-content">
                  <h4>Vận chuyển</h4>
                  <p>{{ getShippingTime() }}</p>
                </div>
              </div>
              
              <div class="progress-step" :class="{ active: isStepActive('completed') }">
                <div class="step-icon">
                  <span class="material-icons">check_circle</span>
                </div>
                <div class="step-content">
                  <h4>Hoàn thành</h4>
                  <p>{{ getDeliveryTime() }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="cancelled-notice" v-else>
            <div class="cancelled-icon">
              <span class="material-icons">cancel</span>
            </div>
            <div class="cancelled-text">
              <h3>Đơn hàng đã bị hủy</h3>
              <p>Đơn hàng này đã bị hủy vào {{ formatDateTime(order.cancelledAt) }}</p>
            </div>
          </div>
          
          <div class="order-meta">
            <div class="meta-group">
              <div class="meta-item">
                <h4>Mã đơn hàng</h4>
                <p>{{ order.orderNumber }}</p>
              </div>
              
              <div class="meta-item">
                <h4>Ngày đặt hàng</h4>
                <p>{{ formatDate(order.createdAt) }}</p>
              </div>
              
              <div class="meta-item">
                <h4>Phương thức thanh toán</h4>
                <p>{{ getPaymentMethodLabel(order.paymentMethod) }}</p>
              </div>
              
              <div class="meta-item" v-if="order.trackingNumber">
                <h4>Mã vận đơn</h4>
                <p>{{ order.trackingNumber }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="order-details-grid">
          <div class="order-items">
            <h3 class="section-title">Sản phẩm</h3>
            
            <div class="product-list">
              <div 
                v-for="(item, index) in order.items" 
                :key="index" 
                class="product-item"
              >
                <div class="product-image">
                  <img :src="item.imageUrl" :alt="item.name">
                </div>
                
                <div class="product-details">
                  <h4 class="product-name">{{ item.name }}</h4>
                  <div class="product-specs">
                    <span class="product-size">Size: {{ item.size }}</span>
                    <span class="product-color">Màu: {{ item.color }}</span>
                  </div>
                  <div class="product-price">
                    <div class="current-price">{{ formatPrice(item.price) }}đ</div>
                    <div v-if="item.originalPrice" class="original-price">{{ formatPrice(item.originalPrice) }}đ</div>
                  </div>
                </div>
                
                <div class="product-quantity">
                  <span>x{{ item.quantity }}</span>
                </div>
                
                <div class="product-total">
                  {{ formatPrice(item.price * item.quantity) }}đ
                </div>
              </div>
            </div>
          </div>
          
          <div class="order-sidebar">
            <div class="shipping-info">
              <h3 class="section-title">Thông tin giao hàng</h3>
              
              <div class="info-content">
                <div class="info-group">
                  <p class="info-label">Họ tên:</p>
                  <p class="info-value">{{ order.shippingInfo.fullName }}</p>
                </div>
                
                <div class="info-group">
                  <p class="info-label">Số điện thoại:</p>
                  <p class="info-value">{{ order.shippingInfo.phone }}</p>
                </div>
                
                <div class="info-group">
                  <p class="info-label">Email:</p>
                  <p class="info-value">{{ order.shippingInfo.email }}</p>
                </div>
                
                <div class="info-group">
                  <p class="info-label">Địa chỉ:</p>
                  <p class="info-value">{{ order.shippingInfo.address }}</p>
                </div>
                
                <div class="info-group">
                  <p class="info-label">Phường/Xã:</p>
                  <p class="info-value">{{ order.shippingInfo.ward }}</p>
                </div>
                
                <div class="info-group">
                  <p class="info-label">Quận/Huyện:</p>
                  <p class="info-value">{{ order.shippingInfo.district }}</p>
                </div>
                
                <div class="info-group">
                  <p class="info-label">Tỉnh/Thành phố:</p>
                  <p class="info-value">{{ order.shippingInfo.province }}</p>
                </div>
                
                <div class="info-group" v-if="order.shippingInfo.note">
                  <p class="info-label">Ghi chú:</p>
                  <p class="info-value">{{ order.shippingInfo.note }}</p>
                </div>
              </div>
            </div>
            
            <div class="order-summary">
              <h3 class="section-title">Tổng cộng</h3>
              
              <div class="summary-content">
                <div class="summary-row">
                  <span>Tạm tính</span>
                  <span>{{ formatPrice(order.subtotal) }}đ</span>
                </div>
                
                <div class="summary-row" v-if="order.discount > 0">
                  <span>Giảm giá</span>
                  <span>-{{ formatPrice(order.discount) }}đ</span>
                </div>
                
                <div class="summary-row">
                  <span>Phí vận chuyển</span>
                  <span v-if="order.shippingFee > 0">{{ formatPrice(order.shippingFee) }}đ</span>
                  <span v-else class="free-shipping">Miễn phí</span>
                </div>
                
                <div class="summary-row total">
                  <span>Tổng cộng</span>
                  <span>{{ formatPrice(order.total) }}đ</span>
                </div>
                
                <div class="payment-status" v-if="order.status !== 'pending' && order.paymentMethod !== 'cod'">
                  <div class="paid-status" v-if="order.paidAt">
                    <span class="material-icons">check_circle</span>
                    <span>Đã thanh toán vào {{ formatDateTime(order.paidAt) }}</span>
                  </div>
                  <div class="unpaid-status" v-else>
                    <span class="material-icons">pending</span>
                    <span>Chưa thanh toán</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="action-buttons">
              <button 
                v-if="order.status === 'completed'" 
                class="btn-primary"
              >
                <span class="material-icons">replay</span>
                Mua lại
              </button>
              
              <button class="btn-outline">
                <span class="material-icons">chat</span>
                Liên hệ hỗ trợ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useOrderStore, Order } from '@/stores/order';

export default defineComponent({
  name: 'OrderDetailView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    const orderStore = useOrderStore();
    
    const isAuthenticated = computed(() => userStore.getAuthStatus);
    const order = ref<Order | null>(null);
    const loading = ref(true);
    
    onMounted(async () => {
      if (!isAuthenticated.value) {
        loading.value = false;
        return;
      }
      
      const orderId = parseInt(route.params.id as string);
      
      if (isNaN(orderId)) {
        router.push('/orders');
        return;
      }
      
      try {
        // Tải thông tin đơn hàng
        const orderData = await orderStore.fetchOrderById(orderId);
        
        if (orderData) {
          order.value = orderData;
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        loading.value = false;
      }
    });
    
    // Kiểm tra xem bước nào đã hoàn thành
    const isStepActive = (step: string): boolean => {
      if (!order.value) return false;
      
      const statusOrder = ['pending', 'processing', 'shipping', 'completed'];
      const currentIndex = statusOrder.indexOf(order.value.status);
      const stepIndex = statusOrder.indexOf(step);
      
      return currentIndex >= stepIndex;
    };
    
    // Lấy thời gian xử lý đơn hàng
    const getProcessingTime = (): string => {
      if (!order.value) return 'Chưa xác nhận';
      
      if (order.value.status === 'pending') {
        return 'Đang chờ xác nhận';
      }
      
      // Tạm thời giả định đã xử lý nếu trạng thái cao hơn pending
      return 'Đã xác nhận';
    };
    
    // Lấy thời gian vận chuyển
    const getShippingTime = (): string => {
      if (!order.value) return 'Chưa vận chuyển';
      
      if (['pending', 'processing'].includes(order.value.status)) {
        return 'Chưa vận chuyển';
      }
      
      if (order.value.shippedAt) {
        return formatDateTime(order.value.shippedAt);
      }
      
      return 'Đang vận chuyển';
    };
    
    // Lấy thời gian giao hàng
    const getDeliveryTime = (): string => {
      if (!order.value) return 'Chưa giao hàng';
      
      if (order.value.status !== 'completed') {
        return 'Chưa giao hàng';
      }
      
      if (order.value.deliveredAt) {
        return formatDateTime(order.value.deliveredAt);
      }
      
      return 'Đã giao hàng';
    };
    
    // Format giá tiền
    const formatPrice = (price: number): string => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    
    // Format ngày
    const formatDate = (date: Date | undefined): string => {
      if (!date) return '';
      
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };
    
    // Format ngày giờ
    const formatDateTime = (date: Date | undefined): string => {
      if (!date) return '';
      
      const dateObj = new Date(date);
      return `${dateObj.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })} ${dateObj.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    };
    
    // Lấy label trạng thái
    const getStatusLabel = (status: string): string => {
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
    const getStatusClass = (status: string): string => {
      switch (status) {
        case 'pending': return 'status-pending';
        case 'processing': return 'status-processing';
        case 'shipping': return 'status-shipping';
        case 'completed': return 'status-completed';
        case 'cancelled': return 'status-cancelled';
        default: return '';
      }
    };
    
    // Lấy tên phương thức thanh toán
    const getPaymentMethodLabel = (method: string): string => {
      switch (method) {
        case 'cod': return 'Thanh toán khi nhận hàng (COD)';
        case 'bank': return 'Chuyển khoản ngân hàng';
        case 'card': return 'Thẻ tín dụng/Ghi nợ';
        default: return method;
      }
    };
    
    // Xác nhận hủy đơn hàng
    const confirmCancelOrder = () => {
      if (!order.value) return;
      
      if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
        cancelOrder();
      }
    };
    
    // Hủy đơn hàng
    const cancelOrder = async () => {
      if (!order.value) return;
      
      try {
        const result = await orderStore.cancelOrder(order.value.id);
        
        if (result) {
          // Cập nhật lại dữ liệu đơn hàng
          const updatedOrder = await orderStore.fetchOrderById(order.value.id);
          if (updatedOrder) {
            order.value = updatedOrder;
          }
          
          alert('Đơn hàng đã được hủy thành công.');
        } else if (orderStore.error) {
          alert(orderStore.error);
        }
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert('Có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại sau.');
      }
    };
    
    return {
      isAuthenticated,
      order,
      loading,
      isStepActive,
      getProcessingTime,
      getShippingTime,
      getDeliveryTime,
      formatPrice,
      formatDate,
      formatDateTime,
      getStatusLabel,
      getStatusClass,
      getPaymentMethodLabel,
      confirmCancelOrder
    };
  }
});
</script>

<style scoped>
.order-detail-view {
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 50px;
}

.order-header {
  margin-bottom: 30px;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #555;
  margin-bottom: 15px;
  text-decoration: none;
  font-size: 0.9rem;
  width: fit-content;
}

.back-link:hover {
  color: #f63;
}

.page-title {
  margin: 0;
  color: #333;
  font-size: 1.8rem;
}

/* Auth Required */
.auth-required {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
}

.auth-required-content {
  max-width: 450px;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.auth-required .material-icons {
  font-size: 4rem;
  color: #ddd;
  margin-bottom: 20px;
}

.auth-required h2 {
  margin: 0 0 10px 0;
  color: #333;
}

.auth-required p {
  color: #666;
  margin: 0 0 25px 0;
}

.auth-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.loader {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #f63;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  color: #666;
}

/* Error State */
.error-state {
  text-align: center;
  padding: 40px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.error-state .material-icons {
  font-size: 4rem;
  color: #f44336;
  margin-bottom: 15px;
}

.error-state h2 {
  margin: 0 0 10px 0;
  color: #333;
}

.error-state p {
  color: #666;
  margin: 0 0 20px 0;
}

/* Order Content */
.order-content {
  background-color: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
}

/* Order Status Bar */
.order-status-bar {
  padding: 15px 20px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.order-status {
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.status-pending {
  background-color: #fff8e1;
  color: #f57f17;
}

.status-processing {
  background-color: #e3f2fd;
  color: #1565c0;
}

.status-shipping {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-completed {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-cancelled {
  background-color: #ffebee;
  color: #c62828;
}

.order-actions {
  display: flex;
  gap: 10px;
}

.btn-text-danger {
  background: none;
  border: none;
  color: #f44336;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 5px;
  font-weight: 500;
}

.btn-text-danger:hover {
  background-color: #ffebee;
}

/* Order Info Section */
.order-info-section {
  padding: 30px 20px;
  background-color: white;
}

/* Order Progress */
.order-progress {
  margin-bottom: 30px;
}

.progress-track {
  display: flex;
  position: relative;
  justify-content: space-between;
}

.progress-track::before {
  content: '';
  position: absolute;
  top: 25px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #eee;
  z-index: 1;
}

.progress-step {
  position: relative;
  z-index: 2;
  width: 25%;
  text-align: center;
}

.step-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
}

.step-icon .material-icons {
  color: #ddd;
  font-size: 24px;
}

.progress-step.active .step-icon {
  border-color: #4caf50;
  background-color: #e8f5e9;
}

.progress-step.active .step-icon .material-icons {
  color: #4caf50;
}

.step-content h4 {
  margin: 0 0 5px 0;
  font-size: 0.9rem;
  color: #333;
}

.step-content p {
  margin: 0;
  font-size: 0.8rem;
  color: #666;
}

.progress-step.active .step-content h4 {
  color: #4caf50;
}

/* Cancelled Notice */
.cancelled-notice {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background-color: #ffebee;
  border-radius: 5px;
  margin-bottom: 30px;
}

.cancelled-icon {
  font-size: 2rem;
  color: #f44336;
}

.cancelled-text h3 {
  margin: 0 0 5px 0;
  color: #c62828;
}

.cancelled-text p {
  margin: 0;
  color: #666;
}

/* Order Meta */
.order-meta {
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.meta-group {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.meta-item {
  margin-bottom: 15px;
}

.meta-item h4 {
  margin: 0 0 5px 0;
  font-size: 0.9rem;
  color: #666;
  font-weight: 400;
}

.meta-item p {
  margin: 0;
  font-weight: 500;
  color: #333;
}

/* Order Details Grid */
.order-details-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 20px;
}

.section-title {
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

/* Order Items */
.order-items {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.product-item {
  display: flex;
  gap: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.product-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.product-image {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 5px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  flex-grow: 1;
}

.product-name {
  margin: 0 0 5px 0;
  font-size: 1rem;
}

.product-specs {
  margin-bottom: 5px;
  display: flex;
  gap: 15px;
}

.product-size,
.product-color {
  font-size: 0.9rem;
  color: #666;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 10px;
}

.current-price {
  font-weight: 500;
  color: #f63;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.9rem;
}

.product-quantity {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #555;
  min-width: 50px;
  justify-content: center;
}

.product-total {
  font-weight: 600;
  color: #333;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* Order Sidebar */
.order-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.shipping-info,
.order-summary {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

/* Shipping Info */
.info-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-group {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
}

.info-label {
  flex: 1;
  min-width: 130px;
  max-width: 130px;
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.info-value {
  flex: 2;
  margin: 0;
  color: #333;
  font-weight: 500;
}

/* Order Summary */
.summary-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  color: #555;
}

.summary-row.total {
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid #eee;
}

.free-shipping {
  color: #4caf50;
}

.payment-status {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed #eee;
}

.paid-status,
.unpaid-status {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
}

.paid-status {
  color: #4caf50;
}

.paid-status .material-icons {
  color: #4caf50;
}

.unpaid-status {
  color: #f57f17;
}

.unpaid-status .material-icons {
  color: #f57f17;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-primary,
.btn-outline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  border: none;
  width: 100%;
}

.btn-primary {
  background-color: #f63;
  color: white;
}

.btn-primary:hover {
  background-color: #e62;
}

.btn-outline {
  border: 1px solid #f63;
  color: #f63;
  background-color: transparent;
}

.btn-outline:hover {
  background-color: #fff3ee;
}

/* Responsive */
@media (max-width: 900px) {
  .order-details-grid {
    grid-template-columns: 1fr;
  }
  
  .progress-track {
    flex-wrap: wrap;
  }
  
  .progress-track::before {
    display: none;
  }
  
  .progress-step {
    width: 50%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    text-align: left;
  }
  
  .step-icon {
    margin: 0 15px 0 0;
  }
}

@media (max-width: 600px) {
  .product-item {
    flex-wrap: wrap;
  }
  
  .product-quantity,
  .product-total {
    margin-top: 10px;
  }
  
  .product-quantity {
    margin-left: auto;
  }
  
  .progress-step {
    width: 100%;
  }
}
</style>