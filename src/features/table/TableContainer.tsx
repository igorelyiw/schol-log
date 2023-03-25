import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer as Container,
  Typography,
  CircularProgress,
} from "@mui/material";

import { deleteRateThunk, setTableThunk, updateRateThunk } from "./shoolSlice";

import { isMarked } from "../helpers/helpers";
import { UpdateDataProps } from "../../schoolTypes";
import { selectLessons, selectLoader, selectNormalizedData } from "./selectors";

export function TableContainer() {
  const lessons = useAppSelector(selectLessons);
  const isLoading = useAppSelector(selectLoader);
  const normData = useAppSelector(selectNormalizedData);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTableThunk());
  }, []);

  const array = Object.entries(normData);

  if (isLoading) return <CircularProgress sx={{ height: 150, width: 150 }} />;

  const handleUpdateRate = (data: UpdateDataProps) => {
    dispatch(updateRateThunk(data));
  };

  const handleDeleteRate = (data: Omit<UpdateDataProps, "Title">) => {
    dispatch(deleteRateThunk(data));
  };

  return (
    <Container component={Paper}>
      <Table
        sx={{ minWidth: 650, p: 4 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead sx={{ bgcolor: "lightgreen" }}>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Student</TableCell>
            {lessons.map((lesson) => (
              <TableCell key={lesson.Title} align="right">
                <Typography variant="body2" align="center">
                  {lesson.Title}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {array.map((item: any) => (
            <TableRow
              key={item[0]}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { bgcolor: "lightgrey" },
              }}
            >
              <TableCell component="th" scope="row">
                {item[0]}
              </TableCell>
              <TableCell component="th" scope="row">
                {item[1].name}
              </TableCell>
              {lessons.map((lesson) => (
                <React.Fragment key={item[0] + lesson.Id}>
                  {isMarked(item[1].rates, lesson.Id) ? (
                    <TableCell
                      align="right"
                      onClick={() =>
                        handleDeleteRate({
                          ColumnId: lesson.Id,
                          SchoolboyId: Number(item[0]),
                        })
                      }
                    >
                      <Typography
                        variant="body2"
                        align="center"
                        sx={{ cursor: "pointer", bgcolor: "red" }}
                      >
                        H
                      </Typography>
                    </TableCell>
                  ) : (
                    <TableCell
                      align="right"
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        handleUpdateRate({
                          ColumnId: lesson.Id,
                          SchoolboyId: Number(item[0]),
                          Title: "H",
                        })
                      }
                    ></TableCell>
                  )}
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
