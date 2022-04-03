export async function readUser(name) {
    const response = await fetch(`/user/read?name=${name}`, {
      method: 'GET',
    });
    const data = await response.json();
    if(response.ok){
      return data;
    }else{
      alert(data["error"]);
    }
  }

  
export async function readAllCounters() {
    const response = await fetch(`/user/dump`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
}
  