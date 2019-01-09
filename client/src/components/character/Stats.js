import React, { Component } from "react";
import { connect } from "react-redux";
import {updateStats} from '../../actions/characterActions'
import LoadingGif from '../../img/loading.gif'

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStatTab: "stats",
      character: this.props.character
    };
  }

  componentDidMount() {
    this.props.updateStats();
    this.setState({character: this.props.character})
    // console.log(this.state)
  }

  onStatsTabClick = e => {
    this.setState({ activeStatTab: e.target.name });
  };

  render() {
    let statTable;
    let loadingGif = <img src={LoadingGif} alt="-" style={{height:"15px"}}></img>
    let character = this.props.character.character
    if (this.state.activeStatTab === "resistances")
      statTable = (
        <table className={"stats-table"}>
          <tbody>
            <tr>
              <td style={{color:"#F55"}}>Fire:</td>
              <td className="stats-table-number-column">
                {character ? character.stats.resistances.fire ? character.stats.resistances.fire: 0 :loadingGif}
              </td>
            </tr>
            <tr>
              <td style={{color:"#AFF"}}>Ice:</td>
              <td className="stats-table-number-column">
              {character ? character.stats.resistances.ice ? character.stats.resistances.ice: 0 :loadingGif}
              </td>
            </tr>
            <tr>
              <td style={{color:"#AAF"}}>Lightning:</td>
              <td className="stats-table-number-column">
                {character ? character.stats.resistances.lightning ? character.stats.resistances.lightning: 0 :loadingGif}
              </td>
            </tr>
            <tr>
              <td style={{color:"#69F"}}>Water:</td>
              <td className="stats-table-number-column">
                {character ? character.stats.resistances.water ? character.stats.resistances.water: 0 :loadingGif}
              </td>
            </tr>
            <tr>
              <td style={{color:"#f4e542"}}>Earth:</td>
              <td className="stats-table-number-column">
                {character ? character.stats.resistances.earth ? character.stats.resistances.earth: 0 :loadingGif}
              </td>
            </tr>
            <tr>
              <td style={{color:"#86f442"}}>Wind:</td>
              <td className="stats-table-number-column">
                {character ? character.stats.resistances.wind ? character.stats.resistances.wind: 0 :loadingGif}
              </td>
            </tr>
            <tr>
              <td style={{color:"#f6f7ef"}}>Light:</td>
              <td className="stats-table-number-column">
                {character ? character.stats.resistances.light ? character.stats.resistances.light: 0 :loadingGif}
              </td>
            </tr>
            <tr>
              <td style={{color:"#B48"}}>Dark:</td>
              <td className="stats-table-number-column">
                {character ? character.stats.resistances.dark ? character.stats.resistances.dark: 0 :loadingGif}
              </td>
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
              <td className="stats-table-number-column">{character ? character.lvl:loadingGif}</td>
            </tr>
            <tr>
              <td>Experience:</td>
              <td className="stats-table-number-column">{character ? character.exp.current:loadingGif}/{character ? character.exp.nextLevel:loadingGif}</td>
            </tr>
            <tr>
              <td>HP:</td>
              <td className="stats-table-number-column">{character ? character.stats.hp.current:loadingGif}/{character ? character.stats.hp.max:loadingGif}</td>
            </tr>
            <tr>
              <td>MP:</td>
              <td className="stats-table-number-column">{character ? character.stats.mp.current:loadingGif}/{character ? character.stats.mp.max:loadingGif}</td>
            </tr>
            <tr>
              <td>Damage:</td>
              <td className="stats-table-number-column">1 - 2</td>
            </tr>
            <tr>
              <td>Accuracy:</td>
              <td className="stats-table-number-column">{character ? character.stats.accuracy ? character.stats.accuracy: 0 :loadingGif}</td>
            </tr>
            <tr>
              <td>Strength:</td>
              <td className="stats-table-number-column">{character ? character.stats.str ? character.stats.str: 0 :loadingGif}</td>
            </tr>
            <tr>
              <td>Dexterity:</td>
              <td className="stats-table-number-column">{character ? character.stats.dex ? character.stats.dex: 0 :loadingGif}</td>
            </tr>
            <tr>
              <td>Intelligence:</td>
              <td className="stats-table-number-column">{character ? character.stats.int ? character.stats.int: 0 :loadingGif}</td>
            </tr>
            <tr>
              <td>Armor Class:</td>
              <td className="stats-table-number-column">{character ? character.stats.armorClass ? character.stats.armorClass: 0 :loadingGif}</td>
            </tr>
            <tr>
              <td>Evasion:</td>
              <td className="stats-table-number-column">{character ? character.stats.evasion ? character.stats.evasion: 0 :loadingGif}</td>
            </tr>
            <tr>
              <td>Magic Defense:</td>
              <td className="stats-table-number-column">{character ? character.stats.magicDefense ? character.stats.magicDefense: 0 :loadingGif}</td>
            </tr>
            <tr>
              <td>Magic Accuracy:</td>
              <td className="stats-table-number-column">{character ? character.stats.magicAccuracy ? character.stats.magicAccuracy: 0 :loadingGif}</td>
            </tr>
            <tr>
              <td>Armor Piercing:</td>
              <td className="stats-table-number-column">{character ? character.stats.armorPiercing ? character.stats.armorPiercing: 0 :loadingGif}</td>
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
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.character !== prevState.character){
      this.setState({ character: this.props.character });
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  character: state.character
});

export default connect(
  mapStateToProps,
  {updateStats}
)(Stats);
