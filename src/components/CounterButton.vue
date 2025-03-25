<template>
  <div class="counter-button">
    <h3>Counter Component</h3>
    <p>Current count: <strong>{{ count }}</strong></p>
    <div class="buttons">
      <button @click="increment">Increment</button>
      <button @click="decrement">Decrement</button>
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCounter } from '@/composables/useCounter';

export default defineComponent({
  name: 'CounterButton',
  props: {
    initialCount: {
      type: Number,
      default: 0,
    },
  },
  emits: ['count-changed'],
  setup(props, { emit }) {
    const { count, increment, decrement, reset } = useCounter(props.initialCount);

    // Watch for changes in count and emit to parent
    const incrementWithEmit = () => {
      increment();
      emit('count-changed', count.value);
    };

    const decrementWithEmit = () => {
      decrement();
      emit('count-changed', count.value);
    };

    const resetWithEmit = () => {
      reset();
      emit('count-changed', count.value);
    };

    return {
      count,
      increment: incrementWithEmit,
      decrement: decrementWithEmit,
      reset: resetWithEmit,
    };
  },
});
</script>

<style scoped>
.counter-button {
  background-color: #f7f7f7;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  max-width: 300px;
  margin: 0 auto;
}

h3 {
  margin-top: 0;
  color: #333;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:nth-child(2) {
  background-color: #e74c3c;
}

button:nth-child(3) {
  background-color: #7f8c8d;
}

button:hover {
  opacity: 0.9;
}
</style>
