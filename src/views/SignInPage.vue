<template>
	<div class="auth-page">
	  <div class="auth-container">
		<div class="auth-toggle">
		  <button :class="{ active: isLogin }" @click="toggleForm('login')">Login</button>
		  <button :class="{ active: !isLogin }" @click="toggleForm('signup')">Sign Up</button>
		</div>
		<div class="auth-content">
		  <h2 v-if="isLogin">Sign In</h2>
		  <h2 v-else>Sign Up</h2>
		  <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
		  <form v-if="isLogin" @submit.prevent="handleLogin">
			<div class="form-group">
			  <label for="login-username">Username</label>
			  <input
				id="login-username"
				v-model="credentials.username"
				type="text"
				placeholder="Enter your username"
				required
			  />
			</div>
			<div class="form-group">
			  <label for="login-password">Password</label>
			  <input
				id="login-password"
				v-model="credentials.password"
				type="password"
				placeholder="Enter your password"
				required
			  />
			</div>
			<button class="auth-button" type="submit">Login</button>
		  </form>
		  <form v-else @submit.prevent="handleSignUp">
			<div class="form-group">
			  <label for="signup-fullname">Full Name</label>
			  <input
				id="signup-fullname"
				v-model="registerData.full_name"
				type="text"
				placeholder="Enter your full name"
				required
			  />
			</div>
			<div class="form-group">
			  <label for="signup-username">Username</label>
			  <input
				id="signup-username"
				v-model="registerData.username"
				type="text"
				placeholder="Choose a username"
				required
			  />
			</div>
			<div class="form-group">
			  <label for="signup-email">Email Address</label>
			  <input
				id="signup-email"
				v-model="registerData.email_address"
				type="email"
				placeholder="Enter your email address"
				required
			  />
			</div>
			<div class="form-group">
			  <label for="signup-password">Password</label>
			  <input
				id="signup-password"
				v-model="registerData.password"
				type="password"
				placeholder="Choose a password"
				required
			  />
			</div>
			<button class="auth-button" type="submit">Sign Up</button>
		  </form>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  import axios from 'axios';
  import { registerUser, loginUser } from '@/api/users';
  import apiClient from "../api/api";
  
  export default {
	name: 'SignInPage',
	data() {
	  return {
		isLogin: true,
		successMessage: '',
		credentials: {
		  username: '',
		  password: '',
		},
		registerData: {
		  full_name: '',
		  username: '',
		  email_address: '',
		  password: '',
		},
	  };
	},
	methods: {
	  toggleForm(formType) {
		this.isLogin = formType === 'login';
		this.successMessage = '';
	  },
	  async handleLogin() {
		try {
		  const response = await loginUser(this.credentials);
		  localStorage.setItem('authToken', response.data.token);
		  apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
		  this.$router.push('/dashboard');
		} catch (error) {
		  alert('Login failed: Invalid username or password');
		  console.error(error);
		}
	  },
	  async handleSignUp() {
		try {
		  await registerUser(this.registerData);
		  this.successMessage = 'Your account has been created.';
		  this.isLogin = true;
		  this.registerData = { full_name: '', username: '', email_address: '', password: '' };
		} catch (error) {
		  alert('Registration failed: ' + (error.response?.data?.error || error.message));
		  console.error(error);
		}
	  },
	},
  };
  </script>
  
  <style scoped>
  .auth-page {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background: white;
  }
  
  .auth-container {
	background: white;
	border-radius: 12px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
	width: 400px;
	padding: 20px;
	text-align: center;
  }
  
  .auth-toggle {
	display: flex;
	margin-bottom: 20px;
	border-bottom: 2px solid #f0f0f0;
  }
  
  .auth-toggle button {
	flex: 1;
	padding: 10px;
	border: none;
	background: none;
	font-weight: bold;
	cursor: pointer;
  }
  
  .auth-toggle button.active {
	color: white;
	background: #007bff;
	border-radius: 5px 5px 0 0;
  }
  
  .auth-content h2 {
	margin-bottom: 10px;
	color: #333;
  }
  
  .form-group {
	margin-bottom: 15px;
	text-align: left;
  }
  
  .form-group label {
	display: block;
	font-weight: bold;
	margin-bottom: 5px;
  }
  
  .form-group input {
	width: 100%;
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
  }
  
  .auth-button {
	width: 100%;
	padding: 10px;
	border: none;
	border-radius: 5px;
	background: #007bff;
	color: white;
	font-weight: bold;
	cursor: pointer;
	margin-top: 10px;
  }
  
  .auth-button:hover {
	background: #0056b3;
  }
  
  .success-message {
	color: green;
	font-weight: bold;
	margin-bottom: 15px;
  }
  </style>
  