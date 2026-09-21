# Flow Free

The simulator is embedded in the MDX article at `/writing/flow-free`.

- `board.ts` owns puzzle validation, path rules, progress, and solution actions.
- `puzzles.ts` owns the example puzzle and its known solution.
- `FlowFreeBoard.tsx` renders immutable game state as inline SVG.
- `FlowFreeSimulator.tsx` owns pointer input, playback, controls, and SVG download.
- `FlowFreeBoard.css` defines the board, path animation, and controls.
- `LEARNINGS.md` records modeling decisions and discoveries.

Run `npm run dev` from `Portfolio-Latest`, then open `/writing/flow-free`.
The portfolio's Vite build compiles the TypeScript. There is no separate build,
HTML entry point, animation package, or image dependency for this feature.

Import `FlowFreeSimulator` into any MDX post and pass it a validated puzzle plus
an optional known solution. The component supports pointer drawing, animated
solution playback, game metrics, reset, and SVG export. Moves and best scores
track player sessions only, so solution playback cannot set a score. It does not
run a solver.
