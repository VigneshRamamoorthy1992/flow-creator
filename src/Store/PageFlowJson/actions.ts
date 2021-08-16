import { PAGEFLOWJSON_UPDATE } from "./types";

export function updateFlowJsonRS(json: any) {
    return {
        type: PAGEFLOWJSON_UPDATE,
        pageFlowJson: json,
    }
}
