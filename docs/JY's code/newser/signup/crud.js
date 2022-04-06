
export async function createUser(name,pass) {
  const response = await fetch('/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name ,pass:pass}),
  });
  const data = await response.json();
  if(response.ok){
    return data;
  }else{
    alert(data["error"]);
  }
}
//这个respone是从loginthis里返回的。记得加个/user/


export async function updateCounter(name) {
  const response = await fetch(`/user/update?name=${name}`, {
    method: 'POST',
  });
  const data = await response.json();
  return data;
}

export async function deleteCounter(name) {
  const response = await fetch(`/user/delete?name=${name}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

/*export async function readAllusers() {
  const response = await fetch('/user/dump', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await response.json();
  return data;
}*/

export async function readAllusers(){
  const response = await fetch('/user/dump', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if(response.ok){
    return data;
  }else{
    alert("wtf");
  }
}


