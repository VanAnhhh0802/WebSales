import { ref } from 'vue';
/**
 * A composable function for managing a counter state
 * @param initialValue The initial value of the counter
 * @param options Additional options for the counter behavior
 * @returns An object containing the counter state and methods
 */
export function useCounter(initialValue = 0, options = {}) {
    const count = ref(initialValue);
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
//# sourceMappingURL=useCounter.js.map