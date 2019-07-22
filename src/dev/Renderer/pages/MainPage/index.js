import React, { Component, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import Page from "../layout";
import DevApp from '../../../App';

import { Link } from "react-router-dom";

class PureDiv extends PureComponent {

  render() {

    return <div>
      PureDiv {this.props.children}
    </div>
  }

}

const FunctionalyComponent = (props) => {

  return <div>
    FunctionalyComponent {props.children}
  </div>
}


class DevMainPage extends Page {

  render() {

    const {

      /**
       * https://github.com/ReactTraining/react-router/issues/5665
       */
      staticContext,

      children,
      ...other
    } = this.props;

    const {
      rendererForceUpdate,
    } = this.context;

    return super.render(
      <div>
        <div
          id="buttons"
        >
          <Link
            to="/"
          >
            Main page
          </Link>

          <Link
            to="/users"
          >
            Users
          </Link>

          <button
            onClick={event => this.forceUpdate()}
          >
            Force update
          </button>
          <button
            onClick={event => rendererForceUpdate()}
          >
            Force renderer update
          </button>
        </div>

        <div
          id="content"
        >
          <DevApp
            children={children || "Main page"}
            {...other}
          >
          </DevApp>

          <PureDiv>
            text
          </PureDiv>

          <FunctionalyComponent>
            text
          </FunctionalyComponent>

        </div>

      </div>
    );
  }
}


export default DevMainPage;