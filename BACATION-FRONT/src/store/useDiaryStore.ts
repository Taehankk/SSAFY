import create from 'zustand';

interface CaptureImage {
  captureId: number;
  recordId: number;
  memberId: number;
  imageurl: String;
  imageTime: String;
}

interface DiaryState {
  //  당일 캡쳐 이미지 관련 정보
  captureImage: CaptureImage;
  setCaptureImage: (captureImage: CaptureImage) => void;
  captures: CaptureImage[];
  setCaptures: (captureImage: CaptureImage[]) => void;

  // 다이어리 정보
}

export const useDiaryStore = create<DiaryState>((set) => ({
  // 당일 캡쳐 이미지 관련 정보
  captureImage: {
    captureId: -1,
    recordId: -1,
    memberId: -1,
    imageurl: '',
    imageTime: '',
  },
  setCaptureImage: (captureImage) =>
    set(() => ({ captureImage: captureImage })),

  captures: [],
  setCaptures: (captureImage) => set(() => ({ captures: captureImage })),

  // 다이어리 정보
}));
