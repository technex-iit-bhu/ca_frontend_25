import { Task, User } from '../layout/dashboard/dashboard';
import { LeaderboardEntry } from '../layout/Leaderboard';

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

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const res = await fetch(`${BASE_URL}/leaderboard`);
  return res.ok ? res.json() : [];
}
