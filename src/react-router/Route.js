import React, { useContext } from "react";
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";

function Route(props) {
  const { path='/', component: RouteComponent, computedMatch, render, children} = props;
  const { history, location } = useContext(RouterContext);
  let { pathname, state } = location || {};
  // Route包裹的组件中 props中传递 history，location，match等属性
  let routeProps = { location, history };
  // pathname: /user
  // path: / /user /profile
  // 如果之前匹配过，就不需要再次匹配了
  let match = computedMatch ? computedMatch : matchPath(pathname, props);
  console.log(children, 'children--')
  let element = null;
  if (match) {
    routeProps.match = match;
    if (RouteComponent) {
      element = <RouteComponent {...routeProps} />;
    } else if (render) {
      element = render(routeProps);
    } else if (children) {
      element = children(routeProps);
    } else {
      element = null;
    }
  } else {
    if (children) {
      element = children(routeProps);
    } else {
      element = null;
    }
  }
  return (
    <RouterContext.Provider value={routeProps}>
      {element}
    </RouterContext.Provider>
  )
}

export default Route;