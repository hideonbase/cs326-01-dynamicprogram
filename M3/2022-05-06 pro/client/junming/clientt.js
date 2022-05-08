import * as crud from './crudd.js';

const MillL = document.getElementById('MillL');
const MillD = document.getElementById('MillD');
const KendrickL = document.getElementById('KendrickL');
const KendrickD = document.getElementById('KendrickD');
const AspenL = document.getElementById('AspenL');
const AspenD = document.getElementById('AspenD');
const NorthL = document.getElementById('NorthL');
const NorthD = document.getElementById('NorthD');

//Mill
MillL.addEventListener('click', async (e) => { 
    const json = await crud.likeUpdateCounter("mill");
    MillL.innerHTML = "Like: " + JSON.stringify(json.value);
});
MillD.addEventListener('click', async (e) => {
    const json = await crud.likeUpdateCounter("milld");
    MillD.innerHTML = "Dislike: " + JSON.stringify(json.value);
});

//KendrickL
KendrickL.addEventListener('click', async (e) => { 
    const json = await crud.likeUpdateCounter("kendrick");
    KendrickL.innerHTML = "Like: " + JSON.stringify(json.value);
});
KendrickD.addEventListener('click', async (e) => {
    const json = await crud.likeUpdateCounter("kendrickd");
    KendrickD.innerHTML = "Dislike: " + JSON.stringify(json.value);
});

//Aspen
AspenL.addEventListener('click', async (e) => { 
    const json = await crud.likeUpdateCounter("aspen");
    AspenL.innerHTML = "Like: " + JSON.stringify(json.value);
});
AspenD.addEventListener('click', async (e) => {
    const json = await crud.likeUpdateCounter("aspend");
    AspenD.innerHTML = "Dislike: " + JSON.stringify(json.value);
});
//North
NorthL.addEventListener('click', async (e) => { 
    const json = await crud.likeUpdateCounter("north");
    NorthL.innerHTML = "Like: " + JSON.stringify(json.value);
});
NorthD.addEventListener('click', async (e) => {
    const json = await crud.likeUpdateCounter("northd");
    NorthD.innerHTML = "Dislike: " + JSON.stringify(json.value);
});
