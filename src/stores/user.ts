import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const isAuthenticated = ref(false);

  // Lấy thông tin người dùng từ localStorage khi khởi tạo store
  if (typeof window !== 'undefined') {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        currentUser.value = JSON.parse(savedUser);
        isAuthenticated.value = true;
      } catch (err) {
        console.error('Error parsing user from localStorage:', err);
      }
    }
  }

  // Getters
  const getUserProfile = computed(() => currentUser.value);
  const getAuthStatus = computed(() => isAuthenticated.value);
  const getLoading = computed(() => loading.value);
  const getError = computed(() => error.value);

  // Actions
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    loading.value = true;
    error.value = null;

    try {
      // Trong ứng dụng thực tế, đây sẽ là lệnh gọi API để kiểm tra thông tin đăng nhập
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials)
      // });
      // const data = await response.json();

      // Giả lập kiểm tra thông tin đăng nhập
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Demo account
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        const user: User = {
          id: 1,
          name: 'Người dùng mẫu',
          email: 'user@example.com',
          phone: '0123456789',
          address: '123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh'
        };

        currentUser.value = user;
        isAuthenticated.value = true;
        
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('user', JSON.stringify(user));
        
        return true;
      } else {
        error.value = 'Email hoặc mật khẩu không đúng';
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      error.value = 'Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    loading.value = true;
    error.value = null;

    try {
      // Kiểm tra mật khẩu và xác nhận mật khẩu
      if (userData.password !== userData.confirmPassword) {
        error.value = 'Mật khẩu và xác nhận mật khẩu không khớp';
        return false;
      }

      // Trong ứng dụng thực tế, đây sẽ là lệnh gọi API để đăng ký tài khoản
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData)
      // });
      // const data = await response.json();

      // Giả lập đăng ký
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Giả sử đăng ký thành công và tự động đăng nhập
      const user: User = {
        id: Math.floor(Math.random() * 1000) + 1, // ID ngẫu nhiên
        name: userData.name,
        email: userData.email
      };

      currentUser.value = user;
      isAuthenticated.value = true;
      
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      return true;
    } catch (err) {
      console.error('Register error:', err);
      error.value = 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    currentUser.value = null;
    isAuthenticated.value = false;
    
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem('user');
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    loading.value = true;
    error.value = null;

    try {
      // Trong ứng dụng thực tế, đây sẽ là lệnh gọi API để cập nhật thông tin
      // const response = await fetch('/api/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData)
      // });
      // const data = await response.json();

      // Giả lập cập nhật thông tin
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (currentUser.value) {
        // Cập nhật thông tin người dùng
        currentUser.value = {
          ...currentUser.value,
          ...userData
        };
        
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('user', JSON.stringify(currentUser.value));
        
        return true;
      } else {
        error.value = 'Không có thông tin người dùng để cập nhật';
        return false;
      }
    } catch (err) {
      console.error('Update profile error:', err);
      error.value = 'Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại sau.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    currentUser,
    loading,
    error,
    isAuthenticated,
    getUserProfile,
    getAuthStatus,
    getLoading,
    getError,
    login,
    register,
    logout,
    updateProfile
  };
});