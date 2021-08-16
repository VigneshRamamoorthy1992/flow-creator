import { render, RenderResult } from "@testing-library/react";
import React from "react";
import FlowAssets, { Props } from "./FlowAssets";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import configureStore from "Store";
import { CATAGORIES } from "Modules/Data";

const mockProps = {
  addInfo: true,
  itemFields: {
    field1: "",
    field2: "",
  } as any,
  updateItemFields: jest.fn(),
  cancelSelection: jest.fn(),
  refresh: jest.fn(),
  download: jest.fn(),
  delete: jest.fn(),
};

const store = configureStore({});
async function renderComponent(props: Props) {
  return render(
    <Provider store={store}>
      <FlowAssets {...props} />
    </Provider>
  );
}

describe("FlowAssets.tsx", () => {
  let renderResult: RenderResult;

  describe("Basic", () => {
    beforeEach(async () => {
      renderResult = await renderComponent(mockProps);
    });

    test("should render component", () => {
      expect(renderResult).toBeDefined();
    });

    test("should show refresh button", () => {
      const refreshButton = renderResult.getByTestId("refresh-button");
      expect(refreshButton).toBeDefined();
      expect(refreshButton).toBeVisible();
    });

    test("should invoke refresh callback", () => {
      const refreshButton = renderResult.getByTestId("refresh-button");
      expect(mockProps.refresh).toHaveBeenCalledTimes(0);
      userEvent.click(refreshButton);
      expect(mockProps.refresh).toHaveBeenCalledTimes(1);
    });

    test("should show download button", () => {
      const downloadButton = renderResult.getByTestId("download-button");
      expect(downloadButton).toBeDefined();
      expect(downloadButton).toBeVisible();
    });

    test("should invoke download callback", () => {
      const downloadButton = renderResult.getByTestId("download-button");
      expect(mockProps.download).toHaveBeenCalledTimes(0);
      userEvent.click(downloadButton);
      expect(mockProps.download).toHaveBeenCalledTimes(1);
    });
  });

  describe("Disable Add Info / Asset Sections ", () => {
    test("should hide info section", async () => {
      renderResult = await renderComponent({ ...mockProps, addInfo: false });
      const assetSection = renderResult.getByTestId("info-section");
      expect(assetSection).toHaveClass("hideElement");
    });

    test("should hide asset section", async () => {
      renderResult = await renderComponent({ ...mockProps, addInfo: true });
      const assetSection = renderResult.getByTestId("asset-section");
      expect(assetSection).toHaveClass("hideElement");
    });
  });

  describe("Business Entity", () => {
    beforeEach(async () => {
      renderResult = await renderComponent(mockProps);
    });

    test("should show 'Customer' Business Entity", async () => {
      expect(renderResult.getByTestId("entity-Customer")).toBeVisible();
    });

    test("should have draggable attribute", () => {
      CATAGORIES.forEach((category) => {
        const entities = renderResult.queryAllByTestId(
          `entity-${category.entityType}`
        );
        entities.forEach((entity) => {
          expect(entity).toHaveAttribute("draggable", "true");
        });
      });
    });
  });

  describe("Add Info", () => {
    beforeEach(async () => {
      renderResult = await renderComponent(mockProps);
    });

    test("should show input fields", () => {
      expect(renderResult.getByTestId("field1")).toBeVisible();
      expect(renderResult.getByTestId("field2")).toBeVisible();
    });

    test("should show save button", () => {
      expect(renderResult.getByTestId("save-button")).toBeVisible();
    });

    test("should show cancel button", () => {
      expect(renderResult.getByTestId("cancel-button")).toBeVisible();
    });

    test("should invoke respective callbacks on button actions", () => {
      const saveButton = renderResult.getByTestId("save-button");
      userEvent.click(saveButton);
      expect(mockProps.updateItemFields).toHaveBeenCalledWith(
        mockProps.itemFields
      );

      const cancelButton = renderResult.getByTestId("cancel-button");
      userEvent.click(cancelButton);
      expect(mockProps.cancelSelection).toHaveBeenCalledWith(false);
    });
  });
});
