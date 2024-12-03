<template>
  <div class="container centered">
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
        const params = new URLSearchParams();
        params.append('username', formData.username);
        params.append('password', formData.password);

        const response = await axios.post("/users/login", params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        console.log("Sign-In formData:", formData);
        if (response.status === 200) {
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          this.$router.push("/dashboard"); // Adjust as necessary
          alert("Sign-In Successful!");
        }
      } catch (error) {
        console.error("Sign-in error:", error.response || error.message);
        if (error.response && error.response.status === 401) {
          errors.general = "Invalid username or password.";
        } else {
          errors.general = "Something went wrong. Please try again.";
        }
      }
    },
    async handleSignUp(formData, errors) {
      console.log("Sign-Up formData:", formData);
      try {
        const response = await axios.post("/users/register", {
          full_name: formData.fullName,
          username: formData.username,
          email_address: formData.email,  // Ensure this matches the attribute name in UserCreate
          password: formData.password,
        }, {
          headers: {
            'Content-Type': 'application/json'  // Ensure the content type is set to application/json
          }
        });
        if (response.status === 200) {
          alert("Sign-Up Successful! You can now sign in.");
          this.toggleForm(); // Switch back to sign-in form
        }
      } catch (error) {
        console.error("Sign-up error:", error.response || error.message);
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
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
}

.container {
  width: 400px;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
