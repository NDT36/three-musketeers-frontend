import moment from 'moment';
import { ICategory } from 'state/resources/actions';

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

export const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function calcFromString(str: string) {
  const groupMulAndDiv = groupPriority(str);

  const arrayGrouped = calcMulDiv(groupMulAndDiv);

  return arrayGrouped.reduce((acc, cur) => (acc += Number(cur)), 0);
}

function groupPriority(str: string) {
  let flag = '';
  const results = [] as string[];
  const params = str.match(/[+\-*/]*(\.\d+|\d+(\.\d+)?)/g) || [];

  if (!params.length || params.length === 1) return [str];

  params.forEach((item, index) => {
    if (flag) {
      if (item.includes('*') || item.includes('/')) {
        flag += item;

        if (index + 1 === params.length) results.push(flag);
      }

      if (item.includes('+') || item.includes('-')) {
        results.push(flag);
        flag = '';

        if (index + 1 === params.length) results.push(item);
      }
    }

    if (!flag) flag = item;
  });

  return results;
}

function calcMulDiv(params: string[]) {
  const rs = params.map((item) => {
    if (item.includes('*') || item.includes('/')) {
      const operator = item[0] === '+' || item[0] === '-' ? item[0] : '+';
      const p = item.match(/[*/]*(\.\d+|\d+(\.\d+)?)/g) || [];

      const rs = p.reduce((acc, cur) => {
        if (cur.includes('*')) acc *= Number(cur.replace('*', ''));
        else if (cur.includes('/')) acc /= Number(cur.replace('/', ''));
        else {
          acc += Number(cur);
        }
        return acc;
      }, 0);

      return operator + rs;
    }

    return item;
  });
  return rs;
}

export const getCategoryById = (categoryId: string, categories?: ICategory[]) => {
  if (categories && Array.isArray(categories)) {
    return categories.find((item) => item._id === categoryId);
  }

  return;
};

export function handleChartData(
  data: { spent: { [key: string]: any }[]; earned: { [key: string]: any }[] },
  startDate: string,
  endDate: string
) {
  const currentDate = moment().format('YYYY-MM-DD');

  const listDate = new Array(moment(endDate).diff(moment(startDate), 'd') + 1)
    .fill(null)
    .map((item, index) => {
      return moment(startDate).add(index, 'd').format('YYYY-MM-DD');
    });

  const rs = listDate.reduce((acc, cur, index) => {
    const earn = data?.earned.find((item) => item._id === cur);
    const spent = data?.spent.find((item) => item._id === cur);
    if (cur > currentDate && !earn && !spent) return acc;

    const amountEarn = earn ? earn.amount : acc?.[index - 1]?.[1] || 0;
    const amountSpent = spent ? spent.amount : acc?.[index - 1]?.[2] || 0;
    acc.push([moment(cur).format('DD'), amountEarn, Math.abs(amountSpent)]);
    return acc;
  }, [] as any[]);

  return rs;
}
