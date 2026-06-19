// import { create } from "zustand";

// // Global reactive tracking manager for active live voice consultation channels

// export const useCallStore = create((set, get) => ({
//   status: "idle",
//   callSessionId: null,
//   vapiCallId: null,
//   doctor: null,
//   durationSec: 0,
//   isMuted: false,
//   vapiInstance: null,
//   _timer: null,

//   setVapi: (instance) => set({ vapidInstance: instance }),

//   setDoctor: (doctor) => set({ doctor }),
//   setCallSession: (callSessionId) => set({ callSessionId }),
//   setVapiCallId: (vapiCallId) => set({ vapiCallId }),
//   setStatus: (status) => set({ status }),

//   startTime: () => {
//     const state = get();
//     if (state._timer) clearInterval(state._timer);
//     const timer = setInterval(() => {
//       set({ durationSec: get().durationSec + 1 });
//     }, 1000);
//     set({ _time: timer, durationSect: 0 });
//   },

//   stopTime: () => {
//     const state = get();
//     if (state._timer) clearInterval(state._timer);
//     set({ timer: null });
//   },

//   toggleMute: () => {
//     const { vapiInstance, isMuted } = get();
//     const newMuteState = !isMuted;

//     if (vapiInstance && typeof vapiInstance.setMuted === "function")
//       vapiInstance.setMuted(newMuteState);
//     set({ isMuted: newMuteState });
//   },

//   reset: () => {
//     const state = get();
//     if (state._timer) clearInterval(state._timer);
//     set({
//       status: "idle",
//       callSessionId: null,
//       vapiCallId: null,
//       durationSec: 0,
//       isMuted: false,
//       _timer: null,
//     });
//   },
// }));

import { create } from "zustand";

// Global reactive tracking manager for active live voice consultation channels

export const useCallStore = create((set, get) => ({
  status: "idle",
  callSessionId: null,
  vapiCallId: null,
  doctor: null,
  durationSec: 0,
  isMuted: false,
  vapiInstance: null,
  _timer: null,

  // ✅ Fix 1: "vapidInstance" → "vapiInstance"
  setVapi: (instance) => set({ vapiInstance: instance }),

  setDoctor: (doctor) => set({ doctor }),
  setCallSession: (callSessionId) => set({ callSessionId }),
  setVapiCallId: (vapiCallId) => set({ vapiCallId }),
  setStatus: (status) => set({ status }),

  // ✅ Fix 2: "startTime" → "startTimer" (matched what CallRoom expects)
  // ✅ Fix 3: "_time" → "_timer"
  // ✅ Fix 4: "durationSect" → "durationSec"
  startTimer: () => {
    const state = get();
    if (state._timer) clearInterval(state._timer);
    const timer = setInterval(() => {
      set({ durationSec: get().durationSec + 1 });
    }, 1000);
    set({ _timer: timer, durationSec: 0 });
  },

  // ✅ Fix 5: "stopTime" → "stopTimer" (matched what CallRoom expects)
  // ✅ Fix 6: "timer" → "_timer"
  stopTimer: () => {
    const state = get();
    if (state._timer) clearInterval(state._timer);
    set({ _timer: null });
  },

  toggleMute: () => {
    const { vapiInstance, isMuted } = get();
    const newMuteState = !isMuted;

    if (vapiInstance && typeof vapiInstance.setMuted === "function")
      vapiInstance.setMuted(newMuteState);
    set({ isMuted: newMuteState });
  },

  reset: () => {
    const state = get();
    if (state._timer) clearInterval(state._timer);
    set({
      status: "idle",
      callSessionId: null,
      vapiCallId: null,
      durationSec: 0,
      isMuted: false,
      _timer: null,
    });
  },
}));
