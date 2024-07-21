import { create } from 'zustand';

interface Store {
  count: number;
  setCount: (num: number) => void;
}

const useCountStore = create<Store>((set) => ({
  count: 0,
  setCount: (num) => set((state) => ({ count: state.count + num })),
}));

export default useCountStore;
