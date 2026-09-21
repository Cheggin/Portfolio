export type Position = Readonly<{ row: number; col: number }>;

export type Flow = Readonly<{
  id: string;
  color: string;
  endpoints: readonly [Position, Position];
}>;

export type Puzzle = Readonly<{
  id: string;
  rows: number;
  cols: number;
  flows: readonly Flow[];
}>;

export type GameState = Readonly<{
  paths: Readonly<Record<string, readonly Position[]>>;
  activeFlowId: string | null;
}>;

export type Solution = readonly Readonly<{
  flowId: string;
  path: readonly Position[];
}>[];

export type GameAction =
  | Readonly<{ type: "start"; position: Position }>
  | Readonly<{ type: "enter"; position: Position }>
  | Readonly<{ type: "end" }>;

const samePosition = (a: Position, b: Position) =>
  a.row === b.row && a.col === b.col;

const areAdjacent = (a: Position, b: Position) =>
  Math.abs(a.row - b.row) + Math.abs(a.col - b.col) === 1;

const positionKey = (position: Position) => `${position.row}:${position.col}`;

const isEndpoint = (flow: Flow, position: Position) =>
  flow.endpoints.some((endpoint) => samePosition(endpoint, position));

const isPositionInPuzzle = (puzzle: Puzzle, position: Position) =>
  Number.isInteger(position.row) &&
  Number.isInteger(position.col) &&
  position.row >= 0 &&
  position.row < puzzle.rows &&
  position.col >= 0 &&
  position.col < puzzle.cols;

function assertPosition(puzzle: Puzzle, position: Position, name: string) {
  if (!isPositionInPuzzle(puzzle, position)) {
    throw new Error(`${name} is outside the puzzle`);
  }
}

export function definePuzzle(puzzle: Puzzle): Puzzle {
  if (!puzzle.id.trim()) throw new Error("Puzzle id is required");
  if (!Number.isSafeInteger(puzzle.rows) || puzzle.rows <= 0) {
    throw new Error("Puzzle rows must be a positive safe integer");
  }
  if (!Number.isSafeInteger(puzzle.cols) || puzzle.cols <= 0) {
    throw new Error("Puzzle columns must be a positive safe integer");
  }
  if (!Number.isSafeInteger(puzzle.rows * puzzle.cols)) {
    throw new Error("Puzzle cell count must be a safe integer");
  }
  if (puzzle.flows.length === 0) {
    throw new Error("A puzzle must contain at least one flow");
  }

  const flowIds = new Set<string>();
  const flowColors = new Set<string>();
  const endpoints = new Set<string>();

  for (const flow of puzzle.flows) {
    if (!flow.id.trim() || !flow.color.trim()) {
      throw new Error("Every flow needs an id and color");
    }
    if (flowIds.has(flow.id)) {
      throw new Error(`Duplicate flow id: ${flow.id}`);
    }
    flowIds.add(flow.id);
    const color = flow.color.trim().toLowerCase();
    if (flowColors.has(color)) {
      throw new Error(`Duplicate flow color: ${flow.color}`);
    }
    flowColors.add(color);

    const [first, second] = flow.endpoints;
    assertPosition(puzzle, first, `${flow.id} endpoint`);
    assertPosition(puzzle, second, `${flow.id} endpoint`);
    if (samePosition(first, second)) {
      throw new Error(`${flow.id} endpoints must be distinct`);
    }

    for (const endpoint of flow.endpoints) {
      const key = positionKey(endpoint);
      if (endpoints.has(key)) {
        throw new Error(`Two flows share endpoint ${key}`);
      }
      endpoints.add(key);
    }
  }

  return puzzle;
}

function createPathRecord(puzzle: Puzzle) {
  return Object.fromEntries(
    puzzle.flows.map((flow): [string, readonly Position[]] => [flow.id, []]),
  );
}

export function createGame(puzzle: Puzzle): GameState {
  return { paths: createPathRecord(puzzle), activeFlowId: null };
}

function findFlow(puzzle: Puzzle, flowId: string): Flow {
  const flow = puzzle.flows.find((candidate) => candidate.id === flowId);
  if (!flow) throw new Error(`Unknown flow: ${flowId}`);
  return flow;
}

function findEndpointFlow(puzzle: Puzzle, position: Position) {
  return puzzle.flows.find((flow) => isEndpoint(flow, position));
}

function getPath(state: GameState, flowId: string) {
  return Object.prototype.hasOwnProperty.call(state.paths, flowId)
    ? (state.paths[flowId] ?? [])
    : [];
}

function buildOccupancy(puzzle: Puzzle, state: GameState) {
  const occupancy = new Map<
    string,
    Readonly<{ flowId: string; pathIndex: number }>
  >();

  for (const flow of puzzle.flows) {
    const flowId = flow.id;
    const path = getPath(state, flowId);
    path.forEach((position, pathIndex) => {
      if (isPositionInPuzzle(puzzle, position)) {
        occupancy.set(positionKey(position), { flowId, pathIndex });
      }
    });
  }

  return occupancy;
}

function replacePath(
  state: GameState,
  flowId: string,
  path: readonly Position[],
  activeFlowId = state.activeFlowId,
): GameState {
  return {
    paths: { ...state.paths, [flowId]: path },
    activeFlowId,
  };
}

function startPath(
  puzzle: Puzzle,
  state: GameState,
  position: Position,
): GameState {
  const endpointFlow = findEndpointFlow(puzzle, position);
  if (endpointFlow) {
    return replacePath(state, endpointFlow.id, [position], endpointFlow.id);
  }

  const occupant = buildOccupancy(puzzle, state).get(positionKey(position));
  if (!occupant) return { ...state, activeFlowId: null };

  const path = getPath(state, occupant.flowId);
  return replacePath(
    state,
    occupant.flowId,
    path.slice(0, occupant.pathIndex + 1),
    occupant.flowId,
  );
}

