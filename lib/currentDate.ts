// 2025-05-31T20:21:32.988Z

const year = new Date().getFullYear();
const month = String(new Date().getMonth() + 1).padStart(2, "0");
const date = String(new Date().getDate()).padStart(2, "0");
const hour = String(new Date().getHours()).padStart(2, "0");
const minute = String(new Date().getMinutes()).padStart(2, "0");
const second = String(new Date().getSeconds()).padStart(2, "0");
const milliseconds = new Date().getMilliseconds();

export const currentNow = `${year}-${month}-${date}T${hour}:${minute}:${second}.${milliseconds}Z`;
