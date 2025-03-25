<template>
  <div class="user-profile">
    <h2>User Profile</h2>
    <div class="profile-content">
      <div v-if="user">
        <div class="user-info">
          <div class="info-item">
            <strong>Name:</strong> {{ user.name }}
          </div>
          <div class="info-item">
            <strong>Email:</strong> {{ user.email }}
          </div>
          <div class="info-item">
            <strong>Joined:</strong> {{ user.joinDate }}
          </div>
        </div>
        <div class="user-bio">
          <h3>Bio</h3>
          <p>{{ user.bio }}</p>
        </div>
      </div>
      <div v-else class="loading">
        Loading user data...
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { User } from '@/types';

export default defineComponent({
  name: 'UserProfile',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
    showDetails: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const userDetails = computed(() => {
      if (!props.user) return null;
      
      return {
        ...props.user,
        // We could process or format data here if needed
      };
    });

    return {
      userDetails,
    };
  },
});
</script>

<style scoped>
.user-profile {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.profile-content {
  margin-top: 15px;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
}

.info-item {
  padding: 5px 0;
}

.user-bio {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
}

.user-bio h3 {
  margin-top: 0;
  color: #42b983;
}

.loading {
  font-style: italic;
  color: #888;
}
</style>
