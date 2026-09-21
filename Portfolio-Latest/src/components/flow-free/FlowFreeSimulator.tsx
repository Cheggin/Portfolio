import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  applyGameAction,
  createGame,
  createSolutionActions,
  defineSolution,
  getGameProgress,
  isSolved,
  type GameState,
  type Position,
  type Puzzle,
  type Solution,
} from "./board";
import FlowFreeBoard from "./FlowFreeBoard";

const PLAYBACK_STEP_MS = 110;
const animationStyle: CSSProperties & {
  "--flow-free-segment-duration": string;
} = {
  "--flow-free-segment-duration": `${PLAYBACK_STEP_MS}ms`,
};

type Playback = Readonly<{
  phase: "idle" | "playing" | "paused";
  actionIndex: number;
}>;

type Session = Readonly<{
  game: GameState;
  moves: number;
  best: number | null;
  mode: "player" | "demo";
}>;

type FlowFreeSimulatorProps = {
  puzzle: Puzzle;
  solution?: Solution;
  caption?: string;
};

function positionFromPointer(
  svg: SVGSVGElement,
  puzzle: Puzzle,
  clientX: number,
  clientY: number,
): Position | null {
  const screenMatrix = svg.getScreenCTM();
  if (!screenMatrix) return null;

  const point = new DOMPoint(clientX, clientY).matrixTransform(
    screenMatrix.inverse(),
  );
  const col = Math.floor(point.x);
  const row = Math.floor(point.y);

  if (row < 0 || row >= puzzle.rows || col < 0 || col >= puzzle.cols) {
    return null;
  }
  return { row, col };
}

function enterToward(puzzle: Puzzle, state: GameState, destination: Position) {
  const activeFlowId = state.activeFlowId;
  if (!activeFlowId) return state;

  const path = state.paths[activeFlowId];
  const origin = path.at(-1);
  if (!origin) return state;

  const positions: Position[] = [];
  if (origin.row === destination.row) {
    const direction = Math.sign(destination.col - origin.col);
    for (
      let col = origin.col + direction;
      direction !== 0 && col !== destination.col + direction;
      col += direction
    ) {
      positions.push({ row: origin.row, col });
    }
  } else if (origin.col === destination.col) {
    const direction = Math.sign(destination.row - origin.row);
    for (
      let row = origin.row + direction;
      direction !== 0 && row !== destination.row + direction;
      row += direction
    ) {
      positions.push({ row, col: origin.col });
    }
  } else {
    positions.push(destination);
  }

  return positions.reduce(
    (current, position) =>
      applyGameAction(puzzle, current, { type: "enter", position }),
    state,
  );
}

