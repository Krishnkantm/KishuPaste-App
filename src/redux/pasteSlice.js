import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id)
      //add a check paste already exists

      if(index >= 0){
        // If the course is already in the Pastes, do not modify the quantity
        toast.error("Paste already exist")
        return
      }
    // If the course is not in the Pastes, add it to the Pastes
    state.pastes.push(paste)
      
    // Update to localstorage
    localStorage.setItem("pastes", JSON.stringify(state.pastes))
    // show toast
    toast.success("Paste created Sucessfully")
  },

    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;

        localStorage.setItem("pasted", JSON.stringify(state.pastes));

        toast.success("Paste Updated");
      }
    },
    // resetAllPaste: (state, action) => {
    //   state.pastes = [];

    //   localStorage.removeItem("pastes");
    // },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;

      console.log(pasteId);
      const index = state.pastes.findIndex((item)=>
        item._id == pasteId);

      if(index >= 0){
        state.pastes.splice(index,1);

        localStorage.setItem("pastes",JSON.stringify(state.pastes));

        toast.success("paste deleted");
      }
    },
      resetPaste: (state) => {
        state.pastes = []
        // Update to localstorage
        localStorage.removeItem("pastes")
      },
  },
});

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste,removeFromPaste,resetPaste} =
  pasteSlice.actions;

export default pasteSlice.reducer;
