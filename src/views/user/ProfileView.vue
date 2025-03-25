<template>
  <div class="profile-view">
    <div v-if="!isAuthenticated" class="auth-required">
      <div class="auth-required-content">
        <span class="material-icons">account_circle</span>
        <h2>Yêu cầu đăng nhập</h2>
        <p>Bạn cần đăng nhập để xem thông tin tài khoản.</p>
        <div class="auth-buttons">
          <router-link to="/login" class="btn-primary">Đăng nhập</router-link>
          <router-link to="/register" class="btn-outline">Đăng ký</router-link>
        </div>
      </div>
    </div>
    
    <div v-else class="profile-container">
      <div class="profile-sidebar">
        <div class="user-info">
          <div class="avatar">
            <span class="material-icons">account_circle</span>
          </div>
          <h3>{{ userProfile?.name }}</h3>
          <p>{{ userProfile?.email }}</p>
        </div>
        
        <div class="sidebar-nav">
          <button 
            @click="activeTab = 'profile'" 
            :class="['sidebar-link', { active: activeTab === 'profile' }]"
          >
            <span class="material-icons">person</span>
            Thông tin tài khoản
          </button>
          <button 
            @click="activeTab = 'orders'" 
            :class="['sidebar-link', { active: activeTab === 'orders' }]"
          >
            <span class="material-icons">shopping_bag</span>
            Đơn hàng của tôi
          </button>
          <button 
            @click="activeTab = 'wishlist'" 
            :class="['sidebar-link', { active: activeTab === 'wishlist' }]"
          >
            <span class="material-icons">favorite</span>
            Sản phẩm yêu thích
          </button>
          <button 
            @click="activeTab = 'address'" 
            :class="['sidebar-link', { active: activeTab === 'address' }]"
          >
            <span class="material-icons">location_on</span>
            Địa chỉ giao hàng
          </button>
          <button 
            @click="activeTab = 'settings'" 
            :class="['sidebar-link', { active: activeTab === 'settings' }]"
          >
            <span class="material-icons">settings</span>
            Cài đặt tài khoản
          </button>
          <button 
            @click="handleLogout" 
            class="sidebar-link logout"
          >
            <span class="material-icons">logout</span>
            Đăng xuất
          </button>
        </div>
      </div>
      
      <div class="profile-content">
        <!-- Thông tin tài khoản -->
        <div v-if="activeTab === 'profile'" class="profile-tab">
          <div class="tab-header">
            <h2>Thông tin tài khoản</h2>
            <p>Quản lý thông tin cá nhân của bạn</p>
          </div>
          
          <form @submit.prevent="updateUserProfile" class="profile-form">
            <div class="form-row two-columns">
              <div class="form-group">
                <label for="name">Họ tên</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="profileForm.name" 
                  placeholder="Họ tên"
                >
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="profileForm.email" 
                  placeholder="Email"
                  disabled
                >
                <small>Email không thể thay đổi</small>
              </div>
            </div>
            
            <div class="form-row two-columns">
              <div class="form-group">
                <label for="phone">Số điện thoại</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="profileForm.phone" 
                  placeholder="Số điện thoại"
                >
              </div>
              
              <div class="form-group">
                <label for="birthdate">Ngày sinh</label>
                <input 
                  type="date" 
                  id="birthdate" 
                  v-model="profileForm.birthdate"
                >
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="address">Địa chỉ</label>
                <input 
                  type="text" 
                  id="address" 
                  v-model="profileForm.address" 
                  placeholder="Địa chỉ"
                >
              </div>
            </div>
            
            <div class="form-actions">
              <button 
                type="submit" 
                class="btn-primary" 
                :disabled="isLoading"
              >
                <span v-if="isLoading" class="loader"></span>
                <span v-else>Cập nhật thông tin</span>
              </button>
            </div>
            
            <div v-if="updateSuccess" class="success-message">
              <p>Thông tin tài khoản đã được cập nhật thành công!</p>
            </div>
            
            <div v-if="updateError" class="error-message">
              <p>{{ updateError }}</p>
            </div>
          </form>
        </div>
        
        <!-- Đơn hàng của tôi -->
        <div v-if="activeTab === 'orders'" class="orders-tab">
          <div class="tab-header">
            <h2>Đơn hàng của tôi</h2>
            <p>Theo dõi và quản lý đơn hàng của bạn</p>
          </div>
          
          <div class="orders-list">
            <div class="empty-state">
              <span class="material-icons">shopping_bag</span>
              <p>Bạn chưa có đơn hàng nào.</p>
              <router-link to="/shoes" class="btn-primary">Mua sắm ngay</router-link>
            </div>
          </div>
        </div>
        
        <!-- Sản phẩm yêu thích -->
        <div v-if="activeTab === 'wishlist'" class="wishlist-tab">
          <div class="tab-header">
            <h2>Sản phẩm yêu thích</h2>
            <p>Các sản phẩm bạn đã đánh dấu yêu thích</p>
          </div>
          
          <div class="wishlist-grid">
            <div class="empty-state">
              <span class="material-icons">favorite</span>
              <p>Bạn chưa có sản phẩm yêu thích nào.</p>
              <router-link to="/shoes" class="btn-primary">Khám phá ngay</router-link>
            </div>
          </div>
        </div>
        
        <!-- Địa chỉ giao hàng -->
        <div v-if="activeTab === 'address'" class="address-tab">
          <div class="tab-header">
            <h2>Địa chỉ giao hàng</h2>
            <p>Quản lý địa chỉ giao hàng của bạn</p>
          </div>
          
          <div class="address-list">
            <div class="empty-state">
              <span class="material-icons">location_on</span>
              <p>Bạn chưa có địa chỉ giao hàng nào.</p>
              <button class="btn-primary">Thêm địa chỉ mới</button>
            </div>
          </div>
        </div>
        
        <!-- Cài đặt tài khoản -->
        <div v-if="activeTab === 'settings'" class="settings-tab">
          <div class="tab-header">
            <h2>Cài đặt tài khoản</h2>
            <p>Quản lý cài đặt và bảo mật tài khoản của bạn</p>
          </div>
          
          <div class="settings-section">
            <h3>Thay đổi mật khẩu</h3>
            <form @submit.prevent="changePassword" class="settings-form">
              <div class="form-group">
                <label for="currentPassword">Mật khẩu hiện tại</label>
                <input type="password" id="currentPassword" v-model="passwordForm.currentPassword">
              </div>
              
              <div class="form-group">
                <label for="newPassword">Mật khẩu mới</label>
                <input type="password" id="newPassword" v-model="passwordForm.newPassword">
              </div>
              
              <div class="form-group">
                <label for="confirmNewPassword">Xác nhận mật khẩu mới</label>
                <input type="password" id="confirmNewPassword" v-model="passwordForm.confirmNewPassword">
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn-primary">Đổi mật khẩu</button>
              </div>
            </form>
          </div>
          
          <div class="settings-section">
            <h3>Thông báo</h3>
            <div class="notification-settings">
              <div class="setting-option">
                <div class="option-info">
                  <h4>Email thông báo</h4>
                  <p>Nhận email thông báo về đơn hàng, khuyến mãi và cập nhật</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="notificationSettings.email">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              
              <div class="setting-option">
                <div class="option-info">
                  <h4>Khuyến mãi và ưu đãi</h4>
                  <p>Nhận thông báo về các khuyến mãi và ưu đãi đặc biệt</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="notificationSettings.promotion">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore, User } from '@/stores/user';

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface NotificationSettings {
  email: boolean;
  promotion: boolean;
}

