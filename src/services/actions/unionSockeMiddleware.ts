import {createAction} from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "LIVE_TABLE_ACTION">("LIVE_TABLE_ACTION")
export const wsDisconnect = createAction("LIVE_TABLE_DISCONNECT")