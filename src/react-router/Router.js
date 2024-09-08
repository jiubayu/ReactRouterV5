import React, { useEffect, useState } from "react";
import RouterContext from "./RouterContext";

function Router(props: any) {
  const { history } = props; // HashRouter或BrowserRouter 生成history传递过来的
  const [location, setLocation] = useState(history.location);
  // 监听location的变化
  useEffect(() => {
    let unlisten = history.listen((location) => {
      setLocation(location); // 触发页面刷新
    })
    return unlisten;
  }, []);
  const value = {
    location,
    history,
    match: Router.computeRootMatch(location.pathname)
  }
  return (
    <RouterContext.Provider value={value}>
      {props.children}
    </RouterContext.Provider>
  )
}

Router.computeRootMatch = (pathname) => {
  return { path: '/', url: '/', isExact: pathname === '/', params: {} };
}

export default Router;