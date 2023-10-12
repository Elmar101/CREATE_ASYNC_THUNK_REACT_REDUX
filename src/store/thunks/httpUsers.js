import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { USERS_API } from "../api-url/usersApi";

const pause = (pause) => {
  return new Promise((resolve)=>{
    setTimeout(resolve, pause)
  });
};
export const fetchUsers = createAsyncThunk('users/fetch', async() =>{
  const response = await axios.get(USERS_API);
  await pause(1500);
  return response.data;
});

export const addUserThunk = createAsyncThunk('users/add', async(body) =>{
  console.log({body});
  const response = await axios.post(USERS_API, {name: faker.name.fullName()});
  await pause(1000)
  return response.data;
});


