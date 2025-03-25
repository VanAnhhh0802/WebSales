import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Shoe } from './shoe';

export interface CartItem {
  id: number;
  shoeId: number;
  name: string;
  price: number;
  quantity: number;
  size: number;
  color: string;
  imageUrl: string;
  discount?: number;
}

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const getCartItems = computed(() => cartItems.value);
  
  const getCartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      const itemPrice = item.discount 
        ? item.price * (1 - item.discount / 100) 
        : item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
  });
  
  const getCartCount = computed(() => {
    return cartItems.value.reduce((count, item) => count + item.quantity, 0);
  });

  // Actions
  const addToCart = (shoe: Shoe, quantity: number, size: number, color: string) => {
    // Kiểm tra xem đã có item này trong giỏ hàng chưa (với cùng size và color)
    const existingItemIndex = cartItems.value.findIndex(
      item => item.shoeId === shoe.id && item.size === size && item.color === color
    );

    if (existingItemIndex !== -1) {
      // Nếu có, tăng số lượng
      cartItems.value[existingItemIndex].quantity += quantity;
    } else {
      // Nếu chưa, thêm mới vào giỏ hàng
      const newItem: CartItem = {
        id: Date.now(), // ID ngẫu nhiên cho cart item
        shoeId: shoe.id,
        name: shoe.name,
        price: shoe.price,
        quantity: quantity,
        size: size,
        color: color,
        imageUrl: shoe.imageUrl,
        discount: shoe.discount
      };
      
      cartItems.value.push(newItem);
    }

    // Lưu giỏ hàng vào localStorage
    saveCartToStorage();
  };

  const updateCartItem = (itemId: number, quantity: number) => {
    const itemIndex = cartItems.value.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
      if (quantity > 0) {
        cartItems.value[itemIndex].quantity = quantity;
      } else {
        // Nếu số lượng <= 0, xóa khỏi giỏ hàng
        cartItems.value.splice(itemIndex, 1);
      }
      
      // Lưu giỏ hàng vào localStorage
      saveCartToStorage();
    }
  };

  const removeCartItem = (itemId: number) => {
    const itemIndex = cartItems.value.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
      cartItems.value.splice(itemIndex, 1);
      
      // Lưu giỏ hàng vào localStorage
      saveCartToStorage();
    }
  };

  const clearCart = () => {
    cartItems.value = [];
    
    // Xóa giỏ hàng trong localStorage
    localStorage.removeItem('cart');
  };

  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem('cart');
    
    if (savedCart) {
      try {
        cartItems.value = JSON.parse(savedCart);
      } catch (err) {
        console.error('Error parsing cart from localStorage:', err);
      }
    }
  };

  const saveCartToStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  };

  // Tải giỏ hàng từ localStorage khi khởi tạo store
  if (typeof window !== 'undefined') {
    loadCartFromStorage();
  }

  return {
    cartItems,
    loading,
    error,
    getCartItems,
    getCartTotal,
    getCartCount,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
  };
});