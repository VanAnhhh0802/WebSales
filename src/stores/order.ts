import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface OrderItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  size: number;
  color: string;
  quantity: number;
}

export interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  note?: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  items: OrderItem[];
  total: number;
  subtotal: number;
  shippingFee: number;
  discount: number;
  paymentMethod: 'cod' | 'bank' | 'card';
  status: 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled';
  shippingInfo: ShippingInfo;
  createdAt: Date;
  paidAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  trackingNumber?: string;
}

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const getAllOrders = computed(() => orders.value);
  
  const getOrderById = computed(() => (id: number) => {
    return orders.value.find(order => order.id === id);
  });
  
  const getOrdersByStatus = computed(() => (status: string) => {
    return orders.value.filter(order => order.status === status);
  });
  
  // Actions
  const fetchOrders = async (userId: number) => {
    loading.value = true;
    error.value = null;
    
    try {
      // Trong ứng dụng thực tế, đây sẽ là lệnh gọi API
      // const response = await fetch(`/api/orders?userId=${userId}`);
      // orders.value = await response.json();
      
      // Mô phỏng độ trễ mạng
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dữ liệu mẫu
      orders.value = [
        {
          id: 1,
          orderNumber: 'ORD-2503-1234',
          userId: userId,
          items: [
            {
              id: 1,
              name: 'Giày Thể Thao Air Max',
              imageUrl: 'https://placehold.co/100x100?text=Nike+Air+Max',
              price: 2500000,
              originalPrice: 2800000,
              size: 42,
              color: 'Đen',
              quantity: 1
            },
            {
              id: 2,
              name: 'Giày Adidas Ultraboost',
              imageUrl: 'https://placehold.co/100x100?text=Adidas+Ultraboost',
              price: 2800000,
              size: 41,
              color: 'Trắng',
              quantity: 1
            }
          ],
          total: 5280000,
          subtotal: 5300000,
          shippingFee: 30000,
          discount: 50000,
          paymentMethod: 'cod',
          status: 'completed',
          shippingInfo: {
            fullName: 'Nguyễn Văn A',
            phone: '0123456789',
            email: 'user@example.com',
            address: '123 Đường ABC',
            province: 'TP. Hồ Chí Minh',
            district: 'Quận 1',
            ward: 'Phường Bến Nghé'
          },
          createdAt: new Date(2025, 2, 25, 10, 30), // 25/03/2025, 10:30
          paidAt: new Date(2025, 2, 25, 17, 45), // 25/03/2025, 17:45
          shippedAt: new Date(2025, 2, 25, 15, 20), // 25/03/2025, 15:20
          deliveredAt: new Date(2025, 2, 25, 17, 45), // 25/03/2025, 17:45
          trackingNumber: 'TN123456789'
        },
        {
          id: 2,
          orderNumber: 'ORD-2003-5678',
          userId: userId,
          items: [
            {
              id: 3,
              name: 'Giày Converse Classic',
              imageUrl: 'https://placehold.co/100x100?text=Converse+Classic',
              price: 1500000,
              size: 40,
              color: 'Trắng',
              quantity: 1
            }
          ],
          total: 1500000,
          subtotal: 1500000,
          shippingFee: 30000,
          discount: 30000,
          paymentMethod: 'bank',
          status: 'shipping',
          shippingInfo: {
            fullName: 'Nguyễn Văn A',
            phone: '0123456789',
            email: 'user@example.com',
            address: '123 Đường ABC',
            province: 'TP. Hồ Chí Minh',
            district: 'Quận 1',
            ward: 'Phường Bến Nghé'
          },
          createdAt: new Date(2025, 2, 20, 9, 15), // 20/03/2025, 9:15
          paidAt: new Date(2025, 2, 20, 9, 30), // 20/03/2025, 9:30
          shippedAt: new Date(2025, 2, 22, 14, 45), // 22/03/2025, 14:45
          trackingNumber: 'TN987654321'
        },
        {
          id: 3,
          orderNumber: 'ORD-1502-9012',
          userId: userId,
          items: [
            {
              id: 4,
              name: 'Giày Vans Old Skool',
              imageUrl: 'https://placehold.co/100x100?text=Vans+Old+Skool',
              price: 1800000,
              size: 42,
              color: 'Đen',
              quantity: 1
            },
            {
              id: 5,
              name: 'Giày Puma RS-X',
              imageUrl: 'https://placehold.co/100x100?text=Puma+RS-X',
              price: 2200000,
              originalPrice: 2500000,
              size: 43,
              color: 'Xám',
              quantity: 2
            }
          ],
          total: 6200000,
          subtotal: 6200000,
          shippingFee: 0, // miễn phí vận chuyển
          discount: 0,
          paymentMethod: 'card',
          status: 'pending',
          shippingInfo: {
            fullName: 'Nguyễn Văn A',
            phone: '0123456789',
            email: 'user@example.com',
            address: '123 Đường ABC',
            province: 'TP. Hồ Chí Minh',
            district: 'Quận 1',
            ward: 'Phường Bến Nghé',
            note: 'Giao hàng trong giờ hành chính'
          },
          createdAt: new Date(2025, 1, 15, 16, 20) // 15/02/2025, 16:20
        }
      ];
      
    } catch (err) {
      console.error('Error fetching orders:', err);
      error.value = 'Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.';
    } finally {
      loading.value = false;
    }
  };
  
  const fetchOrderById = async (id: number) => {
    loading.value = true;
    error.value = null;
    
    try {
      // Trong ứng dụng thực tế, đây sẽ là lệnh gọi API
      // const response = await fetch(`/api/orders/${id}`);
      // const data = await response.json();
      // return data;
      
      // Mô phỏng độ trễ mạng
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Trả về đơn hàng từ danh sách đã có
      return orders.value.find(order => order.id === id);
      
    } catch (err) {
      console.error(`Error fetching order with ID ${id}:`, err);
      error.value = 'Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.';
      return null;
    } finally {
      loading.value = false;
    }
  };
  
  const createOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => {
    loading.value = true;
    error.value = null;
    
    try {
      // Trong ứng dụng thực tế, đây sẽ là lệnh gọi API để tạo đơn hàng
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(orderData)
      // });
      // const data = await response.json();
      
      // Mô phỏng độ trễ mạng
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Tạo đơn hàng mới (mô phỏng)
      const date = new Date();
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      
      const newOrder: Order = {
        id: orders.value.length > 0 ? Math.max(...orders.value.map(o => o.id)) + 1 : 1,
        orderNumber: `ORD-${day}${month}-${randomNum}`,
        status: 'pending',
        createdAt: new Date(),
        ...orderData
      };
      
      // Thêm đơn hàng mới vào đầu danh sách
      orders.value.unshift(newOrder);
      
      return newOrder;
      
    } catch (err) {
      console.error('Error creating order:', err);
      error.value = 'Không thể tạo đơn hàng. Vui lòng thử lại sau.';
      return null;
    } finally {
      loading.value = false;
    }
  };
  
  const cancelOrder = async (id: number) => {
    loading.value = true;
    error.value = null;
    
    try {
      // Trong ứng dụng thực tế, đây sẽ là lệnh gọi API để hủy đơn hàng
      // const response = await fetch(`/api/orders/${id}/cancel`, {
      //   method: 'PUT'
      // });
      // const data = await response.json();
      
      // Mô phỏng độ trễ mạng
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Cập nhật trạng thái đơn hàng trong danh sách
      const orderIndex = orders.value.findIndex(order => order.id === id);
      
      if (orderIndex !== -1) {
        // Chỉ cho phép hủy đơn hàng ở trạng thái "pending"
        if (orders.value[orderIndex].status === 'pending') {
          orders.value[orderIndex].status = 'cancelled';
          orders.value[orderIndex].cancelledAt = new Date();
          return true;
        } else {
          error.value = 'Chỉ có thể hủy đơn hàng ở trạng thái chờ xác nhận.';
          return false;
        }
      } else {
        error.value = 'Không tìm thấy đơn hàng.';
        return false;
      }
      
    } catch (err) {
      console.error(`Error cancelling order with ID ${id}:`, err);
      error.value = 'Không thể hủy đơn hàng. Vui lòng thử lại sau.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    orders,
    loading,
    error,
    getAllOrders,
    getOrderById,
    getOrdersByStatus,
    fetchOrders,
    fetchOrderById,
    createOrder,
    cancelOrder
  };
});