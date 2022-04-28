// get like 
export async function likeReadCounter(name) {
  try {
    const response = await fetch(`/likeRead?name=${name}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function likeCreateCounter(name) {
  const response = await fetch(`/likeCreate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name }),
  });
  const data = await response.json();
  return data;
}



//update like
export async function likeUpdateCounter(name) {
    const response = await fetch(`likeUpdate`, {
      method: 'POST',
      body: JSON.stringify({ name: name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
}


//delete appartment
export async function likeDeleteCounter(name) {
  const response = await fetch(`/likeDelete`, {
    method: 'DELETE',
    body: JSON.stringify({ name: name }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

//dump
export async function likeReadAllCounters() {
  const response = await fetch(`/likeDump`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}