import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { constructorIngredientsSlice } from '../slices/constructorIngredientsSlice';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { userSlice } from '../slices/userSlice';
import { feedSlice } from '../slices/feedSlice';
import { orderBurgerSlice } from '../slices/orderBurgerSlice';
import { orderSlice } from '../slices/orderSlice';
import { userOrdersSlice } from '../slices/userOrdersSlice';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorIngredientsSlice.name]: constructorIngredientsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderBurgerSlice.name]: orderBurgerSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
