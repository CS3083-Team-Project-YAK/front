<template>
  <form @submit.prevent="handleSignUp">
    <h2>Sign Up</h2>
    <label for="full_name">Full Name</label>
    <input 
      v-model="full_name" 
      id="full_name" 
      type="text" 
      placeholder="Enter your full name" 
      required 
    />
    <label for="username">Username</label>
    <input 
      v-model="username" 
      id="username" 
      type="text" 
      placeholder="Enter your username" 
      required 
    />
    <label for="email_address">Email Address</label>
    <input 
      v-model="email_address" 
      id="email_address" 
      type="email" 
      placeholder="Enter your email" 
      required 
    />
    <label for="password">Password</label>
    <input 
      v-model="password" 
      id="password" 
      type="password" 
      placeholder="Enter your password" 
      required 
    />
    <button type="submit">Sign Up</button>
  </form>
</template>

<script>
import { registerUser } from '@/api/users'; // 确保路径正确

export default {
  name: 'SignUpForm',
  data() {
    return {
      full_name: '',
      username: '',
      email_address: '',
      password: '',
    };
  },
  methods: {
    async handleSignUp() {
      try {
        // 确保字段名与后端一致
        const response = await registerUser({
          full_name: this.full_name,
          username: this.username,
          email_address: this.email_address,
          password: this.password,
        });

        alert('Your account has been created successfully!');
        console.log('Response:', response.data);

        // 重置表单
        this.full_name = '';
        this.username = '';
        this.email_address = '';
        this.password = '';
      } catch (error) {
        // 捕获错误并反馈给用户
        const errorMessage = error.response?.data?.error || error.message;
        alert(`Registration failed: ${errorMessage}`);
        console.error('Error:', error);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}
label {
  font-weight: bold;
  display: block;
  margin-top: 10px;
}
input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  width: 100%;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 20px;
}
button:hover {
  background-color: #0056b3;
}
</style>
