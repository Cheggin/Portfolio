import type { PointerEventHandler, Ref } from "react";
import type { GameState, Puzzle } from "./board";
import "./FlowFreeBoard.css";

type FlowFreeBoardProps = {
  puzzle: Puzzle;
  state: GameState;
  svgRef?: Ref<SVGSVGElement>;
  onPointerDown?: PointerEventHandler<SVGSVGElement>;
  onPointerMove?: PointerEventHandler<SVGSVGElement>;
  onPointerEnd?: PointerEventHandler<SVGSVGElement>;
};

export default function FlowFreeBoard({
  puzzle,
  state,
  svgRef,
  onPointerDown,
  onPointerMove,
  onPointerEnd,
}: FlowFreeBoardProps) {
  return (
    <svg
      ref={svgRef}
      className={`flow-free-board ${onPointerDown ? "is-interactive" : ""}`}
      viewBox={`0 0 ${puzzle.cols} ${puzzle.rows}`}
      role="img"
      aria-label={`${puzzle.rows} by ${puzzle.cols} Flow Free board`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onLostPointerCapture={onPointerEnd}
    >
      <title>Flow Free board</title>
      <desc>Connect endpoints with matching colors and fill every cell.</desc>

      <rect
        className="flow-free-board-background"
        width={puzzle.cols}
        height={puzzle.rows}
        fill="var(--bg-primary)"
      />

      <g className="flow-free-grid" aria-hidden="true">
        {Array.from({ length: puzzle.cols + 1 }, (_, col) => (
          <line
            key={`col-${col}`}
            x1={col}
            y1={0}
            x2={col}
            y2={puzzle.rows}
            stroke="var(--border-color)"
            strokeWidth={0.025}
          />
        ))}
        {Array.from({ length: puzzle.rows + 1 }, (_, row) => (
          <line
            key={`row-${row}`}
            x1={0}
            y1={row}
            x2={puzzle.cols}
            y2={row}
            stroke="var(--border-color)"
            strokeWidth={0.025}
          />
        ))}
      </g>

      <g aria-hidden="true">
        {puzzle.flows.flatMap((flow) => {
          const path = state.paths[flow.id];
          return path.slice(1).map((position, index) => {
            const previous = path[index];
            return (
              <line
                className="flow-free-segment"
                key={`${flow.id}-${index}`}
                x1={previous.col + 0.5}
                y1={previous.row + 0.5}
                x2={position.col + 0.5}
                y2={position.row + 0.5}
                pathLength={1}
                stroke={flow.color}
                strokeWidth={0.34}
                strokeLinecap="round"
              />
            );
          });
        })}
      </g>

      {puzzle.flows.flatMap((flow) =>
        flow.endpoints.map((endpoint, index) => (
          <circle
            key={`${flow.id}-${index}`}
            cx={endpoint.col + 0.5}
            cy={endpoint.row + 0.5}
            r={0.31}
            fill={flow.color}
            aria-hidden="true"
          />
        )),
      )}
    </svg>
  );
}
