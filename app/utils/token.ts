import { useRouter } from 'next/router';

export const verifyToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    const router = useRouter();
    router.push('/auth/signin');
  }

  return token;
};
