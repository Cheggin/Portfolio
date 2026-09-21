import { definePuzzle, defineSolution } from "./board";

export const examplePuzzle = definePuzzle({
  id: "five-by-five",
  rows: 5,
  cols: 5,
  flows: [
    {
      id: "red",
      color: "#d94a4a",
      endpoints: [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
      ],
    },
    {
      id: "blue",
      color: "#287cc1",
      endpoints: [
        { row: 2, col: 0 },
        { row: 2, col: 2 },
      ],
    },
    {
      id: "green",
      color: "#198f55",
      endpoints: [
        { row: 1, col: 2 },
        { row: 1, col: 4 },
      ],
    },
    {
      id: "yellow",
      color: "#b87900",
      endpoints: [
        { row: 1, col: 3 },
        { row: 4, col: 4 },
      ],
    },
    {
      id: "purple",
      color: "#8659c7",
      endpoints: [
        { row: 4, col: 3 },
        { row: 4, col: 0 },
      ],
    },
  ],
});

export const exampleSolution = defineSolution(examplePuzzle, [
  {
    flowId: "red",
    path: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 1, col: 0 },
    ],
  },
  {
    flowId: "blue",
    path: [
      { row: 2, col: 0 },
      { row: 3, col: 0 },
      { row: 3, col: 1 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
    ],
  },
  {
    flowId: "green",
    path: [
      { row: 1, col: 2 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      { row: 0, col: 4 },
      { row: 1, col: 4 },
    ],
  },
  {
    flowId: "yellow",
    path: [
      { row: 1, col: 3 },
      { row: 2, col: 3 },
      { row: 2, col: 4 },
      { row: 3, col: 4 },
      { row: 4, col: 4 },
    ],
  },
  {
    flowId: "purple",
    path: [
      { row: 4, col: 3 },
      { row: 3, col: 3 },
      { row: 3, col: 2 },
      { row: 4, col: 2 },
      { row: 4, col: 1 },
      { row: 4, col: 0 },
    ],
  },
]);
