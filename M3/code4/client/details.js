const title = document.querySelector('#title');
const price = document.querySelector('#price');
const cover = document.querySelector('#cover');
const address = document.querySelector('#address');


function getUrlParam(name) {
    let tokens = window.location.search.substring(1).split("&");
    const params = {};
    tokens.forEach(token => {
        const [key, value] = token.split("=");
        params[key] = decodeURIComponent(value);
    });
    return params[name];
}


let id = getUrlParam("room_id");

if (id) {
    fetch(`/house/house/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.code === 0) {
                const house = data.data;
                title.textContent = house.title;
                price.textContent = house.price;
                cover.src = house.cover;
                address.textContent = house.address;
            } else {
                alert(data.msg);
            }
        });
}
