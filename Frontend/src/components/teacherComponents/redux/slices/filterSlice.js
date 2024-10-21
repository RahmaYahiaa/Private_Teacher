import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    level: [],
    rating: null,
    specialization: [],
    language: '',
    search: '',
};
const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setLevel: (state, action) => {
            state.level = action.payload;
        },
        setRating: (state, action) => {
            state.rating = action.payload;
        },
        setSpecialization: (state, action) => {
            state.specialization = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        resetFilters: (state) => {
            return initialState;
        },
    },
});
export const { setLevel, setRating, setSpecialization, setLanguage, setSearch, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;