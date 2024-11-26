<template>
    <div id="signInForm">
      <h2>Sign In</h2>
      <form @submit.prevent="onSubmit">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="formData.username"
          placeholder="Enter your username"
          required
        />
        <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
  
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          placeholder="Enter your password"
          required
        />
        <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
  
        <button type="submit">Sign In</button>
        <div v-if="errors.general" class="error-message">{{ errors.general }}</div>
      </form>
      <span class="toggle-link" @click="$emit('toggleForm')">Don't have an account? Sign Up</span>
    </div>
  </template>
  
  <script>
  export default {
    name: "SignInForm",
    props: ["onSignIn"],
    data() {
      return {
        formData: {
          username: "",
          password: "",
        },
        errors: {},
      };
    },
    methods: {
      validateForm() {
        this.errors = {};
        if (!this.formData.username) this.errors.username = "Username is required.";
        if (!this.formData.password) this.errors.password = "Password is required.";
        return Object.keys(this.errors).length === 0;
      },
      onSubmit() {
        if (this.validateForm()) {
          this.onSignIn(this.formData, this.errors);
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
  .toggle-link {
    display: block;
    text-align: center;
    margin-top: 10px;
    color: #007bff;
    cursor: pointer;
  }
  .toggle-link:hover {
    text-decoration: underline;
  }
  </style>
  