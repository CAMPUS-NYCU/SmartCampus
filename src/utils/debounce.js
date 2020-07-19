/**
 * 返回一個debounce版本的function
 * @param func
 * @param wait
 * @return {function(...[*]=)}
 *
 * ref: https://medium.com/@kartikag01/debounce-api-request-in-react-functional-component-664b4971d9dd
 */
export default function debounce(func, wait) {
  let timeout
  return function (...args) {
    const context = this
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      func.apply(context, args)
    }, wait)
  }
}
