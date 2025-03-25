<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Chào mừng đến với ShoesStore</h1>
        <p>Khám phá bộ sưu tập giày mới nhất với chất lượng cao và giá cả phải chăng</p>
        <router-link to="/shoes" class="btn-primary">Mua ngay</router-link>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="categories">
      <h2 class="section-title">Danh mục nổi bật</h2>
      <div class="category-grid">
        <div class="category-card" v-for="category in categories" :key="category.id">
          <router-link :to="category.link">
            <div class="category-img" :style="{ backgroundColor: category.bgColor }">
              <span class="material-icons">{{ category.icon }}</span>
            </div>
            <h3>{{ category.name }}</h3>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-products">
      <h2 class="section-title">Sản phẩm nổi bật</h2>
      <div class="product-grid">
        <div class="product-card" v-for="product in featuredProducts" :key="product.id">
          <router-link :to="`/shoe/${product.id}`">
            <div class="product-img">
              <img :src="product.imageUrl" :alt="product.name">
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="product-brand">{{ product.brand }}</p>
              <p class="product-price">{{ formatPrice(product.price) }} đ</p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="view-all">
        <router-link to="/shoes" class="btn-outline">Xem tất cả sản phẩm</router-link>
      </div>
    </section>

    <!-- Feature Highlights -->
    <section class="features">
      <div class="feature">
        <span class="material-icons">local_shipping</span>
        <h3>Miễn phí vận chuyển</h3>
        <p>Cho đơn hàng trên 500.000đ</p>
      </div>
      <div class="feature">
        <span class="material-icons">verified_user</span>
        <h3>Bảo hành 1 năm</h3>
        <p>Đổi trả dễ dàng</p>
      </div>
      <div class="feature">
        <span class="material-icons">payment</span>
        <h3>Thanh toán an toàn</h3>
        <p>Nhiều phương thức thanh toán</p>
      </div>
      <div class="feature">
        <span class="material-icons">support_agent</span>
        <h3>Hỗ trợ 24/7</h3>
        <p>Luôn sẵn sàng hỗ trợ</p>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
      <h2 class="section-title">Khách hàng nói gì về chúng tôi</h2>
      <div class="testimonial-slider">
        <div class="testimonial">
          <div class="testimonial-content">
            <p>"Sản phẩm chất lượng, đúng mẫu mã. Dịch vụ giao hàng nhanh chóng. Tôi rất hài lòng!"</p>
          </div>
          <div class="testimonial-author">
            <span class="author-name">Nguyễn Văn A</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter">
      <div class="newsletter-content">
        <h2>Đăng ký nhận thông tin</h2>
        <p>Cập nhật các sản phẩm mới và ưu đãi hấp dẫn từ ShoesStore</p>
        <div class="newsletter-form">
          <input type="email" placeholder="Nhập email của bạn">
          <button class="btn-primary">Đăng ký</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Category {
  id: number;
  name: string;
  icon: string;
  link: string;
  bgColor: string;
}

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
}

export default defineComponent({
  name: 'HomeView',
  setup() {
    const categories = ref<Category[]>([
      {
        id: 1,
        name: 'Giày Nam',
        icon: 'accessibility_new',
        link: '/shoes/nam',
        bgColor: '#e3f2fd'
      },
      {
        id: 2,
        name: 'Giày Nữ',
        icon: 'accessibility',
        link: '/shoes/nu',
        bgColor: '#f8bbd0'
      },
      {
        id: 3,
        name: 'Giày Trẻ Em',
        icon: 'child_care',
        link: '/shoes/tre-em',
        bgColor: '#e8f5e9'
      },
      {
        id: 4,
        name: 'Giày Thể Thao',
        icon: 'sports_soccer',
        link: '/shoes/the-thao',
        bgColor: '#fff3e0'
      }
    ]);

    // Trong một ứng dụng thực tế, dữ liệu này sẽ đến từ API
    const featuredProducts = ref<Product[]>([
      {
        id: 1,
        name: 'Giày Thể Thao Air Max',
        brand: 'Nike',
        price: 2500000,
        imageUrl: 'https://placehold.co/300x300?text=Nike+Air+Max'
      },
      {
        id: 2,
        name: 'Giày Adidas Ultraboost',
        brand: 'Adidas',
        price: 2800000,
        imageUrl: 'https://placehold.co/300x300?text=Adidas+Ultraboost'
      },
      {
        id: 3,
        name: 'Giày Converse Classic',
        brand: 'Converse',
        price: 1500000,
        imageUrl: 'https://placehold.co/300x300?text=Converse+Classic'
      },
      {
        id: 4,
        name: 'Giày Vans Old Skool',
        brand: 'Vans',
        price: 1800000,
        imageUrl: 'https://placehold.co/300x300?text=Vans+Old+Skool'
      }
    ]);

    const formatPrice = (price: number): string => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    return {
      categories,
      featuredProducts,
      formatPrice
    };
  }
});
</script>

<style scoped>
.home {
  width: 100%;
}

/* Hero Section */
.hero {
  width: 100%;
  height: 400px;
  background: linear-gradient(to right, #f5f7fa, #c3cfe2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  border-radius: 12px;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  padding: 0 20px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  max-width: 600px;
  color: #555;
}

.btn-primary {
  display: inline-block;
  padding: 12px 30px;
  background-color: #f63;
  color: white;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #e62;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-outline {
  display: inline-block;
  padding: 12px 30px;
  border: 2px solid #f63;
  color: #f63;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background-color: #f63;
  color: white;
}

/* Sections */
.section-title {
  text-align: center;
  margin-bottom: 40px;
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

/* Categories */
.categories {
  margin-bottom: 60px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.category-card {
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-10px);
}

.category-card a {
  text-decoration: none;
  color: #333;
}

.category-img {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-img .material-icons {
  font-size: 50px;
  color: #333;
}

.category-card h3 {
  padding: 15px;
  text-align: center;
  background-color: white;
  margin: 0;
}

/* Featured Products */
.featured-products {
  margin-bottom: 60px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

.product-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.product-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-card a {
  text-decoration: none;
  color: #333;
}

.product-img {
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
  color: #f63;
  font-weight: 600;
  margin: 0;
}

.view-all {
  text-align: center;
  margin-top: 40px;
}

/* Features */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
  text-align: center;
}

.feature {
  padding: 30px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.feature .material-icons {
  font-size: 40px;
  color: #f63;
  margin-bottom: 15px;
}

.feature h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
}

.feature p {
  margin: 0;
  color: #666;
}

/* Testimonials */
.testimonials {
  margin-bottom: 60px;
}

.testimonial {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin: 0 auto;
  max-width: 800px;
}

.testimonial-content p {
  font-style: italic;
  color: #555;
  line-height: 1.6;
  margin: 0 0 20px 0;
  font-size: 1.1rem;
}

.author-name {
  font-weight: 600;
  color: #333;
}

/* Newsletter */
.newsletter {
  background-color: white;
  padding: 60px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.newsletter-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.newsletter h2 {
  margin: 0 0 15px 0;
}

.newsletter p {
  color: #666;
  margin: 0 0 30px 0;
}

.newsletter-form {
  display: flex;
  gap: 10px;
}

.newsletter-form input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
}

.newsletter-form input:focus {
  outline: none;
  border-color: #f63;
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    height: 350px;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .hero p {
    font-size: 1rem;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .newsletter-form input,
  .newsletter-form button {
    width: 100%;
  }
}
</style>
