import { useConsole } from "@/stores/console";
const console = useConsole();

export function error(message, ...args) {
  console.error(message, ...args);
  return new Error(message);
}

export default { error };