export default defineComponent({
  name: 'ProfileView',
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    
    // Auth state
    const isAuthenticated = computed(() => userStore.getAuthStatus.value);
    const userProfile = computed(() => userStore.getUserProfile.value);
    const isLoading = computed(() => userStore.getLoading.value);
    
    // UI state
    const activeTab = ref('profile');
    const updateSuccess = ref(false);
    const updateError = ref<string | null>(null);
    
    // Form data
    const profileForm = reactive<ProfileForm>({
      name: userProfile.value?.name || '',
      email: userProfile.value?.email || '',
      phone: userProfile.value?.phone || '',
      birthdate: '',
      address: userProfile.value?.address || ''
    });
    
    const passwordForm = reactive<PasswordForm>({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
    
    const notificationSettings = reactive<NotificationSettings>({
      email: true,
      promotion: false
    });
    
    // Cập nhật form dữ liệu khi user profile thay đổi
    onMounted(() => {
      if (userProfile.value) {
        profileForm.name = userProfile.value.name;
        profileForm.email = userProfile.value.email;
        profileForm.phone = userProfile.value.phone || '';
        profileForm.address = userProfile.value.address || '';
      }
    });
    
    // Cập nhật thông tin người dùng
    const updateUserProfile = async () => {
      updateSuccess.value = false;
      updateError.value = null;
      
      try {
        const success = await userStore.updateProfile({
          name: profileForm.name,
          phone: profileForm.phone,
          address: profileForm.address
        });
        
        if (success) {
          updateSuccess.value = true;
          
          // Tự động ẩn thông báo thành công sau 3 giây
          setTimeout(() => {
            updateSuccess.value = false;
          }, 3000);
        } else {
          updateError.value = 'Không thể cập nhật thông tin. Vui lòng thử lại sau.';
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        updateError.value = 'Đã xảy ra lỗi. Vui lòng thử lại sau.';
      }
    };
    
    // Thay đổi mật khẩu (trong ứng dụng thực tế sẽ gọi API)
    const changePassword = () => {
      // Kiểm tra mật khẩu mới khớp với xác nhận
      if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
        alert('Mật khẩu mới và xác nhận mật khẩu không khớp');
        return;
      }
      
      // Mô phỏng đổi mật khẩu thành công
      alert('Đổi mật khẩu thành công!');
      
      // Reset form
      passwordForm.currentPassword = '';
      passwordForm.newPassword = '';
      passwordForm.confirmNewPassword = '';
    };
    
    // Xử lý đăng xuất
    const handleLogout = () => {
      userStore.logout();
      router.push('/');
    };
    
    return {
      isAuthenticated,
      userProfile,
      isLoading,
      activeTab,
      profileForm,
      passwordForm,
      notificationSettings,
      updateSuccess,
      updateError,
      updateUserProfile,
      changePassword,
      handleLogout
    };
  }
});
</script>

<style scoped>
.profile-view {
  width: 100%;
}

/* Auth Required */
.auth-required {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
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

/* Profile Container */
.profile-container {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 30px;
}

/* Sidebar */
.profile-sidebar {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.user-info {
  padding: 30px 20px;
  text-align: center;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}

.avatar .material-icons {
  font-size: 3rem;
  color: #aaa;
}

.user-info h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.user-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.sidebar-nav {
  padding: 10px 0;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sidebar-link:hover {
  background-color: #f5f5f5;
  color: #f63;
}

.sidebar-link.active {
  background-color: #fff3ee;
  color: #f63;
  font-weight: 500;
  border-right: 3px solid #f63;
}

.sidebar-link.logout {
  color: #f44336;
  border-top: 1px solid #eee;
  margin-top: 10px;
}

.sidebar-link.logout:hover {
  background-color: #fee8e7;
}

/* Profile Content */
.profile-content {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 30px;
}

.tab-header {
  margin-bottom: 30px;
}

.tab-header h2 {
  margin: 0 0 5px 0;
  color: #333;
}

.tab-header p {
  margin: 0;
  color: #666;
}

/* Form Styling */
.profile-form,
.settings-form {
  margin-bottom: 20px;
}

.form-row {
  margin-bottom: 20px;
}

.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  color: #555;
}

.form-group input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #f63;
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.form-group small {
  margin-top: 5px;
  color: #888;
  font-size: 0.8rem;
}

.form-actions {
  margin-top: 30px;
}

.btn-primary,
.btn-outline {
  display: inline-block;
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
}

.btn-primary {
  background-color: #f63;
  color: white;
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

.btn-outline {
  border: 2px solid #f63;
  color: #f63;
  background-color: transparent;
}

.btn-outline:hover {
  background-color: #f63;
  color: white;
}

.success-message {
  margin-top: 15px;
  padding: 10px;
  background-color: #e8f5e9;
  border-left: 4px solid #4caf50;
  border-radius: 4px;
}

.success-message p {
  margin: 0;
  color: #2e7d32;
}

.error-message {
  margin-top: 15px;
  padding: 10px;
  background-color: #ffebee;
  border-left: 4px solid #f44336;
  border-radius: 4px;
}

.error-message p {
  margin: 0;
  color: #f44336;
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

/* Tabs */
.orders-tab,
.wishlist-tab,
.address-tab,
.settings-tab,
.profile-tab {
  min-height: 40vh;
}

/* Empty States */
.empty-state {
  text-align: center;
  padding: 40px 20px;
}

.empty-state .material-icons {
  font-size: 3rem;
  color: #ddd;
  margin-bottom: 15px;
}

.empty-state p {
  margin: 0 0 20px 0;
  color: #666;
}

/* Settings */
.settings-section {
  margin-bottom: 40px;
}

.settings-section h3 {
  font-size: 1.2rem;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.notification-settings {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.option-info h4 {
  margin: 0 0 5px 0;
  font-size: 1rem;
}

.option-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #f63;
}

input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

/* Responsive */
@media (max-width: 768px) {
  .profile-container {
    grid-template-columns: 1fr;
  }
  
  .two-columns {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}
</style>