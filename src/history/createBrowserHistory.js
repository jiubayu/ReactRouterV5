
/**
* history:
  action: (...)
  back: ƒ back()
  block: ƒ block(blocker)
  createHref: ƒ createHref(to)
  forward: ƒ forward()
  go: ƒ go(delta)
  listen: ƒ listen(listener)
  location: (...)
  push: ƒ push(to, state)
  replace: ƒ replace(to, state)
 */
function createBrowserHistory() {
  const globalHistory = window.history;
  let listeners: Function[] = [];
  /**
   * push传递参数的方式
   * push('/user', {id:1, name: 'dabao'})
   * push({pathname: '/user', state: {id:1, name: 'dabao'}})
   * @param pathname 跳转的路径名称
   * @param nextState 新的状态
   */
  function push(pathname: any, nextState: any) {
    const action = 'PUSH';
    let state;
    if (typeof pathname === 'object') {
      pathname = pathname.pathname;
      state = pathname.state;
    } else {
      state = nextState;
    }
    // 调用原生的pushState方法
    globalHistory.pushState(state, '', pathname);

    let location = { pathname, state };
    notify(action, location);
  }
  // 调用listener方法
  function notify(action: string, location: any) {
    // 确保location和history的location保持一致
    Object.assign(history, { action, location });
    // history.location = location;
    // history.action = action;
    // listeners.forEach((listener: Function) => listener(location));
  }

  function listen(listener: Function) {
    listeners.push(listener);
    // 监听方法，会返回一个卸载执行的函数
    return () => listeners.filter((item: Function) => item !== listener);
  }

  function go(n: number) {
    globalHistory.go(n);
  }

  function forward() {
    go(1);
  }

  function back() {
    go(-1);
  }

  // 增加事件监听
  // popState 可以监听history.go history.back history.forward事件
  // 但是无法监听pushState和replaceState事件，所以这两个事件要手动进行触发
  window.addEventListener('popstate', function (e: PopStateEvent) {
    console.log('popstate-----', location.pathname)
    let action = 'POP';
    let location = { pathname: this.window.location.pathname, state: this.window.history.state };
    // 触发监听事件
    notify(action, location);
  })
  const history = {
    action: 'POP', // 路由操作类型 pushState=PUSH,popState=POP,replaceState=REPLACE
    back,
    // block,
    // createHref, 
    forward,
    go,
    listen,
    push,
    // replace,
    location: { pathname: window.location.pathname, state: window.history?.state },
  };
  return history;
}

export default createBrowserHistory;
