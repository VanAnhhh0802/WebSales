<template>
  <div class="not-found-view">
    <div class="not-found-content">
      <div class="not-found-icon">404</div>
      <h1>Không tìm thấy trang!</h1>
      <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
      <div class="not-found-actions">
        <router-link to="/" class="btn-primary">
          <span class="material-icons">home</span>
          Trở về trang chủ
        </router-link>
        <button @click="goBack" class="btn-outline">
          <span class="material-icons">arrow_back</span>
          Quay lại trang trước
        </button>
      </div>
      
      <div class="suggested-links">
        <h2>Bạn có thể thử:</h2>
        <ul>
          <li>
            <router-link to="/shoes">Xem tất cả sản phẩm</router-link>
          </li>
          <li>
            <router-link to="/shoes/sneakers">Xem giày sneaker</router-link>
          </li>
          <li>
            <router-link to="/about">Về chúng tôi</router-link>
          </li>
          <li>
            <router-link to="/cart">Giỏ hàng của bạn</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFoundView',
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
    }
  }
});
</script>

<style scoped>
.not-found-view {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.not-found-content {
  max-width: 600px;
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.not-found-icon {
  font-size: 6rem;
  font-weight: 700;
  color: #f63;
  line-height: 1;
  margin-bottom: 20px;
}

h1 {
  font-size: 2rem;
  margin: 0 0 15px 0;
  color: #333;
}

p {
  color: #666;
  margin: 0 0 30px 0;
  font-size: 1.1rem;
}

.not-found-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-outline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #f63;
  color: white;
  border: none;
  text-decoration: none;
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
  background-color: #fff3ee;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.suggested-links {
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.suggested-links h2 {
  font-size: 1.2rem;
  margin: 0 0 15px 0;
  color: #333;
}

.suggested-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.suggested-links li {
  margin: 5px;
}

.suggested-links a {
  color: #f63;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: #fff3ee;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: inline-block;
}

.suggested-links a:hover {
  background-color: #f63;
  color: white;
}

/* Responsive */
@media (max-width: 576px) {
  .not-found-icon {
    font-size: 4rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  p {
    font-size: 1rem;
  }
  
  .btn-primary,
  .btn-outline {
    width: 100%;
  }
}
</style>