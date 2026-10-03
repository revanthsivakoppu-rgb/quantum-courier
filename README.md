# Quantum Courier

An original, small browser puzzle game for QURIOSITY. Primary option: **basis switching and measurement scrambling**; supporting option: **unitary gates and reversible flow**.

Development started in this coding session after the participant confirmed that the official event window had started. An initial model commit was created at the start. Most subsequent development was performed before the participant requested Git publication; the completed prototype is recorded in a later snapshot commit. No commits have been backdated or manufactured to imply incremental development. Public repository creation was deferred during development.

## Play the demo

Open `index.html` in a modern browser. It works offline, with no installation, fonts, downloads or network requests. Alternatively, with Node.js installed, run `node server.js` and visit http://127.0.0.1:4173. `npm start` does the same thing. No npm install is required. Any static host can serve index.html, style.css, quantum.js, replay.js, levels.js, onboarding.js, home-lab.js and game.js together.

Use **WASD / arrow keys** to move one tile per press. On narrow screens there are direction buttons. Click an adjacent empty floor tile to step there. Walk onto a station to operate it. Clicking a station selects it for inspection; the controls in Room Equipment change its mode. Where available, select **Move this station**, then an empty floor tile to relocate it. Equipment edits start a fresh run; they cannot retroactively modify a key in transit. U undoes a step; R (or Restart) resets the entire current round: courier, key, station positions and settings, operation history, and its completion mark. Other rooms keep their completion marks. Room tabs permit replay. Sound is optional and starts muted.

There is a separate four-room tutorial, followed by 25 campaign levels across five chapters. Use Tutorial / Play to switch and the chapter selector to choose a group of five levels. All levels are available to revisit. Completion marks and the selected room are saved locally in this browser; the in-progress key and equipment are reset on reload. If browser storage is unavailable, play still works for the current session.

## Beginner onboarding

The home page offers the tutorial, campaign, resume and a separate interactive quantum playground. Dark mode is available and remembered locally. A welcome guide opens when starting the tutorial with the goal, controls, rules and plain-language explanations of scanners, gates and probabilities. How to play reopens it. The four tutorial lessons have live Your next step prompts that respond to station configuration and progress. Completing a room automatically opens its explanation; Continue moves directly into the next round.

## Campaign

25 hand-authored challenges progress through First transformations, Choose your question, Signs and interference, Repair the circuit, and Courier certification. They vary starting states, target states, allowed equipment, scanner placement, operation budgets and map layouts. Levels 21–22 introduce fixed optional hazard scanners and alternate routes.

Each level requires visiting every lettered station and guaranteeing the objective across all possible measurement outcomes. Echo puzzles accept either first reading, but require a predictable final scan. The red ! scanner is optional. `node campaign-test.js` verifies a contiguous winning route and its quantum solution for all 25 levels, plus station coverage, budgets and hazard rejection.

## Learning through play

| Room | Task | Concept |
| --- | --- | --- |
| Walk, scan, deliver | Deliver Z-up through a matching Z scanner | Eigenstates give predictable measurements |
| Ask the same question | Make the second scan predictable after a random first scan | Incompatible bases, collapse, repeatability |
| Change without looking | Transform Z-up into X-plus with one gate | Unitary transformation versus measurement |
| Make the paths add up | Produce Z-down using three H/Z operations | Relative phase and interference |

Z-up/down are approachable labels for computational states 0/1; X-plus/minus are the diagonal states. These labels do not refer to directions in the map. The courier's map position is classical and never claimed to be in spatial superposition. Only its carried key is simulated as a qubit.

The delivery pad checks whether the puzzle's guarantee is satisfied. It is a game verifier, not an additional quantum measurement. In room 2 either first X reading is accepted, provided the next scan is predictably the same; we do not postselect a lucky outcome.

## Quantum implementation and fidelity

`quantum.js` represents a normalized real state vector [alpha, beta]. H, X and Z and the chosen initial state stay within the real-amplitude subspace; general complex states, Y rotations, entanglement and hardware execution are outside the scope of this prototype.

