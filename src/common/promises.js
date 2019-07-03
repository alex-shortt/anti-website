export function delay(timeout) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, timeout);
  });
}