import React, { Component } from 'react';
import PropTypes from "prop-types";

import Context from "../../App";

import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'


class App extends Component {

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
        component: App,
      },
      // {
      //   path: "*",
      //   render: props => this.renderOtherPages(props),
      // },
    ].concat(routes);

  }


  render() {

    const {
      pure,
      ...other
    } = this.props;

    return pure ? <App
      {...other}
    /> : super.render();

  }

}

export default DevRenderer;