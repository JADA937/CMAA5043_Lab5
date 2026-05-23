# CMAA5043 Lab 5 — Jiayi Huang

This submission includes **in-class tutorials**, **earlier lab exercises** (course platform, portfolio, gallery, dark mode), and **Lab 5** (tank canvas game: debugging + new features).

## How to Run

1. Install **Node.js (LTS)**.
2. In the project folder:

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Submission Zip Naming

Package the full project folder and README as:

`CMAA5043_Lab5_FirstName_LastName.zip`

(Example: `CMAA5043_Lab5_Jiayi_Huang.zip`.)

## Lab 5 — Debugging and Adding Features

Open the **Lab 5 Tank** tab in the app.

### Assignment No.1 — Tank boundary bug

- **Issue (fixed):** The tank could move past the canvas edge and disappear.
- **Fix:** In `src/TankGame.jsx`, the `updateGame()` function clamps the tank position after movement so the **40×40** tank always stays inside the **800×600** canvas (`x` in `[0, 760]`, `y` in `[0, 560]`). Look for comments marked **Lab 5 Assignment 1**.

### Assignment No.2 — At least two new features

Implemented in `src/TankGame.jsx`:

1. **Enemy targets (Option A):** Red targets on the field; destroying them with bullets increases the score.
2. **Landscape (Option C):** Gradient sky, distant hills, and a ground band drawn under gameplay.
3. **Visual feedback:** Brief expanding ring / glow when an enemy is hit (complements Option B).

Controls: **WASD** or **arrow keys** to move, **mouse** to aim, **left click** to fire.

### Assignment No.3 — GitHub

**Repository:** [https://github.com/JADA937/CMAA5043_Lab5](https://github.com/JADA937/CMAA5043_Lab5)

## Project Structure (Key Files)

- `src/App.jsx` — tabs including **Lab 5 Tank**
- `src/TankGame.jsx` — Lab 5 canvas game, `updateGame()`, boundaries, enemies, landscape, hit feedback
- `src/Portfolio.jsx`, `src/Gallery.jsx` — earlier lab work
- `src/Tutorials.jsx` — in-class tutorials
- `src/course.js` — Exercise 1 course cards
