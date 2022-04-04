import * as crud from './anotCrud';

let a = document.getElementById('input1');
let b = document.getElementById('input2');
let c = document.getElementById('go');






c.addEventListener('click',async(e)=>{
    const usern = a.value;
    const passw = b.value;
    const backdata = await crud.crudreadAllCounters();

})


//从backdata里面读取数据,不过先继续完善signup里面的东西，再弄sign in，比如我要弄sign up的条件，sign up条件不够时候的报错。css要改。




a.addEventListener('keyup',doubleadd1);
function doubleadd1(){
    b.addEventListener('keyup',colorchange1);
}

b.addEventListener('keyup',doubleadd2);
function doubleadd2(){
    a.addEventListener('keyup',colorchange1);
}
let orignn;
function colorchange1(){
    c.style.color = 'white';
    c.style.backgroundColor ="#00BFFF";
    c.style.borderColor='white';
    orignn = c.style.backgroundColor;
    c.addEventListener("mouseenter",function(){
        console.log(orignn);
        c.style.backgroundColor="#007FFF"
    });
    c.addEventListener("mouseleave",function(){
        c.style.backgroundColor=orignn;
    });
    colorchange2()
}

function colorchange2(){
    if(a.value === ""|| b.value ===""){
        c.style.color='#D3D3D3';
        c.style.backgroundColor ="white";
        c.style.borderColor='#D3D3D3';
    }
}

