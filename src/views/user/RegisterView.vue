<template>
  <div class="register-view">
    <div class="auth-container">
      <div class="auth-header">
        <h1>Đăng ký tài khoản</h1>
        <p>Tạo tài khoản miễn phí để mua sắm và theo dõi đơn hàng.</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="name">Họ tên <span class="required">*</span></label>
          <input 
            type="text" 
            id="name" 
            v-model="registerForm.name" 
            required
            :class="{ 'error': validationErrors.name }"
          >
          <p v-if="validationErrors.name" class="error-message">{{ validationErrors.name }}</p>
        </div>
        
        <div class="form-group">
          <label for="email">Email <span class="required">*</span></label>
          <input 
            type="email" 
            id="email" 
            v-model="registerForm.email" 
            required
            :class="{ 'error': validationErrors.email }"
          >
          <p v-if="validationErrors.email" class="error-message">{{ validationErrors.email }}</p>
        </div>
        
        <div class="form-group">
          <label for="password">Mật khẩu <span class="required">*</span></label>
          <div class="password-input">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              v-model="registerForm.password" 
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
          <p class="password-hint">Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số</p>
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">Xác nhận mật khẩu <span class="required">*</span></label>
          <div class="password-input">
            <input 
              :type="showConfirmPassword ? 'text' : 'password'" 
              id="confirmPassword" 
              v-model="registerForm.confirmPassword" 
              required
              :class="{ 'error': validationErrors.confirmPassword }"
            >
            <button 
              type="button" 
              class="toggle-password" 
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <span class="material-icons">{{ showConfirmPassword ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
          <p v-if="validationErrors.confirmPassword" class="error-message">{{ validationErrors.confirmPassword }}</p>
        </div>
        
        <div class="form-options">
          <div class="terms-agreement">
            <input type="checkbox" id="terms" v-model="registerForm.agreeToTerms">
            <label for="terms">
              Tôi đồng ý với <a href="#" class="terms-link">Điều khoản dịch vụ</a> và <a href="#" class="terms-link">Chính sách riêng tư</a>
            </label>
          </div>
          <p v-if="validationErrors.agreeToTerms" class="error-message">{{ validationErrors.agreeToTerms }}</p>
        </div>
        
        <button type="submit" class="btn-primary" :disabled="isLoading || !registerForm.agreeToTerms">
          <span v-if="isLoading" class="loader"></span>
          <span v-else>Đăng ký</span>
        </button>
        
        <div class="auth-error" v-if="registerError">
          <p>{{ registerError }}</p>
        </div>
      </form>
      
      <div class="social-login">
        <div class="divider">
          <span>hoặc đăng ký với</span>
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
        <p>Đã có tài khoản? <router-link to="/login">Đăng nhập</router-link></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore, RegisterData } from '@/stores/user';

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

interface RegisterForm extends RegisterData {
  agreeToTerms: boolean;
}

export default defineComponent({
  name: 'RegisterView',
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    
    // Form state
    const registerForm = reactive<RegisterForm>({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    });
    
    // UI state
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const isLoading = computed(() => userStore.getLoading.value);
    const registerError = computed(() => userStore.getError.value);
    const validationErrors = reactive<ValidationErrors>({});
    
    // Validate form
    const validateForm = (): boolean => {
      // Reset errors
      Object.keys(validationErrors).forEach(key => {
        delete validationErrors[key as keyof ValidationErrors];
      });
      
      let isValid = true;
      
      // Validate name
      if (!registerForm.name.trim()) {
        validationErrors.name = 'Vui lòng nhập họ tên';
        isValid = false;
      }
      
      // Validate email
      if (!registerForm.email.trim()) {
        validationErrors.email = 'Vui lòng nhập email';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email.trim())) {
        validationErrors.email = 'Email không hợp lệ';
        isValid = false;
      }
      
      // Validate password
      if (!registerForm.password) {
        validationErrors.password = 'Vui lòng nhập mật khẩu';
        isValid = false;
      } else if (registerForm.password.length < 8) {
        validationErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
        isValid = false;
      } else if (!/(?=.*[A-Za-z])(?=.*\d).+/.test(registerForm.password)) {
        validationErrors.password = 'Mật khẩu phải bao gồm cả chữ cái và số';
        isValid = false;
      }
      
      // Validate confirm password
      if (!registerForm.confirmPassword) {
        validationErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
        isValid = false;
      } else if (registerForm.confirmPassword !== registerForm.password) {
        validationErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        isValid = false;
      }
      
      // Validate terms agreement
      if (!registerForm.agreeToTerms) {
        validationErrors.agreeToTerms = 'Bạn phải đồng ý với điều khoản dịch vụ để tiếp tục';
        isValid = false;
      }
      
      return isValid;
    };
    
    // Handle register
    const handleRegister = async () => {
      if (!validateForm()) {
        return;
      }
      
      const { name, email, password, confirmPassword } = registerForm;
      
      const success = await userStore.register({
        name,
        email,
        password,
        confirmPassword
      });
      
      if (success) {
        // Chuyển hướng đến trang chủ hoặc trang hồ sơ người dùng
        router.push('/profile');
      }
    };
    
    return {
      registerForm,
      showPassword,
      showConfirmPassword,
      isLoading,
      registerError,
      validationErrors,
      handleRegister
    };
  }
});
</script>

<style scoped>
.register-view {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.auth-container {
  width: 100%;
  max-width: 550px;
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

.required {
  color: #f63;
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

.password-hint {
  margin: 5px 0 0 0;
  font-size: 0.85rem;
  color: #666;
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
  margin-bottom: 25px;
}

.terms-agreement {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.terms-agreement input {
  margin-top: 3px;
  cursor: pointer;
}

.terms-agreement label {
  font-size: 0.9rem;
  color: #555;
}

.terms-link {
  color: #f63;
  text-decoration: none;
}

.terms-link:hover {
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