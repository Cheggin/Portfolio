# Flow Free learnings

## September 10, 2026

- A board with `n` rows, `m` columns, and `k` endpoint pairs has `n × m − 2k`
  non-endpoint cells to fill in a complete solution.
- Endpoints have no direction. Exchanging the two points in a pair leaves the
  board unchanged.
- Puzzle construction validates dimensions, flow identities, and endpoint cells.
- Fixed endpoints and ordered paths are separate immutable concepts. A flow's
  identity does not depend on its display color.
- Pointer gestures and animated solutions use the same path actions, so both
  modes follow the same rules.
- Pipe progress excludes fixed endpoint cells, so an untouched board starts at
  zero and filling every non-endpoint cell reaches 100 percent.
- Moves count valid pointer starts. Best records the fewest moves in the current
  simulator session, and animated solutions are excluded from both values.
- The board is a React component rendered as inline SVG. The SVG supplies one
  coordinate system for pointer input, responsive paths, animation, and export.
- Drawing over a path truncates the displaced flow. Drawing backward truncates
  the active flow.
- The example animation replays a validated known solution. No solver performance
  claims or Lean proofs have been established. Future findings should distinguish
  observations, conjectures, measurements, and proofs.
