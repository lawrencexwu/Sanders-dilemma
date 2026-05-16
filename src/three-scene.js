// The presentation previously used a Three.js node-network background.
// Per design feedback, the moving particles hurt readability, so the
// backdrop is now a calm, static dark gradient rendered purely in CSS
// (see #bg-canvas styling). This module keeps the same small API so the
// app shell does not need to change.

export function createScene(/* canvas */) {
  return {
    goTo() {},
    setPaused() {},
    dispose() {},
  };
}
