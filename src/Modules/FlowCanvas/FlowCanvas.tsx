import { GET_ENTITY_TYPE_OBJECT } from "Modules/Data";
import FlowAssets from "Modules/FlowAssets/FlowAssets";
import { BusinessEntity, Catagory } from "Modules/Model";
import React from "react";
import { connect } from "react-redux";
import { AppState } from "Store";
import { updateFlowJsonRS } from "Store/PageFlowJson/actions";
import { PageFlowJsonIState } from "Store/PageFlowJson/types";
import "./FlowCanvas.css";

interface Props {
  fageFlowJsonRS: PageFlowJsonIState;
  updateFlowJsonRS: typeof updateFlowJsonRS;
}

interface State {
  addInfo: boolean;
  itemFields: any;
  selectedItemIdex: number;
  flowAssetKey: number;
  flowElement: any[];
  dragOverStyle: string;
  dragOverIndex: number;
}

class FlowCanvas extends React.Component<Props, State> {
  public dropArea = {
    type: "dropArea",
    selected: false,
  };
  public connector = {
    type: "connector",
    selected: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      addInfo: false,
      itemFields: {},
      selectedItemIdex: -1,
      flowAssetKey: Math.random(),
      flowElement: [],
      dragOverStyle: "",
      dragOverIndex: -1,
    };
  }

  componentDidMount() {}

  public updateAppState() {
    this.props.updateFlowJsonRS(
      this.state.flowElement
        .filter((z) => z.type === "itemContent")
        .map((item) => {
          return (({
            entityType,
            type,
            entityTypeName,
            selected,
            ...others
          }) => ({
            entityType: entityTypeName,
            ...others,
          }))(item);
        })
    );
  }

  public onDrop(e: any, index: number, type?: string) {
    e.preventDefault();
    const dataReceived: Catagory = JSON.parse(e.dataTransfer.getData("data"));
    const item = GET_ENTITY_TYPE_OBJECT(dataReceived.entityType);
    item.entityTypeName = dataReceived.entityTypeName;

    const newElementAddition = this.state.flowElement;
    if (newElementAddition.length === 0) {
      newElementAddition.push(this.dropArea);
      newElementAddition.push(this.connector);
      newElementAddition.push(item);
      newElementAddition.push(this.connector);
      newElementAddition.push(this.dropArea);
    } else if (type === "connector") {
      newElementAddition.splice(index + 1, 0, item, this.connector);
    } else {
      if (index === 0) {
        newElementAddition.splice(2, 0, item, this.connector);
      } else if (index === this.state.flowElement.length - 1) {
        newElementAddition.splice(index - 1, 0, this.connector, item);
      }
    }

    this.setState(
      {
        flowElement: newElementAddition,
      },
      () => {
        this.updateAppState();
      }
    );
  }

  public itemSelection(itemIndex: number) {
    const updateFlowList = this.state.flowElement.map((flow, index) => {
      if (index === itemIndex) {
        flow.selected = !flow.selected;
        this.setState({
          addInfo: flow.selected,
        });
        return flow;
      }
      flow.selected = false;
      return flow;
    });
    const selectedItem = this.state.flowElement[itemIndex];
    const userFields = (({
      entityType,
      type,
      entityTypeName,
      selected,
      ...others
    }) => ({
      ...others,
    }))(selectedItem);

    this.setState({
      flowElement: updateFlowList,
      selectedItemIdex: itemIndex,
      flowAssetKey: this.state.flowAssetKey + 1,
      itemFields: userFields,
    });
  }

  public updateSelectedData(updateData: boolean, data?: BusinessEntity) {
    const updateFlowList = this.state.flowElement.map((flow, index) => {
      if (index === this.state.selectedItemIdex) {
        flow.selected = false;
        if (updateData) {
          return Object.assign({}, flow, data);
        }
        return flow;
      }
      return flow;
    });
    this.setState(
      {
        flowElement: updateFlowList,
        addInfo: false,
      },
      () => {
        this.updateAppState();
      }
    );
  }

  public deleteItem() {
    if (this.state.selectedItemIdex !== -1) {
      let extFlowList = this.state.flowElement;
      extFlowList.splice(this.state.selectedItemIdex, 2);
      this.setState(
        {
          flowElement: extFlowList,
        },
        () => {
          this.updateAppState();
        }
      );
    }
  }

  public downloadJSON() {
    console.log("final result JSON: ", this.props.fageFlowJsonRS.pageFlowJson);
    // download file
    if (this.props.fageFlowJsonRS.pageFlowJson.length > 0) {
      const element = document.createElement("a");
      const file = new Blob(
        [
          JSON.stringify(
            {
              transactionWorkflow: this.props.fageFlowJsonRS.pageFlowJson,
            },
            null,
            2
          ),
        ],
        {
          type: "application/json",
        }
      );
      element.href = URL.createObjectURL(file);
      element.download = "Flow_Json.txt";
      document.body.appendChild(element);
      element.click();
    }
  }

  public dragOver(e: any, index: number) {
    e.preventDefault();
    this.setState({
      dragOverStyle: "dropAreaHover",
      dragOverIndex: index,
    });
  }

  public dragLeave(e: any) {
    e.preventDefault();
    this.setState({
      dragOverStyle: "",
      dragOverIndex: -1,
    });
  }
  public buildElement(item: any, index: number) {
    if (item.type === "dropArea") {
      return (
        <div
          data-testid="drop-area"
          key={`${item.type}-${index.toString()}`}
          className={`${item.type} ${
            this.state.dragOverIndex === index ? this.state.dragOverStyle : ""
          }`}
          onDragOver={(e) => {
            this.dragOver(e, index);
          }}
          onDragLeave={(e) => this.dragLeave(e)}
          onDrop={(e) => {
            this.onDrop(e, index);
          }}
        >
          drag & drop
        </div>
      );
    } else if (item.type === "connector") {
      return (
        <div
          data-testid="drop-area-connector"
          key={`${item.type}-${index.toString()}`}
          className={`${item.type} ${
            this.state.dragOverIndex === index ? this.state.dragOverStyle : ""
          }`}
          onDragOver={(e) => {
            this.dragOver(e, index);
          }}
          onDragLeave={(e) => this.dragLeave(e)}
          onDrop={(e) => {
            this.onDrop(e, index, item.type);
          }}
        >
          <div className="item-connector"></div>
        </div>
      );
    } else {
      return (
        <div
          data-testid="dropped-item"
          key={`${item.type}-${index.toString()}`}
          className={`${item.type} ${item.selected ? "item-selected" : ""}`}
          onClick={() => {
            this.itemSelection(index);
          }}
          title={JSON.stringify(
            (({ entityType, type, entityTypeName, selected, ...others }) => ({
              entityType: entityTypeName,
              ...others,
            }))(item)
          )}
        >
          {item.entityTypeName}
        </div>
      );
    }
  }
  public render() {
    return (
      <div className="canvas" data-testid="flow-canvas">
        <div
          data-testid="flow-canvas-drop-area"
          className="container-drop"
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            if (this.state.flowElement.length === 0) {
              this.onDrop(e, 0);
            }
          }}
        >
          <div className="container-view-area">
            {this.state.flowElement.map((item, index) => {
              return this.buildElement(item, index);
            })}
          </div>
        </div>
        <FlowAssets
          key={this.state.flowAssetKey}
          addInfo={this.state.addInfo}
          itemFields={this.state.itemFields}
          updateItemFields={(data: BusinessEntity) => {
            this.updateSelectedData(true, data);
          }}
          cancelSelection={(value: boolean) => {
            this.updateSelectedData(false);
          }}
          refresh={() => {
            this.setState(
              {
                flowElement: [],
              },
              () => {
                this.updateAppState();
              }
            );
          }}
          download={() => {
            this.downloadJSON();
          }}
          delete={() => {
            this.deleteItem();
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state: AppState) => ({
  fageFlowJsonRS: state.fageFlowJson,
});
const mapDispatchToProps = {
  updateFlowJsonRS,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowCanvas);
