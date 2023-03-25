import { RateProps, SchoolBoyProps } from "../../schoolTypes";

export const isMarked = (array: Array<RateProps>, ColumnId: number) => {
  return Boolean(array.find((el: RateProps) => el.ColumnId === ColumnId));
};

export const getFullName = (obj: SchoolBoyProps) => {
  return `${obj.LastName ?? ""} ${obj.FirstName ?? ""} ${obj.SecondName ?? ""}`;
};
