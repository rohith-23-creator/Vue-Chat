<template>
  <div id="app">
    <div
      class="form-container"
      v-if="state.userName === '' || state.userName === null"
    >
      <form @submit.prevent="submitForm" class="login-form">
        <h1>Login to Enter the Chat</h1>
        <div class="input-container">
          <input
            type="text"
            name="UserName"
            placeholder="Enter your name..."
            v-model="user"
          />

          <button type="submit" class="submit-btn">Enter</button>
        </div>
      </form>
    </div>
    <div class="chat" v-else>
      <header>
        <h2>Logged in as {{ username }}</h2>
        <button class="out" @click="logout">Leave ></button>
      </header>
      <div class="chat-box">
        <h2 class="greet">Welcome to vue Chat</h2>
        <div
          v-for="message in state.messages"
          :key="message.key"
          :class="message.name == state.userName ? 'current-user' : 'messages'"
        >
          <div class="message-container">
            <p class="user">{{ message.name }}</p>
            <p class="message">{{ message.message }}</p>
          </div>
        </div>
      </div>
      <form class="message-form" @submit.prevent="sendMessage">
        <div class="form-control">
          <input
            type="text"
            placeholder="Type a Message...."
            class="send-input"
            v-model="message"
          />
          <button type="submit" class="send-msg">
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive, computed } from 'vue';
import db from './db.js';
export default {
  setup() {
    const user = ref('');
    const message = ref('');
    const state = reactive({
      userName: '',
      messages: []
    });
    const submitForm = () => {
      if (user.value != ' ' || user.value != null) {
        state.userName = user.value;
        user.value = '';
      }
    };
    const logout = () => {
      state.userName = '';
    };
    const sendMessage = () => {
      if (message.value === ' ') {
        return;
      } else {
        fetch(
          'https://vuechat-3d20e-default-rtdb.firebaseio.com/messages.json',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              user: state.userName,
              message: message.value
            })
          }
        );
        message.value = '';
      }
    };
    onMounted(() => {
      const messages = db.database().ref('messages');

      messages.on('value', snapshot => {
        const data = snapshot.val();
        let messages = [];

        Object.keys(data).forEach(key => {
          messages.push({
            id: key,
            name: data[key].user,
            message: data[key].message
          });
        });

        state.messages = messages;
      });
    });
    const username = computed(() => {
      return state.userName.toUpperCase();
    });
    return {
      user,
      message,
      state,
      submitForm,
      sendMessage,
      logout,
      username
    };
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Poppins', sans-serif;
  background-color: #8e0fe3;
}
.form-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

h1 {
  color: #aaa;
  margin: 1.5rem;
}

form.login-form {
  height: 15rem;
  width: 30rem;
  background-color: #fff;
  border-radius: 20px;
  font-family: inherit;
}

.input-container {
  margin: 1.5rem;
}

input {
  width: 100%;
  font-size: 20px;
  padding: 0.7rem 0.4rem;
  background-color: #f3f3f3;
  border: 1px solid #555;
  color: #555;
  transition: 0.4s;
  margin: 1rem 0;
}
button {
  color: #fff;
  border: 0;
  cursor: pointer;
}

.submit-btn {
  padding: 0.5rem 0;
  width: 100%;
  font-family: inherit;
  font-size: 18px;
  background-color: #8e0fe6;
}

button,
input:focus {
  outline: 0;
}

button:hover {
  opacity: 0.9;
}

.out {
  padding: 0.5rem;
  color: #fff;
  font-weight: bolder;
  font-family: inherit;
  font-size: 16px;
  background: transparent;
}

.chat {
  position: relative;
  flex: 1 1 1 100%;
  width: 30rem;
  height: 40rem;
  margin: 0.5em auto;
  align-items: center;
  background-color: #8e0fe3;
}

.chat h2 {
  color: #fff;
  padding: 0.7rem;
}

.greet {
  text-align: center;
  background-color: #f2f2f2;
}

h2.greet {
  color: #8e0fe6;
}

header {
  display: flex;
  justify-content: space-between;
}

.chat-box {
  position: absolute;
  background-color: #fff;
  border-radius: 24px 24px 0 0;
  height: 80%;
  width: 100%;
  overflow-y: scroll;
}

.message-form {
  position: absolute;
  top: 85vh;
  bottom: 0%;
  left: 0vw;
  width: 100%;
  height: auto;
  margin: auto;
  background-color: #fff;
}

.form-control {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 90%;
  margin: auto;
}

.messages,
.current-user {
  margin: 1rem;
}

button.send-msg {
  padding: 0.8rem;
  color: #fff;
  font-family: inherit;
  background-color: #8e0fe6;
  margin: 0;
  display: inline;
}

.form-control input {
  display: block;
  width: 100%;
}

.form-control input {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.form-control .send-msg {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.send-input {
  border: none;
}

.current-user {
  color: #8e0fe3;
  text-align: right;
}
.user {
  color: #555;
  opacity: 0.8;
  margin: 0.5em;
}

.current-user .message {
  background-color: #8e0fe3;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: #fff;
  display: inline-block;
}

.messages {
  display: block;
}

.messages .message {
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  display: inline-block;
  color: #8e0fe6;
}

.message:first-child {
  margin-top: 0.7rem;
}
</style>
