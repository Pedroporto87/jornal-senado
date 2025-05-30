import { createSlice} from '@reduxjs/toolkit'

const filterSlice = createSlice ({
    name: 'filter',
    initialState: {
        subject: 'general',
        language: 'es',
    },
    reducers: {
        setSubject: (state, action) => {
            state.subject = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
    },
})

export const { setSubject, setLanguage } = filterSlice.actions;
export default filterSlice.reducer;