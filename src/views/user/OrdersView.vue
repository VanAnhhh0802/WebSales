<template>
  <div class="orders-view">
    <div class="orders-header">
      <h1 class="page-title">Lịch sử đơn hàng</h1>
    </div>
    
    <div v-if="!isAuthenticated" class="auth-required">
      <div class="auth-required-content">
        <span class="material-icons">shopping_bag</span>
        <h2>Yêu cầu đăng nhập</h2>
        <p>Bạn cần đăng nhập để xem lịch sử đơn hàng.</p>
        <div class="auth-buttons">
          <router-link to="/login" class="btn-primary">Đăng nhập</router-link>
          <router-link to="/register" class="btn-outline">Đăng ký</router-link>
        </div>
      </div>
    </div>
    
    <div v-else class="orders-content">
      <div class="orders-filter">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Tìm kiếm theo mã đơn hàng..." 
            @input="filterOrders"
          >
        </div>
        
        <div class="filter-options">
          <select v-model="statusFilter" @change="filterOrders">
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="processing">Đang xử lý</option>
            <option value="shipping">Đang vận chuyển</option>
            <option value="completed">Đã giao hàng</option>
            <option value="cancelled">Đã hủy</option>
          </select>
          
          <select v-model="timeFilter" @change="filterOrders">
            <option value="all">Mọi thời gian</option>
            <option value="month">Tháng này</option>
            <option value="three_months">3 tháng gần đây</option>
            <option value="six_months">6 tháng gần đây</option>
            <option value="year">Năm nay</option>
          </select>
        </div>
      </div>
      
      <div v-if="loading" class="loading-state">
        <div class="loader"></div>
        <p>Đang tải đơn hàng...</p>
      </div>
      
      <div v-else-if="filteredOrders.length === 0" class="empty-state">
        <span class="material-icons">shopping_bag</span>
        <h2>Không có đơn hàng nào</h2>
        <p v-if="searchQuery || statusFilter !== 'all' || timeFilter !== 'all'">
          Không tìm thấy đơn hàng theo bộ lọc đã chọn.
          <button class="reset-filter" @click="resetFilters">Xóa bộ lọc</button>
        </p>
        <p v-else>
          Bạn chưa có đơn hàng nào. Hãy mua sắm ngay!
        </p>
        <router-link to="/shoes" class="btn-primary">Tiếp tục mua sắm</router-link>
      </div>
      
      <div v-else class="orders-list">
        <div 
          v-for="order in filteredOrders" 
          :key="order.id" 
          class="order-card"
        >
          <div class="order-header">
            <div class="order-info">
              <h3>Đơn hàng #{{ order.orderNumber }}</h3>
              <p class="order-date">{{ formatDate(order.orderDate) }}</p>
            </div>
            <div class="order-status" :class="getStatusClass(order.status)">
              {{ getStatusLabel(order.status) }}
            </div>
          </div>
          
          <div class="order-products">
            <div class="product-images">
              <div 
                v-for="(product, index) in order.products.slice(0, 3)" 
                :key="index" 
                class="product-image"
              >
                <img :src="product.imageUrl" :alt="product.name">
              </div>
              <div v-if="order.products.length > 3" class="more-products">
                +{{ order.products.length - 3 }}
              </div>
            </div>
            <div class="product-summary">
              <p class="product-count">{{ order.products.length }} sản phẩm</p>
              <p class="order-total">{{ formatPrice(order.total) }}đ</p>
            </div>
          </div>
          
          <div class="order-actions">
            <router-link :to="`/order/${order.id}`" class="btn-outline">
              Chi tiết
            </router-link>
            <button 
              v-if="order.status === 'completed'" 
              class="btn-text"
            >
              Mua lại
            </button>
            <button 
              v-if="order.status === 'pending'" 
              class="btn-text-danger"
            >
              Hủy đơn
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

interface OrderProduct {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  orderNumber: string;
  orderDate: Date;
  status: 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled';
  products: OrderProduct[];
  total: number;
}

export default defineComponent({
  name: 'OrdersView',
  setup() {
    const userStore = useUserStore();
    const isAuthenticated = computed(() => userStore.getAuthStatus.value);
    
    const orders = ref<Order[]>([]);
    const filteredOrders = ref<Order[]>([]);
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
        
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
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
        } else if (timeFilter.value === 'three_months') {
          // 3 tháng gần đây
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(now.getMonth() - 3);
          matchesTime = order.orderDate >= threeMonthsAgo;
        } else if (timeFilter.value === 'six_months') {
          // 6 tháng gần đây
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(now.getMonth() - 6);
          matchesTime = order.orderDate >= sixMonthsAgo;
        } else if (timeFilter.value === 'year') {
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
    const formatDate = (date: Date): string => {
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };
    
    // Format giá
    const formatPrice = (price: number): string => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
</script>

<style scoped>
.orders-view {
  max-width: 800px;
  margin: 0 auto;
}

.orders-header {
  margin-bottom: 30px;
}

.page-title {
  font-size: 2rem;
  color: #333;
  margin: 0;
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

/* Orders Filter */
.orders-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
}

.search-box {
  flex: 1;
  min-width: 250px;
}

.search-box input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
}

.filter-options {
  display: flex;
  gap: 10px;
}

.filter-options select {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem;
  background-color: white;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
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

/* Empty State */
.empty-state {
  text-align: center;
  padding: 40px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.empty-state .material-icons {
  font-size: 4rem;
  color: #ddd;
  margin-bottom: 15px;
}

.empty-state h2 {
  margin: 0 0 10px 0;
  color: #333;
}

.empty-state p {
  color: #666;
  margin: 0 0 20px 0;
}

.reset-filter {
  background: none;
  border: none;
  color: #f63;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  font-size: inherit;
}

/* Orders List */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.order-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
}

.order-date {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

.order-status {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
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

.order-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
}

.product-images {
  display: flex;
  gap: 10px;
}

.product-image {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.more-products {
  width: 50px;
  height: 50px;
  background-color: #f5f5f5;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 0.9rem;
  font-weight: 600;
}

.product-summary {
  text-align: right;
}

.product-count {
  color: #666;
  margin: 0 0 5px 0;
  font-size: 0.9rem;
}

.order-total {
  margin: 0;
  font-weight: 600;
  color: #333;
}

.order-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.btn-primary,
.btn-outline,
.btn-text,
.btn-text-danger {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #f63;
  color: white;
  border: none;
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

.btn-text {
  background: none;
  border: none;
  color: #555;
  padding: 8px 10px;
}

.btn-text:hover {
  color: #f63;
  background-color: #f9f9f9;
}

.btn-text-danger {
  background: none;
  border: none;
  color: #f44336;
  padding: 8px 10px;
}

.btn-text-danger:hover {
  background-color: #ffebee;
}

/* Responsive */
@media (max-width: 576px) {
  .order-header {
    flex-direction: column;
  }
  
  .order-status {
    margin-top: 10px;
  }
  
  .order-products {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .product-summary {
    text-align: left;
  }
  
  .filter-options {
    width: 100%;
    justify-content: space-between;
  }
  
  .filter-options select {
    flex: 1;
  }
}
</style>