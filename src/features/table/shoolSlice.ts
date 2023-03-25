import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import {
  LessonsProps,
  RateProps,
  SchoolBoyProps,
  UpdateDataProps,
} from "../../schoolTypes";
import { getFullName } from "../helpers/helpers";
import {
  deleteRate,
  fetchLearners,
  fetchLessons,
  fetchRate,
  updateRate,
} from "./tableAPI";

interface TableRow {
  name: string;
  rates: Array<RateProps>;
}
export interface SchoolState {
  learners: Array<SchoolBoyProps>;
  lessons: Array<LessonsProps>;
  rates: Array<RateProps>;
  normalizedData: { [key: string]: TableRow };
  loading: boolean;
}

const initialState: SchoolState = {
  learners: [],
  lessons: [],
  rates: [],
  normalizedData: {},
  loading: false,
};

export const deleteRateThunk =
  (data: Omit<UpdateDataProps, "Title">): AppThunk =>
  async (dispatch, getState) => {
    await deleteRate(data);

    dispatch(
      removeRate({ SchoolboyId: data.SchoolboyId, ColumnId: data.ColumnId })
    );
  };

export const updateRateThunk =
  (data: UpdateDataProps): AppThunk =>
  async (dispatch, getState) => {
    await updateRate(data);

    dispatch(addRate(data));
  };

export const setLearnersAsync = createAsyncThunk(
  "school/fetchLearners",
  async () => {
    const learners = await fetchLearners();

    return learners.Items;
  }
);

export const setTableAsync = createAsyncThunk(
  "school/fetchLessons",
  async () => {
    const learners = await fetchLearners();

    return learners.Items;
  }
);

export const shoolSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLearners: (state, action: PayloadAction<Array<SchoolBoyProps>>) => {
      state.learners = action.payload;
    },
    setLessons: (state, action: PayloadAction<Array<LessonsProps>>) => {
      state.lessons = action.payload;
    },
    setRates: (state, action: PayloadAction<Array<RateProps>>) => {
      state.rates = action.payload;
    },
    setNormalizedData: (state) => {
      const data = state.learners.map((item) => [
        item.Id,
        {
          name: getFullName(item),
          rates: state.rates.filter((el) => el.SchoolboyId === item.Id),
        },
      ]);

      state.normalizedData = Object.fromEntries(data);
    },
    removeRate: (
      state,
      action: PayloadAction<Pick<UpdateDataProps, "ColumnId" | "SchoolboyId">>
    ) => {
      const { ColumnId, SchoolboyId } = action.payload;
      const newData = state.normalizedData[SchoolboyId].rates.filter(
        (item) => item.ColumnId !== ColumnId
      );
      state.normalizedData[SchoolboyId].rates = newData;
    },
    addRate: (state, action: PayloadAction<UpdateDataProps>) => {
      const { ColumnId, SchoolboyId, Title } = action.payload;
      state.normalizedData[SchoolboyId].rates.push({
        Id: Math.random() * 1000,
        ColumnId,
        SchoolboyId,
        Title,
      });
    },
  },
});

export const setTableThunk = (): AppThunk => async (dispatch, getState) => {
  dispatch(setLoading(true));

  const learners = await fetchLearners();
  dispatch(setLearners(learners.Items));

  const lessons = await fetchLessons();
  dispatch(setLessons(lessons.Items));

  const rates = await fetchRate();
  dispatch(setRates(rates.Items));

  dispatch(setNormalizedData());

  dispatch(setLoading(false));
};

export const {
  setLearners,
  setLessons,
  setRates,
  setNormalizedData,
  setLoading,
  removeRate,
  addRate,
} = shoolSlice.actions;

export default shoolSlice.reducer;
