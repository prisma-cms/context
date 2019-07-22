import React, { Component } from 'react';
import PropTypes from "prop-types";

import Context from "../../App";

import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'

import MainMenu from './MainMenu';
import { withStyles } from 'material-ui';
import DevMainPage from './pages/MainPage';
import ContextProviderDev from './ContextProvider';


export const styles = {

  root: {
    // border: "1px solid blue",
    height: "100%",
    display: "flex",
    flexDirection: "column",

    "& #Renderer--body": {
      // border: "1px solid green",
      flex: 1,
      overflow: "auto",
      display: "flex",
      flexDirection: "column",
    },
  },
}


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
        exact: false,
        path: "/",
        // component: DevMainPage,
        render: props => {
          // console.log("props", { ...props });
          return <DevMainPage
          >
          </DevMainPage>;
        }
        // render: props => {
        //   console.log("props", { ...props });
        //   return null;
        // }
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


  // renderWrapper() {

  //   return <ContextProvider>
  //     <SubscriptionProvider>
  //       {super.renderWrapper()}
  //     </SubscriptionProvider>
  //   </ContextProvider>;

  // }

  renderWrapper() {

    return <ContextProviderDev>
      {super.renderWrapper()}
    </ContextProviderDev>;

  }

  render() {

    const {
      pure,
      classes,
      ...other
    } = this.props;

    return pure ? <App
      {...other}
    /> :
      <div
        className={classes.root}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body, html, #root{
              height: 100%;
            }
          `,
          }}
        />
        {super.render()}
      </div>;

  }

}

export default withStyles(styles)(props => <DevRenderer
  {...props}
/>);