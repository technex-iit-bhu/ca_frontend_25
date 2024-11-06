const BASE_URL = 'http://localhost:6969/api/user';

export async function login(username: string, password: string) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

interface UserData {
  name: string;
  username: string;
  password: string;
  phoneNumber: string;
  whatsappNumber: string;
  institute: string;
  city?: string;
  postal_address?: string;
  pin_code?: string;
  whyChooseYou?: string;
  wereCA?: boolean;
  year?: number;
  branch?: string;
  referralCode: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function signup(userData: UserData) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return res.json();
}
