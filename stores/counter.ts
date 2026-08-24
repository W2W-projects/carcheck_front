import { defineStore } from "pinia";

interface CounterState {
  count: number;
  name: string;
}

const useCounterStore = defineStore("counter", {
  state: (): CounterState => ({ count: 0, name: "Eduardo" }),
  getters: {
    doubleCount: (state): number => state.count * 2,
  },
  actions: {
    increment(): void {
      this.count++;
    },
  },
});

export { useCounterStore };
