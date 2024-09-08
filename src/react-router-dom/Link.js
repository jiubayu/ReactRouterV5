import React from 'react';
import { __RouterContext as RouteContext } from '.';

function Link(props) {
  const { to } = props;
  return (
    <RouteContext.Consumer>
      {
        contextValue => {
          const { history} = contextValue;
          return (
            <a {...props} onClick={(event) => {
              event.preventDefault();
              history.push(to);
            }}>{ props.children}</a>
          )
        }
      }
    </RouteContext.Consumer>
  )
}

export default Link;