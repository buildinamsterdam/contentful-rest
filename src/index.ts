import { HookProps } from "./types";

const useHook = ({ foo, bar }: HookProps) => {
  return bar ? foo + bar : foo;
};

export default useHook;

export type { HookProps };
