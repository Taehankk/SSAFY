import { create } from 'zustand';

interface Data {
  startTime: Date;
  finishTime: Date;
  detectId: number;
  detect: string;
}

interface Store {
  count: number;
  setCount: (num: number) => void;
  axiosData: Data[];
  setAxiosData: (index: number, data: Data) => void;
  activeIndex: number | null;
  setActiveIndex: (num: number | null) => void;
}

const useCountStore = create<Store>((set) => ({
  count: 0,
  setCount: (num) => set((state) => ({ count: state.count + num })),
  axiosData: [
    {
      startTime: new Date(2024, 7, 27, 6, 0),
      finishTime: new Date(2024, 7, 27, 10, 0),
      detectId: 1,
      detect: '활동',
    },
    {
      startTime: new Date(2024, 7, 27, 9, 0),
      finishTime: new Date(2024, 7, 27, 9, 30),
      detectId: 2,
      detect: '수유',
    },
    {
      startTime: new Date(2024, 7, 27, 10, 0),
      finishTime: new Date(2024, 7, 27, 12, 0),
      detectId: 0,
      detect: '수면',
    },
    {
      startTime: new Date(2024, 7, 27, 13, 0),
      finishTime: new Date(2024, 7, 27, 16, 0),
      detectId: 1,
      detect: '활동',
    },
    {
      startTime: new Date(2024, 7, 27, 16, 0),
      finishTime: new Date(2024, 7, 27, 16, 30),
      detectId: 2,
      detect: '수유',
    },
    {
      startTime: new Date(2024, 7, 27, 17, 0),
      finishTime: new Date(2024, 7, 27, 21, 0),
      detectId: 0,
      detect: '수면',
    },
    {
      startTime: new Date(2024, 7, 27, 19, 0),
      finishTime: new Date(2024, 7, 27, 20, 0),
      detectId: 2,
      detect: '수유',
    },
    {
      startTime: new Date(2024, 7, 27, 21, 0),
      finishTime: new Date(2024, 7, 27, 22, 0),
      detectId: 1,
      detect: '활동',
    },
  ],
  setAxiosData: (index, data) =>
    set((state) => ({
      axiosData: state.axiosData.map((d, i) => (i === index ? data : d)),
    })),
  activeIndex: null,
  setActiveIndex: (num) => set(() => ({ activeIndex: num })),
}));

export default useCountStore;
