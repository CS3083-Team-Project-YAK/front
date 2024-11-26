<template>
    <div id="signUpForm">
      <h2>Sign Up</h2>
      <form @submit.prevent="onSubmit">
        <label for="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          v-model="formData.fullName"
          placeholder="Enter your full name"
          required
        />
        <div v-if="errors.fullName" class="error-message">{{ errors.fullName }}</div>
  
        <label for="email">Email Address</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          placeholder="Enter your email address"
          required
        />
        <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
  
        <label for="usernameSignUp">Username</label>
        <input
          type="text"
          id="usernameSignUp"
          v-model="formData.username"
          placeholder="Choose a username"
          required
        />
        <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
  
        <label for="passwordSignUp">Password</label>
        <input
          type="password"
          id="passwordSignUp"
          v-model="formData.password"
          placeholder="Enter your password"
          required
        />
        <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
  
        <button type="submit">Sign Up</button>
        <div v-if="errors.general" class="error-message">{{ errors.general }}</div>
      </form>
      <span class="toggle-link" @click="$emit('toggleForm')">Already have an account? Sign In</span>
    </div>
  </template>
  
  <script>
  export default {
    name: "SignUpForm",
    props: ["onSignUp"],
    data() {
      return {
        formData: {
          fullName: "",
          email: "",
          username: "",
          password: "",
        },
        errors: {},
      };
    },
    methods: {
      validateForm() {
        this.errors = {};
        if (!this.formData.fullName) this.errors.fullName = "Full name is required.";
        if (!this.formData.email) this.errors.email = "Email is required.";
        else if (!/^\S+@\S+\.\S+$/.test(this.formData.email)) this.errors.email = "Invalid email address.";
        if (!this.formData.username) this.errors.username = "Username is required.";
        if (!this.formData.password) this.errors.password = "Password is required.";
        else if (this.formData.password.length < 6) this.errors.password = "Password must be at least 6 characters.";
        return Object.keys(this.errors).length === 0;
      },
      onSubmit() {
        if (this.validateForm()) {
          this.onSignUp(this.formData, this.errors);
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
    text-align: center
  }
</style>