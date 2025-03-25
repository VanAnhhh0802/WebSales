<template>
  <div class="app">
    <header>
      <nav class="navbar">
        <div class="logo-container">
          <router-link to="/">
            <img alt="Shoes Store logo" class="logo" src="@/assets/logo.svg" />
            <h1>ShoesStore</h1>
          </router-link>
        </div>
        
        <div class="nav-links">
          <router-link to="/">Trang chủ</router-link>
          <router-link to="/shoes">Sản phẩm</router-link>
          <router-link to="/shoes/nam">Nam</router-link>
          <router-link to="/shoes/nu">Nữ</router-link>
          <router-link to="/shoes/tre-em">Trẻ em</router-link>
        </div>
        
        <div class="nav-actions">
          <router-link to="/cart" class="cart-icon">
            <span class="material-icons">shopping_cart</span>
            <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
          </router-link>
          <router-link to="/login" class="user-icon">
            <span class="material-icons">person</span>
          </router-link>
        </div>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <div class="footer-content">
        <div class="footer-section">
          <h3>ShoesStore</h3>
          <p>Cửa hàng giày uy tín hàng đầu Việt Nam</p>
          <div class="social-links">
            <a href="#" aria-label="Facebook"><span class="material-icons">facebook</span></a>
            <a href="#" aria-label="Instagram"><span class="material-icons">photo_camera</span></a>
            <a href="#" aria-label="Youtube"><span class="material-icons">smart_display</span></a>
          </div>
        </div>
        
        <div class="footer-section">
          <h3>Danh mục</h3>
          <ul>
            <li><router-link to="/shoes/nam">Giày nam</router-link></li>
            <li><router-link to="/shoes/nu">Giày nữ</router-link></li>
            <li><router-link to="/shoes/tre-em">Giày trẻ em</router-link></li>
            <li><router-link to="/shoes/the-thao">Giày thể thao</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Thông tin</h3>
          <ul>
            <li><router-link to="/about">Về chúng tôi</router-link></li>
            <li><a href="#">Chính sách bảo mật</a></li>
            <li><a href="#">Điều khoản sử dụng</a></li>
            <li><a href="#">Chính sách đổi trả</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Liên hệ</h3>
          <p>Email: contact@shoesstore.com</p>
          <p>Điện thoại: (84) 123-456-789</p>
          <p>Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 ShoesStore. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useShoeStore } from '@/stores/shoe';

export default defineComponent({
  name: 'App',
  setup() {
    const cartStore = useCartStore();
    const shoeStore = useShoeStore();
    
    // Lấy số lượng sản phẩm trong giỏ hàng
    const cartCount = computed(() => cartStore.getCartCount);
    
    // Tải dữ liệu sản phẩm khi khởi động ứng dụng
    onMounted(async () => {
      await shoeStore.fetchShoes();
    });
    
    return {
      cartCount
    };
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  font-family: 'Roboto', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background-color: #f8f9fa;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 35px;
  margin-right: 10px;
}

.logo-container h1 {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 25px;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 5px 0;
  position: relative;
}

.nav-links a:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #f63;
  transition: width 0.3s ease;
}

.nav-links a:hover:after {
  width: 100%;
}

.nav-links a.router-link-exact-active {
  color: #f63;
}

.nav-links a.router-link-exact-active:after {
  width: 100%;
  background-color: #f63;
}

.nav-actions {
  display: flex;
  gap: 15px;
}

.cart-icon, .user-icon {
  position: relative;
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -10px;
  background-color: #f63;
  color: #fff;
  font-size: 0.7rem;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

main {
  flex: 1;
  padding: 30px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

footer {
  background-color: #333;
  color: #fff;
  padding: 40px 20px 20px;
  margin-top: 60px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
}

.footer-section {
  flex: 1;
  min-width: 250px;
}

.footer-section h3 {
  font-size: 1.2rem;
  margin-bottom: 15px;
  position: relative;
  padding-bottom: 10px;
}

.footer-section h3:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 2px;
  background-color: #f63;
}

.footer-section ul {
  list-style: none;
}

.footer-section li {
  margin-bottom: 10px;
}

.footer-section a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #f63;
}

.footer-section p {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 10px;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding-top: 20px;
  margin-top: 40px;
  border-top: 1px solid #555;
}

.material-icons {
  font-size: 24px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 15px;
  }
  
  .nav-links {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .nav-actions {
    margin-top: 10px;
  }
  
  .footer-content {
    flex-direction: column;
  }
}
</style>
