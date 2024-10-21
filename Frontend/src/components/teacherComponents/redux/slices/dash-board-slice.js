import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    totalTeachers: 0,
    totalStudents: 0,
    totalSubjects: 0,
    totalContacts: 0,

};

const dashBoardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setTotalTeachers: (state, action) => {
            state.totalTeachers = action.payload;
        },
        setTotalStudents: (state, action) => {
            state.totalStudents = action.payload;
        },
        setTotalSubjects: (state, action) => {
            state.totalSubjects = action.payload;
        },
        setTotalContacts: (state, action) => {
            state.totalContacts = action.payload;
        },
    },
});

export const { setTotalTeachers, setTotalStudents, setTotalSubjects, setTotalContacts } = dashBoardSlice.actions;
export default dashBoardSlice.reducer;