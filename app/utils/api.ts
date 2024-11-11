const BASE_URL = 'http://localhost:6969/api/user';  // TODO change backend url

export async function getProfileDetails(token: string) {
    const res = await fetch(`${BASE_URL}/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
    });
    return res.json();
}

export async function updateProfileDetails(token: string, data: string) {
    return await fetch(`${BASE_URL}/update`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
        body: data,
    });
}