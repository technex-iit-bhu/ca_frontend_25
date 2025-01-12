import { Task, User } from '../layout/dashboard/dashboard';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProfileDetails(token: string) {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return res.json();
}

export async function updateProfileDetails(token: string, data: string) {
  return await fetch(`${BASE_URL}/user/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: data,
  });
}

export async function login(username: string, password: string) {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function signup(userData: User) {
  const res = await fetch(`${BASE_URL}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return res.json();
}

export async function getTasks(token: string): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function getSubmittedTasks(token: string): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/submissions/get_user_submissions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function getLeaderboard() {
  return await fetch(`${BASE_URL}/leaderboard`);
}

export const submitTask = async (taskId: string, driveLink: string) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication required.');
  const userDetails = getProfileDetails(token);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/submissions/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      task: taskId,
      user_id: (await userDetails)._id,
      username: (await userDetails).username,
      timestamp: new Date().toISOString(),
      drive_link: driveLink,
      image_url: '',
      verified: false,
      admin_comment: ''
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to submit task.');
  }

  return response.json();
};
