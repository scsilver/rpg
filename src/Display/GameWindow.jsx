import React, { Component } from "react";
import { observer, Observer } from "mobx-react";
import { observable, computed } from "mobx";
import Grid from "./Structures/Grid.jsx";
import PropTypes from "prop-types";
import ActionPane from "./Panes/ActionPane.jsx";
import InfoPane from "./Panes/InfoPane.jsx";
import FullScreenPane from "./Panes/FullScreenPane.jsx";
import EffectsPane from "./Panes/EffectsPane.jsx";
import NewGameWizard from "./Panes/NewGameWizard.jsx";
import _ from "lodash";

import state from "../store/state.js";

class GameWindow extends Component {
  constructor(props) {
    super(props);
    this.state = state;
  }

  componentWillMount() {
    this.state.initializeGame();
    this.state.handleFullScreenDisplayClick();
    this.state.handleNewGameWizardClick();
  }

  handleKeyPress = _.throttle(state.handleKeyPress, 100, {
    leading: true
  });
  render() {
    return (
      <Observer>
        {() => (
          <div
            className="GameWindow"
            tabIndex="0"
            onKeyDown={this.state.handleKeyPress}
          >
            <NewGameWizard
              {...this.state.game}
              inputHandler={this.state.inputHandler}
              handleClick={this.state.handleNewGameWizardClick}
            />
            <FullScreenPane
              {...this.state.game.fullScreenPane}
              handleClick={this.state.handleFullScreenDisplayClick}
            />

            <EffectsPane {...this.state.game.effectsPane} />
            <ActionPane
              {...this.state}
              gameControls={{ newWorld: this.state.newWorld }}
            />
            <InfoPane
              {...this.state}
              gameControls={{ newWorld: this.state.newWorld }}
            />
          </div>
        )}
      </Observer>
    );
  }
}
export default GameWindow;
