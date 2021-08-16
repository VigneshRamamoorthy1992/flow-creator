import React from "react";
import "./Home.css";
import { connect } from "react-redux";
import { AppState } from "Store";
import FlowCanvas from "Modules/FlowCanvas/FlowCanvas";

interface Props {}

interface State {}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  public render() {
    return <FlowCanvas />;
  }
}
const mapStateToProps = (state: AppState) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
