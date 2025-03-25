<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue 3 + TypeScript Application" @message-sent="onMessageReceived" />
    
    <div class="demo-section">
      <h2>TypeScript Component Demos</h2>
      
      <section class="demo-component">
        <h3>User Profile Example</h3>
        <UserProfile :user="sampleUser" />
      </section>
      
      <section class="demo-component">
        <h3>Counter Example (Using Composables)</h3>
        <CounterButton :initial-count="5" @count-changed="onCountChanged" />
        <p v-if="lastCount !== null" class="count-message">
          Last emitted count: {{ lastCount }}
        </p>
      </section>
    </div>
    
    <div v-if="message" class="message-box">
      <p>Message from component: "{{ message }}"</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import UserProfile from '@/components/UserProfile.vue';
import CounterButton from '@/components/CounterButton.vue';
import { User } from '@/types';

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
    UserProfile,
    CounterButton,
  },
  setup() {
    const message = ref<string | null>(null);
    const lastCount = ref<number | null>(null);
    
    const sampleUser: User = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      joinDate: '2023-01-15',
      bio: 'Frontend developer with a passion for Vue and TypeScript. Enjoys building responsive and accessible user interfaces.',
    };
    
    const onMessageReceived = (msg: string) => {
      message.value = msg;
      
      // Clear the message after 3 seconds
      setTimeout(() => {
        message.value = null;
      }, 3000);
    };
    
    const onCountChanged = (count: number) => {
      lastCount.value = count;
    };
    
    return {
      message,
      sampleUser,
      lastCount,
      onMessageReceived,
      onCountChanged,
    };
  },
});
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  margin-top: 40px;
}

.demo-component {
  margin: 30px 0;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.demo-component h3 {
  margin-top: 0;
  color: #42b983;
}

.message-box {
  margin-top: 30px;
  padding: 15px;
  background-color: #f0f9ff;
  border-left: 4px solid #42b983;
  border-radius: 4px;
}

.count-message {
  margin-top: 15px;
  font-style: italic;
  color: #666;
}
</style>
