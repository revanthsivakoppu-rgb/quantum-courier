# Quantum Courier demo

## Tutorial walkthrough (spoilers)

1. Room 1: walk right eight steps. Watch the Z scanner preserve Z-up.
2. Room 2: try the default route once. The X scan followed by Z is not reliable. Select B, choose X basis, then walk right eight steps. Pause after A to see that an initially random result has become certain for another X measurement.
3. Room 3: select H gate, then walk right eight steps. Z becomes 50/50, while X-plus becomes 100%.
4. Room 4: select B and change it to Z; select C and change it to H. Walk right. Pause after the first H and after Z to compare probabilities and relative sign. Continue through the final H to deliver Z-down with certainty.

Alternative final-room solution: rearrange the default H/H/Z stations into H/Z/H spatial order using Move this station and temporary side floor tiles. The state is transformed in traversal order, not station-name order.

## Campaign

Select Play · 25 levels to enter the campaign. Five chapters contain five levels each. Start with chapter 1 for gates, chapter 2 for scanners, chapter 3 for interference, chapter 4 for mixed circuits and chapter 5 for routing and combined challenges. Hints give an example solution. Progress is stored only in the current browser.

## Suggested two-minute unedited recording

Record the actual browser window continuously. This is a suggested outline, not a recording or a fabricated play session.

- 0:00–0:15: goal, movement, the quantum key.
- 0:15–0:35: room 1 and its certain Z reading.
- 0:35–1:05: room 2; show the wrong basis, then matching X scans.
- 1:05–1:25: room 3's H gate; explain that it transforms without reading.
- 1:25–1:55: room 4 H → Z → H; pause on relative sign and finish.
- 1:55–2:00: mention accurate single-qubit simulation and all-branch validation.

## Technical Q&A

**Why not use a random coin for every scan?** A scan samples probabilities derived from amplitudes, and collapses the state. Repeating in the same basis is certain.

**How is phase visible?** Z changes the relative amplitude sign, leaving Z probabilities alone. The next H makes amplitudes add or cancel.

**How do you prevent lucky solutions?** The visible run is sampled, while a separate weighted ensemble checks all possible branches.

**Is this all of quantum computing?** No. It is a focused introduction to one qubit, measurement bases and real-valued H/X/Z gate operations.

**What is the role of undo?** It restores a game snapshot. It does not physically reverse measurement.

## Browser verification

- All four solutions were played using real keyboard controls.
- Wrong scanner basis and wrong gate routes were rejected with explanations.
- Room navigation and the mission-complete dialog were checked.
- No browser error logs were observed during the full playthrough.

- Station relocation, undo and restart were checked in the browser.
- Phone layout was checked at a 390-pixel viewport with no horizontal overflow; on-screen movement was verified.


- All 25 campaign solutions were verified by a branch-exact simulation, including contiguous walking routes, budgets, station coverage and hazard rejection.
- Browser checks covered tutorial navigation, campaign levels 1 and 3, nonzero initial state preparation, the level 21 detour, level 25 completion and summary, and saved progress across reload.
