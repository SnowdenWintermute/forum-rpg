import React, { Component } from "react";
import { connect } from "react-redux";

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStatTab: "stats"
    };
  }

  onStatsTabClick = e => {
    this.setState({ activeStatTab: e.target.name });
  };

  render() {
    let statTable;
    if (this.state.activeStatTab === "resistances")
      statTable = (
        <table className={"stats-table"}>
          <tbody>
            <tr>
              <td>Fire:</td>
              <td className="stats-table-number-column">1</td>
            </tr>
            <tr>
              <td>Ice:</td>
              <td className="stats-table-number-column">1</td>
            </tr>
            <tr>
              <td>Lightning:</td>
              <td className="stats-table-number-column">1</td>
            </tr>
            <tr>
              <td>Water:</td>
              <td className="stats-table-number-column">1</td>
            </tr>
            <tr>
              <td>Earth:</td>
              <td className="stats-table-number-column">1</td>
            </tr>
            <tr>
              <td>Wind:</td>
              <td className="stats-table-number-column">1</td>
            </tr>
            <tr>
              <td>Light:</td>
              <td className="stats-table-number-column">1</td>
            </tr>
            <tr>
              <td>Dark:</td>
              <td className="stats-table-number-column">1</td>
            </tr>
          </tbody>
        </table>
      );

    if (this.state.activeStatTab === "stats")
      statTable = (
        <table className={"stats-table"}>
          <tbody>
            <tr>
              <td>Level:</td>
              <td className="stats-table-number-column">1</td>
            </tr>
            <tr>
              <td>Experience:</td>
              <td className="stats-table-number-column">0 / 100</td>
            </tr>
            <tr>
              <td>HP:</td>
              <td className="stats-table-number-column">1</td>
            </tr>
            <tr>
              <td>MP:</td>
              <td className="stats-table-number-column">1</td>
            </tr>
            <tr>
              <td>Armor Class:</td>
              <td className="stats-table-number-column">1</td>
            </tr>
            <tr>
              <td>Magic Defense:</td>
              <td className="stats-table-number-column">1</td>
            </tr>
            <tr>
              <td>Damage:</td>
              <td className="stats-table-number-column">1 - 2</td>
            </tr>
            <tr>
              <td>Armor Piercing:</td>
              <td className="stats-table-number-column">1</td>
            </tr>
          </tbody>
        </table>
      );

    return (
      <section
        id="stats"
      >
        <div
          id="stats-tab-buttons"
          style={{
            width: "100%"
          }}
        >
          <button
            onClick={this.onStatsTabClick}
            name="stats"
            className="stats-tab-button"
            style={
              this.state.activeStatTab === "stats" ? { background: "#333" } : {}
            }
          >
            Stats
          </button>
          <button
            onClick={this.onStatsTabClick}
            name="resistances"
            className="stats-tab-button"
            style={
              this.state.activeStatTab === "resistances"
                ? { background: "#333" }
                : {}
            }
          >
            Resists
          </button>
        </div>
        {statTable}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Stats);
