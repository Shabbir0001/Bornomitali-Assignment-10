

export  const addToDatabaseCart = (id, name) => {
    localStorage.setItem(id, name);
}

export const getDatabaseCart = () => {
  // const dataKey = getDataKey();
  const data = localStorage.getItem("/id") || "{}";
  return JSON.parse(data);
}