function extendPath(
  puzzle: Puzzle,
  state: GameState,
  position: Position,
): GameState {
  if (!state.activeFlowId) return state;

  const flow = findFlow(puzzle, state.activeFlowId);
  const path = getPath(state, flow.id);
  const last = path.at(-1);
  if (!last || samePosition(last, position) || !areAdjacent(last, position)) {
    return state;
  }

  const ownIndex = path.findIndex((cell) => samePosition(cell, position));
  if (ownIndex !== -1) {
    return replacePath(state, flow.id, path.slice(0, ownIndex + 1));
  }

  const endpointFlow = findEndpointFlow(puzzle, position);
  if (endpointFlow && endpointFlow.id !== flow.id) return state;

  let nextState = state;
  const occupant = buildOccupancy(puzzle, state).get(positionKey(position));
  if (occupant && occupant.flowId !== flow.id) {
    const displacedPath = getPath(state, occupant.flowId);
    nextState = replacePath(
      state,
      occupant.flowId,
      displacedPath.slice(0, occupant.pathIndex),
    );
  }

  const nextPath = [...path, position];
  return replacePath(
    nextState,
    flow.id,
    nextPath,
    isEndpoint(flow, position) ? null : flow.id,
  );
}

export function applyGameAction(
  puzzle: Puzzle,
  state: GameState,
  action: GameAction,
): GameState {
  if (action.type !== "end") {
    assertPosition(puzzle, action.position, "Game action position");
  }

  switch (action.type) {
    case "start":
      return startPath(puzzle, state, action.position);
    case "enter":
      return extendPath(puzzle, state, action.position);
    case "end":
      return state.activeFlowId ? { ...state, activeFlowId: null } : state;
  }
}

function pathConnectsFlow(
  puzzle: Puzzle,
  flow: Flow,
  path: readonly Position[],
) {
  const first = path[0];
  const last = path.at(-1);
  if (!first || !last) return false;

  const [a, b] = flow.endpoints;
  if (
    !(
      (samePosition(first, a) && samePosition(last, b)) ||
      (samePosition(first, b) && samePosition(last, a))
    )
  ) {
    return false;
  }

  const occupied = new Set<string>();
  return path.every((position, index) => {
    const key = positionKey(position);
    if (
      !isPositionInPuzzle(puzzle, position) ||
      occupied.has(key) ||
      (index > 0 && !areAdjacent(path[index - 1], position))
    ) {
      return false;
    }
    occupied.add(key);
    return true;
  });
}

function getSolutionError(puzzle: Puzzle, solution: Solution) {
  const flows = new Map(puzzle.flows.map((flow) => [flow.id, flow]));
  const seenFlows = new Set<string>();
  const occupied = new Set<string>();

  for (const solvedFlow of solution) {
    const flow = flows.get(solvedFlow.flowId);
    if (!flow) return `Unknown flow: ${solvedFlow.flowId}`;
    if (seenFlows.has(flow.id)) return `Duplicate solution path: ${flow.id}`;
    seenFlows.add(flow.id);

    if (!pathConnectsFlow(puzzle, flow, solvedFlow.path)) {
      return `${flow.id} solution must be a bounded simple path between its endpoints`;
    }
    for (const position of solvedFlow.path) {
      const key = positionKey(position);
      if (occupied.has(key)) return `Solution paths overlap at ${key}`;
      occupied.add(key);
    }
  }

  if (
    seenFlows.size !== puzzle.flows.length ||
    occupied.size !== puzzle.rows * puzzle.cols
  ) {
    return "Solution must connect every flow and fill the board";
  }

  return null;
}

export function getGameProgress(puzzle: Puzzle, state: GameState) {
  const occupied = buildOccupancy(puzzle, state);
  const endpoints = new Set<string>();
  for (const flow of puzzle.flows) {
    for (const endpoint of flow.endpoints) {
      endpoints.add(positionKey(endpoint));
    }
  }
  let filledPipeCells = 0;
  for (const key of occupied.keys()) {
    if (!endpoints.has(key)) filledPipeCells += 1;
  }
  const totalCells = puzzle.rows * puzzle.cols;
  const connectedFlows = puzzle.flows.filter((flow) =>
    pathConnectsFlow(puzzle, flow, getPath(state, flow.id)),
  ).length;

  return {
    filledCells: occupied.size,
    totalCells,
    filledPipeCells,
    totalPipeCells: totalCells - endpoints.size,
    connectedFlows,
    totalFlows: puzzle.flows.length,
  };
}

export function isSolved(puzzle: Puzzle, state: GameState) {
  if (state.activeFlowId !== null) return false;

  const flowIds = new Set(puzzle.flows.map((flow) => flow.id));
  const pathIds = Object.keys(state.paths);
  if (
    pathIds.length !== flowIds.size ||
    pathIds.some((flowId) => !flowIds.has(flowId))
  ) {
    return false;
  }

  return (
    getSolutionError(
      puzzle,
      puzzle.flows.map((flow) => ({
        flowId: flow.id,
        path: getPath(state, flow.id),
      })),
    ) === null
  );
}

export function defineSolution(puzzle: Puzzle, solution: Solution): Solution {
  const error = getSolutionError(puzzle, solution);
  if (error) throw new Error(error);
  return solution;
}

export function createSolutionActions(
  solution: Solution,
): readonly GameAction[] {
  const actions: GameAction[] = [];

  for (const solvedFlow of solution) {
    const first = solvedFlow.path[0];
    if (!first) continue;
    actions.push({ type: "start", position: first });
    for (const position of solvedFlow.path.slice(1)) {
      actions.push({ type: "enter", position });
    }
  }

  return actions;
}
