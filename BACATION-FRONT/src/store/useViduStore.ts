import { create } from 'zustand';
import { Session } from 'openvidu-browser';

interface ViduState {
  session: Session | undefined;
  setSession: (session: Session | undefined) => void;
  detectValue: number;
  setDetectValue: (value: number) => void;
}

const useViduStore = create<ViduState>((set) => ({
  session: undefined,
  setSession: (session) => set(() => ({ session: session })),
  detectValue: 0,
  setDetectValue: (value) => set(() => ({ detectValue: value })),
}));

export default useViduStore;
