import React, { PureComponent, Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import PrismaCmsPerformanceTester from "@prisma-cms/performance";

import App from '../App';

import Context from "@prisma-cms/context";


class DevAppRenderer2 extends Component {

  static contextType = Context;

  static defaultProps = {
  }

  constructor(props) {

    super(props);

    this.state = {
      context: {

      },
    }

  }

  render() {

    const {
      context: propContext,
      ...other
    } = this.props;

    const {
      context,
    } = this.state;

    // const sdfdsf = new Date().toString();

    return <App.Provider
      // value={Object.assign(context, {
      //   string_params: "string",
      //   // new_date: new Date(),
      //   // query: {
      //   //   fake: ``,
      //   // },
      // })}
      // value={context}
      value={{
        ...this.context,
        ...context,
        string_params: "string",
        // new_date: new Date(),
        // query: {
        //   fake: ``,
        //   sdfdsf: `new Date().toString()`,
        // },
      }}
    >
      <DevApp
        {...other}
      />
    </App.Provider>
  }
}



class DevApp extends PureComponent {

  static contextType = App;


  render() {

    return <Fragment>
      <div
        id="prisma-cms-performance-tester"
      >
        <PrismaCmsPerformanceTester
          // test={{}}
          props={this.props}
          state={this.state}
          context={this.context}
          prefix="dev_app"
        />
      </div>

      Prisma CMS Context
    </Fragment>
  }

}


export default DevAppRenderer2;
