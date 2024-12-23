import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    message: "Hello, Pinia!",
  }),
  getters: {
    upperCaseMessage: (state) => state.message.toUpperCase(),
  },
  actions: {
    updateMessage(newMessage) {
      this.message = newMessage;
    },
  },
});
