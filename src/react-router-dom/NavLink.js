import React from 'react';
import Route from '../react-router/Route';
import { Link } from '.';

export default function NavLink(props) {
  // ! 核心思想是利用地址栏中的location的pathname字段和props中的to属性比对，如果是一样的就说明激活了
  const {
    to,
    exact,
    className = '',
    activeClassName = 'active',
    style = {},
    activeStyle = {},
    children
  } = props;
  return (
    <Route path={to} exact={exact}>
      {/* children这里是一个函数 (routeProps) => element, 注意后续使用方法 */}
      {
        (routeProps) => {
          // 匹配上了会有match属性
          const { match } = routeProps;
          let linkProps = {
            to,
            className: match ? `${className} ${activeClassName}` : className,
            style: match ? { ...style, ...activeStyle } : style,
            children,
          };
          return <Link {...linkProps} />
        }
      }
    </Route>
  )
}
