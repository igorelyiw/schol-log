export interface SchoolBoyProps {
  Id: number;
  FirstName: string | null;
  SecondName: string | null;
  LastName: string | null;
}

export interface LessonsProps {
  Id: number;
  Title: string;
}

export interface RateProps {
  Id: number;
  Title: string;
  SchoolboyId: number;
  ColumnId: number;
}

export type UpdateDataProps = Omit<RateProps, "Id">;
