import React, { Component } from 'react';
import PropTypes from "prop-types";

import Context from "../../App";

import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'

import MainMenu from './MainMenu';


// const DevApp = ({value}) => value || "App";

class DevApp extends Component {

  static contextType = Context;

  render() {

    const {
      value,
    } = this.context;

    return value || "No context value";
  }

}

class DevRenderer extends PrismaCmsRenderer {


  static propTypes = {
    ...PrismaCmsRenderer.propTypes,
    pure: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsRenderer.defaultProps,
    pure: false,
  }


  getRoutes() {

    let routes = super.getRoutes();

    return [
      {
        exact: true,
        path: "/",
        component: DevApp,
      },
      // {
      //   path: "*",
      //   render: props => this.renderOtherPages(props),
      // },
    ].concat(routes);

  }


  renderMenu() {

    return <MainMenu />
  }


  render() {

    const {
      pure,
      ...other
    } = this.props;

    return <Context.Provider
      value={{ value: "Test value" }}
    >
      {pure ? <DevApp
        {...other}
      /> : super.render()}
    </Context.Provider>;

  }

}

export default DevRenderer;