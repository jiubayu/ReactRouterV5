import React, { useContext } from "react";
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";

function Switch(props) {
  const { history, location } = useContext(RouterContext);
  let element, match;
  React.Children.forEach(props.children, (child) => {
    // 如果还没有匹配上，并且当前的child是一个react元素的话
    // 如果已经匹配上了，后面的元素都跳过了，不再匹配了
    if (!match && React.isValidElement(child)) {
      element = child;
      match = matchPath(location.pathname, child.props);
    }
  })
  return match ? React.cloneElement(element, { computedMatch: match }) : null;
}

export default Switch;