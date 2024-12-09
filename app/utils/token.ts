export const verifyToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return null
  }

  return token;
};

export const validateToken = (token: string | null): boolean => {
  if (!token) {
    return false;
  }

  try {
    const payload = atob(token.split('.')[1]);
    const decoded = JSON.parse(payload);
    return decoded?.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};