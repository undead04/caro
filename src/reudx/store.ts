import { configureStore } from '@reduxjs/toolkit';
import settingGameSlice from './slices/settingGameSlice';

const store = configureStore({
  reducer: {
    setting: settingGameSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
