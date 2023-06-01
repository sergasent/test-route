function handleError(promise) {
  return promise.catch((err) => console.log(`Ошибка: ${err}`));
}

export default handleError;
