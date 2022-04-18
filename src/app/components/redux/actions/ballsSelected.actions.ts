import { createAction, props } from "@ngrx/store";

export const setBall = createAction('[ball] setBall', props<{ value: number }>());
export const setColours = createAction('[ball] setColours', props<{ value: string[] }>())
