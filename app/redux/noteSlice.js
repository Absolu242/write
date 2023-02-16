import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NoteServices from "../services/NoteServices";

export const createNote = createAsyncThunk(
  "notes/create",
  async ({ id, title, pages, createdAt, body }) => {
    const res = await NoteServices.create({
      id,
      title,
      pages,
      createdAt,
      body,
    });
    return res.data;
  }
);

export const retrieveNotes = createAsyncThunk(
  "notes/retrieve",
  async () => {
    const res = await NoteServices.getAll();
    return res.data;
  }
);

export const updateNote = createAsyncThunk(
  "notes/update",
  async ({ id, data }) => {
    const res = await NoteServices.update(data.id, data);
    return res.data;
  }
);

export const deleteNote = createAsyncThunk(
  "notes/delete",
  async (id) => {
    await NoteServices.remove(id);
    return { id };
  }
);

export const deleteAllNotes = createAsyncThunk(
  "notes/deleteAll",
  async () => {
    const res = await NoteServices.removeAll();
    return res.data;
  }
);

export const findNotesByTitle = createAsyncThunk(
  "notes/findByTitle",
  async ({ title }) => {
    const res = await NoteServices.findByTitle(title);
    return res.data;
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
    note: {},
  },
  extraReducers: (builder) => {
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.notes.push(action.payload);
    }),
      builder.addCase(retrieveNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.notes;
      });

    builder.addCase(updateNote.fulfilled, (state, action) => {
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.notes = state.notes.map((item) =>
          item.id === id ? action.payload : item
        );
      }
    });

    // [deleteNote.fulfilled]: (state, action) => {
    //   let index = state.notes.findIndex(
    //     ({ id }) => id === action.payload.id
    //   );
    //   state.notes.splice(index, 1);
    // },
    // [deleteAllNotes.fulfilled]: (state, action) => {
    //   return [];
    // },
    // [findNotesByTitle.fulfilled]: (state, action) => {
    //   return [...action.payload];
    // },
  },
});

const { reducer } = noteSlice;
export default reducer;
