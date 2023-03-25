import {
  LessonsProps,
  RateProps,
  SchoolBoyProps,
  UpdateDataProps,
} from "../../schoolTypes";
import { REQUEST_METHODS } from "../constants";
import { requestApi } from "../helpers/request";

const { GET, POST } = REQUEST_METHODS;

const class_key = 2;

interface SchoolResponse<T> {
  Items: Array<T>;
  Quantity: number;
}

export function fetchLearners() {
  return requestApi<SchoolResponse<SchoolBoyProps>>(
    `v1/${class_key}/Schoolboy`,
    GET
  );
}

export function fetchLessons() {
  return requestApi<SchoolResponse<LessonsProps>>(
    `v1/${class_key}/Column`,
    GET
  );
}

export function fetchRate() {
  return requestApi<SchoolResponse<RateProps>>(`v1/${class_key}/Rate`, GET);
}

export function updateRate(data: UpdateDataProps) {
  return requestApi<SchoolResponse<RateProps>>(
    `v1/${class_key}/Rate`,
    POST,
    data
  );
}

export function deleteRate(data: Omit<UpdateDataProps, "Title">) {
  return requestApi<SchoolResponse<RateProps>>(
    `v1/${class_key}/UnRate`,
    POST,
    data
  );
}
