import React, {useEffect} from 'react';

function Lifecycle(props) {
  const { onMount, onUnmount } = props;
  useEffect(() => {
    onMount && onMount();
    if (onUnmount) {
      return onUnmount;
    }
  }, [])
}
export default Lifecycle;