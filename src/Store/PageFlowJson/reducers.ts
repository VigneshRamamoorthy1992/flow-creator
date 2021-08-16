import { ActionTypes, PageFlowJsonIState, PAGEFLOWJSON_UPDATE } from "./types";

const initialState: PageFlowJsonIState = {
    pageFlowJson: []
};
export function PageFlowJsonReducer(
    state = initialState,
    action: ActionTypes
): PageFlowJsonIState {
    switch (action.type) {
        case PAGEFLOWJSON_UPDATE:
            return {
                pageFlowJson: action.pageFlowJson
            }
        default:
            return state;
    }
}
