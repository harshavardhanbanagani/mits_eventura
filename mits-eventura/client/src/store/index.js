import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import eventsSlice from '../features/events/eventsSlice'
import registrationsSlice from '../features/registrations/registrationsSlice'
import adminSlice from '../features/admin/adminSlice'
import certificatesSlice from '../features/certificates/certificatesSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    events: eventsSlice,
    registrations: registrationsSlice,
    admin: adminSlice,
    certificates: certificatesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
})