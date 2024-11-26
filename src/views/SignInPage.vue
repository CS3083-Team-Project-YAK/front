<template>
  <div class="container">
    <SignInForm
      v-if="isSignInFormVisible"
      :onSignIn="handleSignIn"
      @toggleForm="toggleForm"
    />
    <SignUpForm
      v-else
      :onSignUp="handleSignUp"
      @toggleForm="toggleForm"
    />
  </div>
</template>

<script>
import SignInForm from "@/components/SignInForm.vue";
import SignUpForm from "@/components/SignUpForm.vue";
import axios from "@/plugins/axios";

export default {
  name: "SignInPage",
  components: {
    SignInForm,
    SignUpForm,
  },
  data() {
    return {
      isSignInFormVisible: true,
    };
  },
  methods: {
    toggleForm() {
      this.isSignInFormVisible = !this.isSignInFormVisible;
    },
    async handleSignIn(formData, errors) {
      try {
        const response = await axios.post("/auth/login", formData);
        console.log(response);
        if (response.status === 200) {
          alert("Sign-In Successful!");
          localStorage.setItem("userToken", response.data.token);
          this.$router.push("/dashboard");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          errors.general = "Invalid username or password.";
        } else {
          errors.general = "Something went wrong. Please try again.";
        }
      }
    },
    async handleSignUp(formData, errors) {
      try {
        const response = await axios.post("/auth/register", formData);
        if (response.status === 201) {
          alert("Sign-Up Successful! You can now sign in.");
          this.toggleForm();
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          errors.general = "Invalid data provided. Please check your input.";
        } else {
          errors.general = "Something went wrong. Please try again.";
        }
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.container {
  width: 400px;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}
label {
  font-weight: bold;
  display: block;
  margin-top: 10px;
}
input[type="text"],
input[type="email"],
input[type="password"] {
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
.error-message {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
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
@media (max-width: 600px) {
  .container {
    width: 90%;
    padding: 20px;
  }
}
</style>
