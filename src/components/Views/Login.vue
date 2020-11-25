<template>
  <div class="login">
    <div class="container">
      <div class="logo-container">
        <img width="250" src="@/assets/logo-full-sm.png" />
      </div>
      <div class="login-container" v-if="activeMode === 'login'">
        <div class="row">
          <div class="col">
            <label>Email</label>
            <input-field
              @submit="submitLogin"
              type="text"
              v-model="login.email"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Password</label>
            <input-field
              @submit="submitLogin"
              type="password"
              v-model="login.password"
            />
          </div>
        </div>
        <div class="row">
          <p class="text-link"><b>Forgot your password?</b></p>
        </div>
        <div class="row">
          <custom-button block type="primary" @click="submitLogin"
            >Login</custom-button
          >
        </div>

        <div class="row">
          <p
            class="text-link change-mode-text"
            @click="setActiveMode('signUp')"
          >
            No account? <b>Sign up!</b>
          </p>
        </div>
      </div>
      <div class="signup-container" v-if="activeMode === 'signUp'">
        <div class="row">
          <div class="col">
            <label>First Name</label>
            <input-field
              type="text"
              v-model="signUp.firstName"
              @submit="submitSignUp"
            />
          </div>
          <div class="col">
            <label>Last Name</label>
            <input-field
              type="text"
              v-model="signUp.lastName"
              @submit="submitSignUp"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Email</label>
            <input-field
              type="text"
              v-model="signUp.email"
              @submit="submitSignUp"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Password</label>
            <input-field
              type="password"
              v-model="signUp.password"
              @submit="submitSignUp"
            />
          </div>
          <div class="col">
            <label>Repeat Password</label>
            <input-field
              type="password"
              v-model="signUp.repeatPassword"
              @submit="submitSignUp"
            />
          </div>
        </div>
        <div class="row sign-up-button">
          <custom-button block type="primary" @click="submitSignUp"
            >Sign Up!</custom-button
          >
        </div>
        <div class="row">
          <p class="text-link change-mode-text" @click="setActiveMode('login')">
            Already have account? <b>Sign in!</b>
          </p>
        </div>
      </div>
      <div class="social-container">
        <div class="row">Or login with</div>
        <div class="row social-buttons">
          <div class="social-button" @click="loginGoogle">
            <i class="gg-google"></i>
          </div>
        </div>
        <div class="row">
          Do you want to try the app before making an account?
        </div>
      </div>
      <div class="row login-anonymously">
        <custom-button block type="secondary" @click="loginAnonymously">Login Anonymously</custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data: () => ({
    activeMode: "login",
    login: {
      email: null,
      password: null,
    },
    signUp: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      repeatPassword: null,
    },
  }),
  methods: {
    setActiveMode: function (mode) {
      this.activeMode = mode;
    },
    submitSignUp: function () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.signUp.email, this.signUp.password)
        .then(
          (user) => {
            console.log(user);
            this.$router.push("/");
          },
          (error) => {
            console.log(error);
          }
        );
    },
    submitLogin: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.login.email, this.login.password)
        .then(
          (user) => {
            console.log(user);
            this.$router.push("/");
          },
          (error) => {
            console.log(error);
          }
        );
    },
    loginGoogle: function () {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loginAnonymously: function () {
      firebase
        .auth()
        .signInAnonymously()
        .then((res) => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: var(--primary);
}

.container {
  display: block;
  width: 400px;
  padding: 30px;
  background: var(--background-primary);
  border-radius: var(--round-md);
  box-shadow: 10px 15px 15px 0px rgba(0, 0, 0, 0.2);
}

.login-container > .row,
.signup-container > .row,
.social-container > .row {
  margin-bottom: 10px;
}

.social-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.login-anonymously {
  margin-top: 5px;
}

.social-buttons {
  margin-bottom: 10px;
  --ggs: 1.2;
}

.social-button:hover {
  color: var(--primary);
  cursor: pointer;
}

.change-mode-text {
  font-size: 1.2em;
}
</style>