export interface ServerFormState {
  status: "idle" | "success";
  data?: Record<string, unknown> | null;
}

export const initialServerState = {
  status: "idle",
} satisfies ServerFormState;
