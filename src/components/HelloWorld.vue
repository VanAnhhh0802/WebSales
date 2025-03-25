<template>
  <div class="hello-world">
    <h2>{{ msg }}</h2>
    <p>
      This is a sample component demonstrating TypeScript with Vue 3.
      It uses proper typing for props and emits.
    </p>
    <button @click="emitMessage">Send Message to Parent</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  emits: ['message-sent'],
  setup(props, { emit }) {
    const emitMessage = (): void => {
      emit('message-sent', 'Hello from the HelloWorld component!');
    };

    return {
      emitMessage,
    };
  },
});
</script>

<style scoped>
.hello-world {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

h2 {
  color: #42b983;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}

button:hover {
  background-color: #3aa776;
}
</style>
