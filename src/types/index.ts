// User type definition
export interface User {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  bio: string;
}

// Other types can be defined here as needed
export interface CounterOptions {
  min?: number;
  max?: number;
}
