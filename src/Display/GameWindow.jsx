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
import { Box, Column } from "../../ui/layout/Grid.jsx";

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
    console.log("chance", {
      change: state.percentPicker([
        { name: "a", chance: 1 },
        { name: "b", chance: 2 }
      ])
    });
    return (
      <Observer>
        {() => (
          <Box
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
            <Box
              height={40}
              backgroundImage="url(https://images.template.net/wp-content/uploads/2017/01/07045821/White-Parchment-Paper-Texture.jpg)"
            >
              <ActionPane
                {...this.state}
                gameControls={{ newWorld: this.state.newWorld }}
              />
            </Box>
            <Box
              height={10}
              backgroundImage="url(https://images.template.net/wp-content/uploads/2017/01/07045821/White-Parchment-Paper-Texture.jpg)"
              position="fixed"
              bottom={0}
            >
              <InfoPane
                {...this.state}
                gameControls={{ newWorld: this.state.newWorld }}
              />
            </Box>
          </Box>
        )}
      </Observer>
    );
  }
}
export default GameWindow;
