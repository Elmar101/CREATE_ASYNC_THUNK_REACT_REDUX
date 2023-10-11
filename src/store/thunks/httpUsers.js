import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { USERS_API } from "../api-url/usersApi";

// Only Dev 
const pause = (pause) => {
  return new Promise((resolve)=>{
    setTimeout(resolve, pause)
  });
};
export const fetchUsers = createAsyncThunk('users/fetch', async() =>{
  const response = await axios.get(USERS_API);
  // Only Dev 
  await pause(1500);
  return response.data;
});

export const addUserThunk = createAsyncThunk('users/add', async() =>{
  const response = await axios.post(USERS_API, {name: faker.name.fullName()});
  return response.data;
});

