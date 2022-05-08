export async function createUser(name, pass) {
    const response = await fetch('/user/create', {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify({name: name, pass: pass}),
    });
    const data = await response.json();
    return data;
}


