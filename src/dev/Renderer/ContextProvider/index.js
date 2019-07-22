
import React, {
  Component,
} from 'react';

import Context from '@prisma-cms/context';


class ContextProviderDev extends Component {

  static contextType = Context;


  // componentWillMount() {

  //   // const {
  //   //   query,
  //   //   ...other
  //   // } = this.context;

  //   // this.newContext = {
  //   //   query: {
  //   //     ...query,
  //   //     ...this.prepareQuery(),
  //   //   },
  //   //   ...other
  //   // }

  //   Object.assign(this.context, {
  //     ...UI,
  //   });

  // }


  render() {

    const {
      children,
    } = this.props;

    let {
      query,
    } = this.context;

    Object.assign(this.context, {
      query: {
        ...query,
        ...this.prepareQuery(),
      },
    });

    return <Context.Provider
      value={this.context}
    >
      {children || null}
    </Context.Provider>;

    // return children || null;

  }

  prepareQuery() {

    return {
      ...this.prepareUserQuery(),
    }
  }

  prepareUserQuery() {


    const users = `
      query users__ (
        $where: UserWhereInput
        $orderBy: UserOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: users (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...UserNoNesting
        }
      }
    `;


    return {
      users,
    }

  }

}

export default ContextProviderDev;