function downloadSvg(svg: SVGSVGElement, puzzle: Puzzle) {
  const clone = svg.cloneNode(true);
  if (!(clone instanceof SVGSVGElement)) return;

  const rootStyles = getComputedStyle(document.documentElement);
  const background = rootStyles.getPropertyValue("--bg-primary").trim();
  const grid = rootStyles.getPropertyValue("--border-color").trim();

  clone.classList.remove("is-interactive");
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", String(puzzle.cols * 100));
  clone.setAttribute("height", String(puzzle.rows * 100));
  clone
    .querySelector(".flow-free-board-background")
    ?.setAttribute("fill", background);
  clone.querySelectorAll(".flow-free-grid line").forEach((line) => {
    line.setAttribute("stroke", grid);
  });
  const source = `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(clone)}`;
  const url = URL.createObjectURL(
    new Blob([source], { type: "image/svg+xml;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `${puzzle.id}.svg`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function FlowFreeSimulator(props: FlowFreeSimulatorProps) {
  return (
    <FlowFreeSession
      key={JSON.stringify([props.puzzle, props.solution])}
      {...props}
    />
  );
}

function FlowFreeSession({
  puzzle,
  solution,
  caption = "Drag from a colored endpoint to connect each matching pair.",
}: FlowFreeSimulatorProps) {
  const [session, setSession] = useState<Session>(() => ({
    game: createGame(puzzle),
    moves: 0,
    best: null,
    mode: "player",
  }));
  const [playback, setPlayback] = useState<Playback>({
    phase: "idle",
    actionIndex: 0,
  });
  const boardRef = useRef<SVGSVGElement>(null);
  const activePointerId = useRef<number | null>(null);
  const playbackTimer = useRef<number | null>(null);
  const playbackRunId = useRef(0);
  const solutionActions = useMemo(
    () =>
      solution ? createSolutionActions(defineSolution(puzzle, solution)) : [],
    [puzzle, solution],
  );

  const setBoardElement = useCallback((node: SVGSVGElement | null) => {
    boardRef.current = node;
    if (!node) return;

    return () => {
      boardRef.current = null;
      playbackRunId.current += 1;
      if (playbackTimer.current !== null) {
        window.clearTimeout(playbackTimer.current);
        playbackTimer.current = null;
      }
    };
  }, []);

  const clearPlaybackTimer = () => {
    playbackRunId.current += 1;
    if (playbackTimer.current !== null) {
      window.clearTimeout(playbackTimer.current);
      playbackTimer.current = null;
    }
  };

  const schedulePlayback = (actionIndex: number, runId: number) => {
    playbackTimer.current = window.setTimeout(() => {
      if (runId !== playbackRunId.current) return;
      const action = solutionActions[actionIndex];
      setSession((current) => ({
        ...current,
        game: applyGameAction(puzzle, current.game, action),
      }));
      const nextActionIndex = actionIndex + 1;
      setPlayback({
        phase: nextActionIndex === solutionActions.length ? "idle" : "playing",
        actionIndex: nextActionIndex,
      });

      if (nextActionIndex < solutionActions.length) {
        schedulePlayback(nextActionIndex, runId);
      } else {
        playbackTimer.current = null;
      }
    }, PLAYBACK_STEP_MS);
  };

  const startPlayback = (actionIndex: number) => {
    clearPlaybackTimer();
    const runId = playbackRunId.current;
    setPlayback({ phase: "playing", actionIndex });
    schedulePlayback(actionIndex, runId);
  };

  const { game, moves, best, mode } = session;
  const progress = getGameProgress(puzzle, game);
  const solved = isSolved(puzzle, game);
  const pipePercent =
    progress.totalPipeCells === 0
      ? solved
        ? 100
        : 0
      : Math.round((progress.filledPipeCells / progress.totalPipeCells) * 100);
  const status = solved
    ? "Solved. Every flow is connected and every cell is filled."
    : playback.phase === "playing"
      ? `Animating solution, step ${playback.actionIndex + 1} of ${solutionActions.length}.`
      : playback.phase === "paused"
        ? `Animation paused at step ${playback.actionIndex} of ${solutionActions.length}.`
        : `${progress.connectedFlows} of ${progress.totalFlows} flows connected. ${progress.filledCells} of ${progress.totalCells} cells filled.`;

  const stopPlayback = () => {
    clearPlaybackTimer();
    setPlayback({ phase: "idle", actionIndex: 0 });
  };

  const handlePointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (
      !event.isPrimary ||
      (event.pointerType === "mouse" && event.button !== 0)
    ) {
      return;
    }

    const position = positionFromPointer(
      event.currentTarget,
      puzzle,
      event.clientX,
      event.clientY,
    );
    if (!position) return;

    event.preventDefault();
    stopPlayback();
    activePointerId.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    setSession((current) => {
      const playerSession: Session =
        current.mode === "demo"
          ? {
              game: createGame(puzzle),
              moves: 0,
              best: current.best,
              mode: "player",
            }
          : current;
      const game = applyGameAction(puzzle, playerSession.game, {
        type: "start",
        position,
      });
      return {
        ...playerSession,
        game,
        moves: game.activeFlowId
          ? playerSession.moves + 1
          : playerSession.moves,
      };
    });
  };

  const handlePointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (activePointerId.current !== event.pointerId) return;
    event.preventDefault();
    const svg = event.currentTarget;

    const samples =
      typeof event.nativeEvent.getCoalescedEvents === "function"
        ? event.nativeEvent.getCoalescedEvents()
        : [];
    setSession((current) => {
      const game = (samples.length > 0 ? samples : [event.nativeEvent]).reduce(
        (next, sample) => {
          const position = positionFromPointer(
            svg,
            puzzle,
            sample.clientX,
            sample.clientY,
          );
          return position ? enterToward(puzzle, next, position) : next;
        },
        current.game,
      );
      if (game === current.game) return current;

      const completed = current.mode === "player" && isSolved(puzzle, game);
      return {
        ...current,
        game,
        best: completed
          ? current.best === null
            ? current.moves
            : Math.min(current.best, current.moves)
          : current.best,
      };
    });
  };

  const handlePointerEnd = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (activePointerId.current !== event.pointerId) return;
    activePointerId.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setSession((current) => ({
      ...current,
      game: applyGameAction(puzzle, current.game, { type: "end" }),
    }));
  };

  const animateSolution = () => {
    if (!solution) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clearPlaybackTimer();
      const solvedGame = solutionActions.reduce(
        (current, action) => applyGameAction(puzzle, current, action),
        createGame(puzzle),
      );
      setSession((current) => ({
        ...current,
        game: solvedGame,
        moves: 0,
        mode: "demo",
      }));
      setPlayback({ phase: "idle", actionIndex: solutionActions.length });
      return;
    }
    setSession((current) => ({
      ...current,
      game: createGame(puzzle),
      moves: 0,
      mode: "demo",
    }));
    startPlayback(0);
  };

  const pausePlayback = () => {
    clearPlaybackTimer();
    setPlayback((current) => ({ ...current, phase: "paused" }));
  };

  const reset = () => {
    stopPlayback();
    setSession((current) => ({
      ...current,
      game: createGame(puzzle),
      moves: 0,
      mode: "player",
    }));
  };

  return (
    <figure className="flow-free-figure" style={animationStyle}>
      <p className="flow-free-metrics" aria-label="Game statistics">
        {[
          ["flows", `${progress.connectedFlows}/${progress.totalFlows}`],
          ["moves", String(moves)],
          ["best", best === null ? "-" : String(best)],
          ["pipe", `${pipePercent}%`],
        ].map(([label, value]) => (
          <span key={label}>{`${label}: ${value}`}</span>
        ))}
      </p>

      <FlowFreeBoard
        puzzle={puzzle}
        state={game}
        svgRef={setBoardElement}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerEnd={handlePointerEnd}
      />

      <div className="flow-free-controls">
        {solution && (
          <button
            className="flow-free-action"
            type="button"
            onClick={
              playback.phase === "playing"
                ? pausePlayback
                : playback.phase === "paused"
                  ? () => startPlayback(playback.actionIndex)
                  : animateSolution
            }
          >
            {playback.phase === "playing"
              ? "Pause"
              : playback.phase === "paused"
                ? "Resume"
                : solved
                  ? "Replay solve"
                  : "Animate solve"}
          </button>
        )}
        <button
          className="flow-free-action"
          type="button"
          onClick={reset}
          disabled={
            moves === 0 && mode === "player" && playback.phase === "idle"
          }
        >
          Reset
        </button>
        <button
          className="flow-free-action"
          type="button"
          onClick={() =>
            boardRef.current && downloadSvg(boardRef.current, puzzle)
          }
        >
          Download SVG
        </button>
      </div>

      <p className="flow-free-status" aria-live={solved ? "polite" : "off"}>
        {status}
      </p>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
