import { RootState } from "../../app/store";

export const selectNormalizedData = (state: RootState) =>
  state.school.normalizedData;

export const selectLearners = (state: RootState) => state.school.learners;
export const selectLessons = (state: RootState) => state.school.lessons;
export const selectRate = (state: RootState) => state.school.rates;
export const selectLoader = (state: RootState) => state.school.loading;
