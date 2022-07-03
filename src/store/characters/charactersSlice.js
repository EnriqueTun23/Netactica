import { createSlice } from '@reduxjs/toolkit';

export const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        idUrl: '',
        urlPeople: '',
        films: [],
        characters: [],
        backupCharacter: [],
        loadingCharacter: true,
    },
    reducers: {
        addUrl: (state, { payload }) => {
            state.idUrl = payload;
        },
        addPeopleUrl: (state, { payload }) => {
            state.urlPeople = payload;
        },
        addListFilms: (state, { payload }) => {
            state.films = payload;
        },
        addCharacters: (state, {payload}) => {
            state.characters = payload;
            state.backupCharacter = payload;
        },
        filterCharacters: (state, { payload }) => {
            state.characters = payload;
        },
        removeLoading: (state) => {
            state.loadingCharacter = false;
        }
    }
});

export const {
    addUrl,
    addPeopleUrl,
    addListFilms,
    addCharacters,
    removeLoading,
    filterCharacters,
} = charactersSlice.actions;