import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const APIURL = "http://localhost:5000/api";

export const createNote = createAsyncThunk(
  "notes/createNote",
  async ({ id, title, createdAt, pages, body }, thunkAPI) => {
    try {
      const noteData = { id, title, createdAt, pages, body };
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        `${APIURL}/notes/`,
        JSON.stringify(noteData),
        { headers: headers }
      );

      let data = await response.json();
      console.log("data : ", data);

      if (response.status === 200) {
        localStorage.setItem("noteInfo", data.token);
        return { ...data, id, title, createdAt, pages };
      } else {
        thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/noteUpdate",
  async ({ note, noteInfo }, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${noteInfo}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.put(
        `${APIURL}/notes/${note.id}`,
        note,
        config
      );

      let data = response.data;
      console.log("coool", data);
      if (response.status === 201) {
        localStorage.setItem("noteInfo", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const notesList = createAsyncThunk(
  "notes/notesList",
  async ({}, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${noteInfo}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.get(`${APIURL}notes/`, config);

      let data = response.data;
      console.log("coool", data);
      if (response.status === 201) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getSingleNote = createAsyncThunk(
  "notes/getSingleNote",
  async ({ id }, thunkAPI) => {
    try {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const response = await axios.get(`${APIURL}/notes/${id}/`, {
        headers: headers,
      });

      let data = response.data;
      console.log("data", data, response.status);

      if (response.status === 201) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [createNote.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);

      state.isFetching = false;
      state.isSuccess = true;
      state.title = payload.note.title;
      state.name = payload.note.name;
    },
    [createNote.pending]: (state) => {
      state.isFetching = true;
    },
    [createNote.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },

    [updateNote.fulfilled]: (state, { payload }) => {
      console.log("payloadFullfiled", payload);

      state.title = payload.title;
      state.body = payload.body;
      state.pages = payload.pages;
      state.createdAt = payload.createdAt;
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    },
    [updateNote.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [updateNote.pending]: (state) => {
      state.isFetching = true;
    },
    [getSingleNote.pending]: (state) => {
      state.isFetching = true;
    },
    [getSingleNote.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.id = payload.id;
      state.title = payload.title;
      state.body = payload.body;
      state.pages = payload.pages;
      state.createdAt = payload.createdAt;
    },
    [getSingleNote.rejected]: (state) => {
      console.log("getSingleNote failed");
      state.isFetching = false;
      state.isError = true;
    },
    [notesList.pending]: (state) => {
      state.isFetching = true;
    },
    [notesList.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.notes = payload;
    },
    [notesList.rejected]: (state) => {
      console.log("get notes failed");
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = notesSlice.actions;

export const noteSelector = (state) => state.note;
export default notesSlice.reducer;
