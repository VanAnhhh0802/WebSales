import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Trang chủ' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'Giới thiệu' }
  },
  // Danh sách sản phẩm
  {
    path: '/shoes',
    name: 'shoes',
    component: () => import('@/views/shoes/ShoesListView.vue'),
    meta: { title: 'Danh sách sản phẩm' }
  },
  // Danh sách sản phẩm theo danh mục
  {
    path: '/shoes/:category',
    name: 'shoesCategory',
    component: () => import('@/views/shoes/ShoesCategoryView.vue'),
    meta: { title: 'Danh mục sản phẩm' }
  },
  // Chi tiết sản phẩm
  {
    path: '/shoe/:id',
    name: 'shoeDetail',
    component: () => import('@/views/shoes/ShoeDetailView.vue'),
    meta: { title: 'Chi tiết sản phẩm' }
  },
  // Giỏ hàng
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/cart/CartView.vue'),
    meta: { title: 'Giỏ hàng' }
  },
  // Thanh toán
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/views/cart/CheckoutView.vue'),
    meta: { title: 'Thanh toán' }
  },
  // Đăng nhập
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/LoginView.vue'),
    meta: { title: 'Đăng nhập' }
  },
  // Đăng ký
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/user/RegisterView.vue'),
    meta: { title: 'Đăng ký' }
  },
  // Trang cá nhân
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/user/ProfileView.vue'),
    meta: { title: 'Trang cá nhân' }
  },
  // Lịch sử đơn hàng
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/views/user/OrdersView.vue'),
    meta: { title: 'Lịch sử đơn hàng' }
  },
  // Chi tiết đơn hàng
  {
    path: '/order/:id',
    name: 'orderDetail',
    component: () => import('@/views/user/OrderDetailView.vue'),
    meta: { title: 'Chi tiết đơn hàng' }
  },
  // Trang 404
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Không tìm thấy trang' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Cập nhật tiêu đề trang
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'ShoesStore'} - ShoesStore`;
  next();
});

export default router;
