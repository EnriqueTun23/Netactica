import { configureStore } from '@reduxjs/toolkit';

import { charactersSlice } from './characters';

export const store = configureStore({
    reducer: {
        character: charactersSlice.reducer,
    }
})