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

export const formatLongString = (str: string, maxLength: number) => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};

export const formatCurrency = (number: number, separate = ',') => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separate);
};
