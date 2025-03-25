<template>
  <div class="login-view">
    <div class="auth-container">
      <div class="auth-header">
        <h1>Đăng nhập</h1>
        <p>Chào mừng bạn quay trở lại! Vui lòng đăng nhập để tiếp tục.</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="loginForm.email" 
            required
            :class="{ 'error': validationErrors.email }"
          >
          <p v-if="validationErrors.email" class="error-message">{{ validationErrors.email }}</p>
        </div>
        
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <div class="password-input">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              v-model="loginForm.password" 
              required
              :class="{ 'error': validationErrors.password }"
            >
            <button 
              type="button" 
              class="toggle-password" 
              @click="showPassword = !showPassword"
            >
              <span class="material-icons">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
          <p v-if="validationErrors.password" class="error-message">{{ validationErrors.password }}</p>
        </div>
        
        <div class="form-options">
          <div class="remember-me">
            <input type="checkbox" id="remember" v-model="loginForm.remember">
            <label for="remember">Ghi nhớ đăng nhập</label>
          </div>
          
          <a href="#" class="forgot-password">Quên mật khẩu?</a>
        </div>
        
        <button type="submit" class="btn-primary" :disabled="isLoading">
          <span v-if="isLoading" class="loader"></span>
          <span v-else>Đăng nhập</span>
        </button>
        
        <div class="auth-error" v-if="loginError">
          <p>{{ loginError }}</p>
        </div>
      </form>
      
      <div class="social-login">
        <div class="divider">
          <span>hoặc đăng nhập với</span>
        </div>
        
        <div class="social-buttons">
          <button class="btn-social btn-google">
            <span class="material-icons">mail</span>
            Google
          </button>
          
          <button class="btn-social btn-facebook">
            <span class="material-icons">facebook</span>
            Facebook
          </button>
        </div>
      </div>
      
      <div class="auth-footer">
        <p>Chưa có tài khoản? <router-link to="/register">Đăng ký</router-link></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default defineComponent({
  name: 'LoginView',
  setup() {
    const router = useRouter();
    
    // Form state
    const loginForm = reactive<LoginForm>({
      email: '',
      password: '',
      remember: false
    });
    
    // UI state
    const showPassword = ref(false);
    const isLoading = ref(false);
    const loginError = ref<string | null>(null);
    const validationErrors = reactive<ValidationErrors>({});
    
    // Validate form
    const validateForm = (): boolean => {
      // Reset errors
      Object.keys(validationErrors).forEach(key => {
        delete validationErrors[key as keyof ValidationErrors];
      });
      
      let isValid = true;
      
      // Validate email
      if (!loginForm.email.trim()) {
        validationErrors.email = 'Vui lòng nhập email';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email.trim())) {
        validationErrors.email = 'Email không hợp lệ';
        isValid = false;
      }
      
      // Validate password
      if (!loginForm.password) {
        validationErrors.password = 'Vui lòng nhập mật khẩu';
        isValid = false;
      }
      
      return isValid;
    };
    
    // Handle login
    const handleLogin = async () => {
      if (!validateForm()) {
        return;
      }
      
      isLoading.value = true;
      loginError.value = null;
      
      try {
        // Mô phỏng gọi API đăng nhập (trong ứng dụng thực tế, đây là nơi gọi API)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mô phỏng đăng nhập thành công với email mặc định
        if (loginForm.email === 'user@example.com' && loginForm.password === 'password') {
          // Lưu thông tin đăng nhập vào localStorage nếu "remember me" được chọn
          if (loginForm.remember) {
            localStorage.setItem('user', JSON.stringify({ 
              email: loginForm.email,
              name: 'Người dùng mẫu'
            }));
          }
          
          // Chuyển hướng đến trang chủ hoặc trang được bảo vệ
          router.push('/profile');
        } else {
          // Hiển thị lỗi đăng nhập
          loginError.value = 'Email hoặc mật khẩu không đúng';
        }
      } catch (error) {
        console.error('Login error:', error);
        loginError.value = 'Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.';
      } finally {
        isLoading.value = false;
      }
    };
    
    return {
      loginForm,
      showPassword,
      isLoading,
      loginError,
      validationErrors,
      handleLogin
    };
  }
});
</script>

<style scoped>
.login-view {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.auth-container {
  width: 100%;
  max-width: 450px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  padding: 40px 30px;
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-header h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.8rem;
}

.auth-header p {
  color: #666;
  margin: 0;
}

.auth-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #f63;
}

.form-group input.error {
  border-color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: 0.85rem;
  margin: 5px 0 0 0;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 5px;
}

.remember-me input {
  cursor: pointer;
}

.forgot-password {
  color: #f63;
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-password:hover {
  text-decoration: underline;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background-color: #f63;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
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

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.auth-error {
  margin-top: 15px;
  padding: 10px;
  background-color: #ffebee;
  border-left: 4px solid #f44336;
  border-radius: 4px;
}

.auth-error p {
  margin: 0;
  color: #f44336;
}

.social-login {
  margin: 30px 0;
}

.divider {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #eee;
}

.divider span {
  padding: 0 15px;
  color: #777;
  font-size: 0.9rem;
}

.social-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.btn-social {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-social:hover {
  background-color: #f5f5f5;
}

.btn-google {
  color: #db4437;
}

.btn-facebook {
  color: #4267B2;
}

.auth-footer {
  text-align: center;
  margin-top: 20px;
}

.auth-footer p {
  margin: 0;
  color: #666;
}

.auth-footer a {
  color: #f63;
  text-decoration: none;
  font-weight: 600;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>