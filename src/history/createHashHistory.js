/**
 * hash不能使用 浏览器的history对象了
 * @returns 
 */
function createHashHistory() {
  // 需要手动实现历史栈
  let historyStack = [];      // 历史栈
  let current = -1;           // 当前历史调用index
  let action = 'POP';         // 操作
  let state;                  // 传递的state值
  let listeners = [];         // 监听函数 存储

  function listen(listener: Function) {
    listeners.push(listener);
    // 监听方法，会返回一个卸载执行的函数
    return () => listeners.filter((item: Function) => item !== listener);
  }

  function push(pathname, nextState) {
    // 确定参数
    action = 'PUSH';
    if (typeof pathname === 'object') {
      pathname = pathname.pathname;
      state = pathname.state;
    } else {
      state = nextState;
    }

    window.location.hash = pathname;
  }
  // 监听到hash变化，执行history相应状态的更新，同时触发监听的函数
  function handleHashChange(event) {
    let pathname = window.location.hash.slice(1); // 去掉#
    // 更改history中的action，location
    let location = { pathname, state };
    Object.assign(history, { action, location });

    // 更改current指针,存储的是对应的location
    // 如果是push操作，进行添加操作
    if (action === 'PUSH') {
      historyStack[++current] = history.location;
    }
    // 触发回调
    listeners.forEach((listener) => listener(history.location));
  }

  // 监听hash变化，并进行相应的处理
  window.addEventListener('hashchange', handleHashChange)

  function go(n) {
    action = 'PUSH';
    current += n;
    let nextLocation = historyStack[current];
    state = nextLocation.state;

    window.location.hash = nextLocation.pathanme; // 修改hash值，从而修改当前的路径
  }

  function back() {
    go(-1);
  }

  function forward() {
    go(1);
  }

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
    location: { pathname: '/', state },
  }

  // 初始化
  if (window.location.hash) {
    action = 'PUSH';
    handleHashChange();
  } else {
    window.location.hash = '/';
  }

  return history;
}

export default createHashHistory;