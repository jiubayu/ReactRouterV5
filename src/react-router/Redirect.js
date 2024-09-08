import React from 'react';
import RouterContext from './RouterContext';
import Lifecycle from './Lifecycle';
function Redirect(props: any) {
  return (
    <RouterContext.Consumer>
      {
        contextValue => {
          let { history } = contextValue;
          return <Lifecycle onMount={() => history.push(props.to)} />
        }
      }
    </RouterContext.Consumer>
  )
}

export default Redirect;