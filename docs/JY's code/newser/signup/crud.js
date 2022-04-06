
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


export async function readAllusers(){
  const response = await fetch('/user/dump', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if(response.ok){
    return data;
  }else{
    alert(data["error"]);
  }
}
