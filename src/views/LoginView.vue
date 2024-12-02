<template>
	<div class="login-container">
	  <div class="login-box">
		<h2>Login</h2>
		<form @submit.prevent="handleLogin">
		  <label for="username">Username</label>
		  <input
			id="username"
			type="text"
			v-model="credentials.username"
			placeholder="Enter your username"
			required
		  />
  
		  <label for="password">Password</label>
		  <input
			id="password"
			type="password"
			v-model="credentials.password"
			placeholder="Enter your password"
			required
		  />
  
		  <button type="submit" class="login-button">Login</button>
		</form>
	  </div>
	</div>
  </template>
  
  <script>
  import { loginUser } from '@/api/users';
  
  export default {
	name: 'LoginView',
	data() {
	  return {
		credentials: {
		  username: '',
		  password: '',
		},
	  };
	},
	methods: {
	  async handleLogin() {
		try {
		  const response = await loginUser(this.credentials);
		  // 假设后端返回一个 token 或用户信息
		  localStorage.setItem('authToken', response.data.token);
		  this.$router.push('/dashboard'); // 跳转到仪表板
		} catch (error) {
		  console.error('登录失败:', error);
		  alert('Invalid username or password');
		}
	  },
	},
  };
  </script>
  
  <style scoped>
  .login-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: #f4f4f4;
  }
  
  .login-box {
	background: #fff;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	text-align: center;
	width: 300px;
  }
  
  .login-box h2 {
	margin-bottom: 20px;
  }
  
  .login-box form label {
	display: block;
	margin-bottom: 5px;
	font-weight: bold;
  }
  
  .login-box form input {
	width: 100%;
	padding: 10px;
	margin-bottom: 15px;
	border: 1px solid #ddd;
	border-radius: 4px;
  }
  
  .login-box .login-button {
	width: 100%;
	padding: 10px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
  }
  
  .login-box .login-button:hover {
	background-color: #0056b3;
  }
  </style>
  