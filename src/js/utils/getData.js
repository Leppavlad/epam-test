export function getData(url) {
  return new Promise((resolve, reject) => {
    fetch(url).then(data => data.json()).then(data => resolve(data));
  })
}