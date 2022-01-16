export const customNavigate = (path: string) => {
  window.location.hash = `#${path}`;
};

export const toBearer = (token: string) => `Bearer ${token}`;
