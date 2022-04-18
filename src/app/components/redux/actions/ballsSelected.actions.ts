import { createAction, props } from "@ngrx/store";

export const setBall = createAction('[ball] setBall', props<{ value: number }>());
export const setColours = createAction('[ball] setColours', props<{ value: string[] }>())
export const setAmountPay = createAction('[ball] amountPay', props<{ value: number }>())
export const addAmountUsed = createAction('[ball] amountUsed', props<{ value: number }>())
export const setRandom = createAction('[ball] setRandom', props<{ value: number }>())
export const resetSelection = createAction('[ball] resetSelection')
