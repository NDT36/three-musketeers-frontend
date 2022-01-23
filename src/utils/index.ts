export const customNavigate = (path: string) => {
  window.location.hash = `#${path}`;
};

export const toBearer = (token: string) => `Bearer ${token}`;

export const reverseObjectEnum = (obj: { [key: string]: any }) => {
  return Object.keys(obj).reduce((acc, cur) => {
    acc[String(obj[cur])] = cur;
    return acc;
  }, {} as { [key: string]: string });
};
