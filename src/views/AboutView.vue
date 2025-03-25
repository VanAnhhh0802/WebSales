<template>
  <div class="about">
    <h1>About This Project</h1>
    <div class="about-content">
      <p>
        This is a sample Vue 3 project with TypeScript integration, demonstrating:
      </p>
      <ul>
        <li>Vue 3 Composition API</li>
        <li>TypeScript integration with Vue components</li>
        <li>Type-safe props and emits</li>
        <li>Custom TypeScript interfaces and types</li>
        <li>Component-based architecture</li>
        <li>Vue Router integration</li>
        <li>Custom composables for reusable logic</li>
      </ul>
      
      <div class="tech-stack">
        <h2>Tech Stack</h2>
        <div class="stack-items">
          <div class="stack-item">
            <h3>Vue 3</h3>
            <p>The progressive JavaScript framework with Composition API</p>
          </div>
          <div class="stack-item">
            <h3>TypeScript</h3>
            <p>Typed JavaScript at Any Scale</p>
          </div>
          <div class="stack-item">
            <h3>Vue Router</h3>
            <p>The official router for Vue.js</p>
          </div>
          <div class="stack-item">
            <h3>Vite</h3>
            <p>Next Generation Frontend Tooling</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutView',
});
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #42b983;
  margin-bottom: 30px;
}

.about-content {
  background-color: #f8f8f8;
  padding: 30px;
  border-radius: 8px;
}

ul {
  line-height: 1.6;
}

.tech-stack {
  margin-top: 40px;
}

.stack-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stack-item {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stack-item h3 {
  color: #42b983;
  margin-top: 0;
}
</style>
