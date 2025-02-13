import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit'
import { StoreState } from './storeSetup';


/* eslint-disable @typescript-eslint/no-explicit-any */
export type AppThunkDispatch = ThunkDispatch<StoreState, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;