import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "Store";
import Home from "./Home";

const store = configureStore({});
async function renderComponent() {
  return render(
    <Provider store={store}>
      <Home />
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
  });
});
