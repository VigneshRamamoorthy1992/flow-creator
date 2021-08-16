export interface PageFlowJsonIState {
    pageFlowJson: any;
}

export const PAGEFLOWJSON_UPDATE = "PAGEFLOWJSON_UPDATE";

type actionType = typeof PAGEFLOWJSON_UPDATE;

interface Action {
    type: actionType,
    pageFlowJson: any;
}

export type ActionTypes = Action;
