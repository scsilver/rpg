export const addMovementActions = state => {
  state.moveMovable = (
    { moveable = "player", move: { xOffset, yOffset } } = {}
  ) => {
    const { options } = state.game.world;
    if (moveable == "player") {
      moveable = state.player.get();
    }
    const { position: { x, y }, orientationDeg } = moveable;
    state.updateEffectsPane({ playerHealthHit: null });
    const movementOrientation = Math.atan2(xOffset, -yOffset) * 180 / Math.PI;
    if (movementOrientation == orientationDeg) {
      if (
        0 <= xOffset + x &&
        xOffset + x < options.side &&
        0 <= yOffset + y &&
        yOffset + y < options.side
      ) {
        state.interactionProcess(state.move);
        state.moveCharacter(moveable);
      }
    } else {
      state.turnPlayer(movementOrientation);
      state.turnCharacter(moveable, movementOrientation);
    }
  };
};
