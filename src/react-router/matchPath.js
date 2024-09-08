import { pathToRegexp } from 'path-to-regexp';

function compilePath(path, options) {
  let keys = [];
  let regexp = pathToRegexp(path, keys, options);
  return {
    keys, regexp
  }
}

function matchPath(pathname, options = {}) {
  const { path = '/', exact = false, sensitive = false, strict = false } = options;
  // /post/:id  keys=["id"] regexp= /\/post\/([^\/]+?)/
  let { keys, regexp } = compilePath(path, { end: exact, sensitive, strict });
  
  const match = regexp.exec(pathname);
  if (!match) return null;
  let [url, ...values] = match;
  // pathname /post/1/name !== /post/1 这不是精确匹配
  let isExact = url === pathname;
  if (exact && !isExact) return null;

  return {
    path, 
    url,
    isExact,
    params: keys.reduce((memo, key, index) => {
      memo[key.name] = values[index];
      return memo;
    }, {})
  }
}

export default matchPath;