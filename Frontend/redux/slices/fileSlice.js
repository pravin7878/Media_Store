import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoding: false,
  isError: false,
  result: [],
  uploaded: "",
  removed: "",
  file: null,
};

// remove file
export const removeFile = createAsyncThunk(
  "REMOVE_FILE",
  async ({ url, fileId }, thunkAPI) => {
    console.log(url, fileId);

    try {
      const res = await axios.delete(url, {
        data: { fileId },
      });
      thunkAPI.dispatch(getFiles(url));
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// action for gating file
export const getFiles = createAsyncThunk("GET_FILES", async (url , {getState , rejectWithValue}) => {
  const state = getState();
  const token = state?.auth?.user?.user?.token
  console.log();

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(err.response ? err.response.data : err.message);
  }
});

// get spasific file
export const getSpacificFile = createAsyncThunk(
  "GET_SINGAL_FILE",
  async ({url}) => {
    console.log(url);
    
    try {
      const res = await axios.get(url);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// action for adding file
export const addFile = createAsyncThunk(
  "ADD_FILE",
  async ({ file, name, url }, { getState, rejectWithValue, dispatch }) => {
    const state = getState();
    const token = state?.auth?.user?.user?.token;
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);

      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart-form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      await dispatch(getFiles(url));
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const fileSlice = createSlice({
  name: "files",
  initialState,
  
  extraReducers: (bulder) => {
    bulder
      // to geting all files
      .addCase(getFiles.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getFiles.rejected, (state) => {
        state.isLoding = false;
        state.isError = true;
      })
      .addCase(getFiles.fulfilled, (state, { payload }) => {
        state.isLoding = false;
        state.result = payload;
      })

      //   to adding new file
      .addCase(addFile.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(addFile.rejected, (state) => {
        state.isLoding = false;
        state.isError = true;
      })
      .addCase(addFile.fulfilled, (state, { payload }) => {
        state.isLoding = false;
      })

      // remove file
      .addCase(removeFile.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(removeFile.rejected, (state) => {
        state.isLoding = false;
        state.isError = true;
      })
      .addCase(removeFile.fulfilled, (state, { payload }) => {
        state.isLoding = false;
      })

      //   get file by id
      .addCase(getSpacificFile.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getSpacificFile.rejected, (state) => {
        state.isLoding = false;
        state.isError = true;
      })
      .addCase(getSpacificFile.fulfilled, (state, { payload }) => {
        state.isLoding = false;
        state.file = payload;
      });
  },
});

export default fileSlice.reducer;
