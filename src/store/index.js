import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import eventsSlice from './slices/eventsSlice';
import registrationsSlice from './slices/registrationsSlice';
import uiSlice from './slices/uiSlice';
import notificationsSlice from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    events: eventsSlice,
    registrations: registrationsSlice,
    ui: uiSlice,
    notifications: notificationsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;