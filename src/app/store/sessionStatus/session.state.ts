import { Session } from "src/app/models/session";

export interface SessionStoreState {
  sessionStatusModel: Session | null;
}

export const initialSessionStoreState: SessionStoreState = {
  sessionStatusModel: null
};
