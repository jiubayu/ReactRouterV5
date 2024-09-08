import React from 'react';
import { Route, Redirect } from '../react-router-dom';
const Protected = (props) => {
  let { component: RouteComponent, path } = props;
  console.log(localStorage.getItem('login'),'login')
  return (
    <Route path={path} render={
      (routeProps) => (
        localStorage.getItem('login') ? <RouteComponent {...routeProps} /> :
          <Redirect to={{ pathname: '/login', state: { from: path } }} />
      )
    } />
  )
}
export default Protected;

/**
 * path匹配当前地址栏中的location，渲染  否则就什么都不做，也就是不渲染任何组件
 * 
 * 指定一个Route渲染有3种方式
 * 1 component={RouteComponent} 直接指定一个组件 优点：简单 缺点：灵活性差
 * 2 render={() => Component} render可以指定一个渲染的方法，决定渲染的结果 优点：可以书写逻辑，不同情况渲染不同的组件
 * 
 * component和render都有一个共同点，就是路径匹配的时候才进行组件的渲染，不匹配不渲染 
 * 3 children
 */