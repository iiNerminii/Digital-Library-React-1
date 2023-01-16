import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        title: 'Title',
        author: 'Author',
        book_len: 'Length of Book',
        genre: 'Genre',
    },
    reducers: {
        chooseTitle: (state, action) => { state.title = action.payload},
        chooseAuthor: (state, action) => { state.author = action.payload},
        chooseLength: (state, action) => { state.book_len = action.payload},
        chooseGenre: (state, action) => { state.genre = action.payload},
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseTitle, chooseAuthor, chooseLength, chooseGenre } = rootSlice.actions;

// A reducer is like an event listener that handles the events based on the kind of event it receives