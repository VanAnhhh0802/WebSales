import { ref, Ref } from 'vue';
import { CounterOptions } from '@/types';

/**
 * A composable function for managing a counter state
 * @param initialValue The initial value of the counter
 * @param options Additional options for the counter behavior
 * @returns An object containing the counter state and methods
 */
export function useCounter(initialValue = 0, options: CounterOptions = {}) {
  const count: Ref<number> = ref(initialValue);
  
  const increment = () => {
    if (options.max !== undefined && count.value >= options.max) {
      return;
    }
    count.value++;
  };
  
  const decrement = () => {
    if (options.min !== undefined && count.value <= options.min) {
      return;
    }
    count.value--;
  };
  
  const reset = () => {
    count.value = initialValue;
  };
  
  return {
    count,
    increment,
    decrement,
    reset,
  };
}
