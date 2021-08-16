import { CATAGORIES } from "Modules/Data";
import { BusinessEntity, Catagory } from "Modules/Model";
import React from "react";
import { connect } from "react-redux";
import { AppState } from "Store";
import "./FlowAssets.css";

export interface Props {
  addInfo: boolean;
  itemFields: BusinessEntity;
  updateItemFields: (data: BusinessEntity) => void;
  cancelSelection: (cancel: boolean) => void;
  refresh: () => void;
  download: () => void;
  delete: () => void;
}

interface State {
  catagory: Catagory[];
  itemFields: any;
}

class FlowAssets extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      catagory: CATAGORIES,
      itemFields: this.props.itemFields,
    };
  }

  componentDidMount() {}
  public onDragStart(event: any, data: Catagory) {
    event.dataTransfer.setData("data", JSON.stringify(data));
  }

  public assets() {
    return (
      <>
        <div className={"assets"}>
          <div
            data-testid="refresh-button"
            className="icon-btn"
            onClick={() => {
              this.props.refresh();
            }}
          >
            <i className="fas fa-redo svg"></i>
          </div>
          <div
            data-testid="download-button"
            className="icon-btn ml-2"
            onClick={() => {
              this.props.download();
            }}
          >
            <i className="fas fa-file-download svg-download"></i>
          </div>
        </div>
        <hr className="line" />
        <div className="item-container">
          {this.state.catagory.map((item, index) => {
            return (
              <div
                data-testid={`entity-${item.entityType}`}
                key={`${item}-${index.toString()}`}
                className="item"
                draggable={true}
                onDragStart={(e) => this.onDragStart(e, item)}
              >
                {item.entityTypeName}
              </div>
            );
          })}
        </div>
      </>
    );
  }

  public updateUserInput(item: string, value: string) {
    const itemFields = this.state.itemFields;
    itemFields[item] = value;
    this.setState({
      itemFields: itemFields,
    });
  }

  public addInfo() {
    return (
      <div className="feild-container">
        <div className="action-container">
          <button
            data-testid="save-button"
            className="btn btn-primary save-btn"
            onClick={() => {
              this.props.updateItemFields(this.state.itemFields);
            }}
          >
            Save
          </button>
          <button
            data-testid="cancel-button"
            className="btn btn-secondary cancel-btn"
            onClick={() => {
              this.props.cancelSelection(false);
            }}
          >
            Cancel
          </button>
          <div
            className="icon-btn ml-2"
            style={{ background: "darkred" }}
            onClick={() => {
              this.props.delete();
              this.props.cancelSelection(false);
            }}
          >
            <i className="far fa-trash-alt svg-delete"></i>
          </div>
        </div>
        {Object.keys(this.state.itemFields).map(
          (item: string, index: number) => {
            return (
              <div
                className="field mt-2"
                key={`${item}-field-${index.toString()}`}
              >
                <div
                  className="field-name"
                  key={`${item}-field-name-${index.toString()}`}
                >
                  {item}
                </div>
                <div className="field-element">
                  <input
                    data-testid={`${item}`}
                    key={`${item}-${index.toString()}`}
                    name="input"
                    type="text"
                    autoComplete="off"
                    className="field-input mt-1"
                    value={this.state.itemFields[item]}
                    onChange={(e: any) => {
                      this.updateUserInput(item, e.target.value);
                    }}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
    );
  }
  public render() {
    return (
      <div className="container-drag">
        <span
          className={this.props.addInfo ? "" : "hideElement"}
          data-testid="info-section"
        >
          {this.addInfo()}
        </span>
        <span
          className={this.props.addInfo ? "hideElement" : ""}
          data-testid="asset-section"
        >
          {this.assets()}
        </span>
      </div>
    );
  }
}
const mapStateToProps = (state: AppState) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FlowAssets);