- H: [(alpha + beta)/sqrt(2), (alpha - beta)/sqrt(2)].
- X: [beta, alpha].
- Z: [alpha, -beta].
- Z probabilities: alpha squared, beta squared.
- X probabilities: (alpha + beta) squared / 2, (alpha - beta) squared / 2.
- Measurements sample the Born distribution using the browser's pseudorandom generator, then replace the vector with the eigenstate of the recorded outcome.

Alongside the visible sampled trajectory, an exact weighted branch ensemble tracks every possible measurement outcome. Same-basis branch states are merged, so repeated measurements never cause unbounded branch growth. Delivery fidelity is checked across the ensemble with numerical tolerance 1e-9. This prevents lucky sampled outcomes from passing guarantee checks. Undo is a gameplay rewind restoring a previous simulation snapshot, not a claim that physical measurement can be reversed.

## Visual replay

Every station operation produces an animated before/after diagram. Signed amplitude bars show changes of sign separately from probabilities. Measurement cards show both possible readings and highlight the observed one. Replay only repeats the illustration; it never resamples or changes the state. Undo restores the previous operation visual, and restarting clears it.

## Architecture

- `quantum.js`: pure quantum-state operations, usable in browser or Node.
- `home-lab.js`: independent quantum playground and cursor effects.
- `onboarding.js`: welcome rules and dynamic tutorial coaching.
- `levels.js`: 25 campaign definitions, map routes and shared victory validation.
- `campaign-test.js`: all-level solvability and rules audit.
- `replay.js`: visual explanation of the latest operation.
- `game.js`: room definitions, equipment, movement, branch validation, feedback and UI.
- `index.html` and `style.css`: responsive play surface, accessible controls, reduced-motion support.
- `server.js`: optional loopback-only preview server, serving only the game's public files.
- `test.js`: model checks; run `node test.js` or `npm test`.

## Validation

Nine automated model checks cover normalization, H/X/Z involutions, HZH = X, complete probabilities, collapse, repeat measurements, incompatible-measurement disturbance, branch-based rejection of luck, bounded branch growth, all four puzzle solutions and phase changes. Browser playthroughs verified the four solutions, incorrect-route rejection, configuration changes and mission completion. Additional interaction and responsive checks are listed in DEMO.md.

## Originality and resources

Design inspiration: Portal's learn-by-doing progression and Baba Is You's small, editable puzzle spaces. No levels, game code, dialogue, graphics, characters or audio were copied from either title. This is an original prototype, not a claim of unprecedented quantum mechanics.

Third-party runtime libraries: **none**. External assets: **none**. Visuals use CSS and interface geometry; optional tones use Web Audio; fonts use the system stack. Development assistance: **OpenAI Codex generated the implementation and helped test it during this session**. The participant should disclose this assistance as required by the organizers and be able to explain the code.

## Submission status and participant write-up

The source and runnable browser build are included. A public repository and hosted link must be verified after publication; an unedited gameplay recording and the participant’s learning reflection are still required. The earlier public-repository-at-start and regular-commit requirements cannot be retroactively fulfilled by publishing now. The repository preserves the actual history; organizers determine eligibility.

The official website asks what the team learned during the learning phase and how it became gameplay. **The participant must supply their actual experience**; it has not been fabricated here. Suggested prompts: What initially confused you about X versus Z measurements? Which experiment made the distinction clear? How did that observation influence room 2?

See DEMO.md for a short walkthrough and recording outline.

## Interface design

The light interface takes visual inspiration from Google Store: generous spacing, rounded cards, simple navigation and blue action buttons. It uses original quantum-themed styling and a live X–Z state diagram computed from the current amplitudes: x = 2 alpha beta, z = alpha squared minus beta squared. It is a view of the real-amplitude state subspace, not a separate physics simulation. No Google assets or code are included.

## Bonus finale
After level 25, Continue opens The last quantum key. This bonus challenge combines five fixed-position stations with an optional destructive scanner and a detour. It starts from Z-down and requires guaranteed Z-up. It is also available from Chapter > Bonus · The finale. The solution and wrong-route rejection were tested, and the full finale was played in the browser.


## Preserved Git history
The browser upload is a publication snapshot. development-history.bundle preserves the two original local commits. Restore them separately with: git clone development-history.bundle recovered-history. This does not replace the public-at-start requirement.

