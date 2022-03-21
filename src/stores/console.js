import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useConsole = defineStore("console", () => {
  const hidden = ref(false);

  function handleConsole(functionName, args) {
    if (!hidden.value) {
      console[functionName](...args);
    }
  }

  const consoleFunctions = {
    log: (...args) => handleConsole("log", args),
    debug: (...args) => handleConsole("debug", args),
    info: (...args) => handleConsole("info", args),
    warn: (...args) => handleConsole("warn", args),
    error: (...args) => handleConsole("error", args),
    assert: (...args) => handleConsole("assert", args),
    count: (...args) => handleConsole("count", args),
    countReset: (...args) => handleConsole("countReset", args),
    group: (...args) => handleConsole("group", args),
    groupCollapsed: (...args) => handleConsole("groupCollapsed", args),
    groupEnd: (...args) => handleConsole("groupEnd", args),
    table: (...args) => handleConsole("table", args),
    time: (...args) => handleConsole("time", args),
    timeLog: (...args) => handleConsole("timeLog", args),
    timeEnd: (...args) => handleConsole("timeEnd", args),
    trace: (...args) => handleConsole("trace", args),
  };

  return { hidden, ...consoleFunctions };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConsole, import.meta.hot));
}
