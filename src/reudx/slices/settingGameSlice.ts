import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { settingGameState } from '../../types';

// counterReducer.js
const initialState:settingGameState = { 
    caro:"",
    timeTurn:0,
    timePeople:0,
    start:0,
    mode:0
 };
const settingGameSlice=createSlice({
    name:"settingGame",initialState,
    reducers:{
        setUp:(state,action:PayloadAction<settingGameState>)=>{
            state.caro=action.payload.caro;
            state.timeTurn=action.payload.timeTurn;
            state.timePeople=action.payload.timePeople;
            state.start=action.payload.start;
            state.mode=action.payload.mode;
           
        }
    }
})

export const { setUp } = settingGameSlice.actions;

export default settingGameSlice.reducer;
