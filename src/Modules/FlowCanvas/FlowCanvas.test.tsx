import {
  render,
  RenderResult
} from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "Store";
import FlowCanvas from "./FlowCanvas";

const store = configureStore({});
async function renderComponent() {
  return render(
    <Provider store={store}>
      <FlowCanvas />
    </Provider>
  );
}

describe("FlowAssets.tsx", () => {
  let renderResult: RenderResult;

  describe("Basic", () => {
    beforeEach(async () => {
      renderResult = await renderComponent();
    });

    test("should render component", () => {
      expect(renderResult).toBeDefined();
    });
    test("should show canvas", () => {
      expect(renderResult.getByTestId("flow-canvas")).toBeVisible();
    });
    test("should show drop area", () => {
      const dropArea = renderResult.getByTestId("flow-canvas-drop-area");
      expect(dropArea).toBeDefined();
      expect(dropArea).toBeVisible();
    });
  });
});
