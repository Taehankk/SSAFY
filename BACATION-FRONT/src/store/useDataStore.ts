import { create } from 'zustand';

interface Data {
  startTime: Date;
  finishTime: Date;
  detectId: number;
  detect: string;
}

interface Store {
  data: Data;
  setData: (data: Data) => void;
  addData: (data: Data) => void;
  axiosData: Data[];
  setAxiosData: (index: number, data: Data) => void;
  tempArr: Date[];
  setTempArr: (dateArr: Date[]) => void;
  selectDate: number;
  setSelectDate: (index: number) => void;
  scrollY: number;
  setScrollY: (num: number) => void;
  activeIndex: number | null;
  setActiveIndex: (num: number | null) => void;
  openModal: boolean;
  setOpenModal: () => void;
}

const useDataStore = create<Store>((set) => ({
  data: {
    startTime: new Date(2024, 7, 27, 0, 0),
    finishTime: new Date(2024, 7, 27, 0, 0),
    detectId: 0,
    detect: '수면',
  },
  setData: (data) => set(() => ({ data: data })),
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
  addData: (data) =>
    set((state) => ({
      axiosData: [...state.axiosData, data],
    })),
  tempArr: [new Date()],
  setTempArr: (dateArr) => set(() => ({ tempArr: dateArr })),
  selectDate: 0,
  setSelectDate: (idx) => set(() => ({ selectDate: idx })),
  scrollY: 0,
  setScrollY: (num) => set(() => ({ scrollY: num })),
  activeIndex: null,
  setActiveIndex: (num) => set(() => ({ activeIndex: num })),
  openModal: false,
  setOpenModal: () => set((state) => ({ openModal: !state.openModal })),
}));

export default useDataStore;
