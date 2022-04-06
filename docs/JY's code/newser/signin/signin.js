//import * as crud from './anotCrud';

let a = document.getElementById('input1');
let b = document.getElementById('input2');
let c = document.getElementById('go');


c.addEventListener('click',async(e)=>{
    const usern = a.value;
    const passw = b.value;

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
    colorchange2();
    orignn = c.style.backgroundColor;
}
if((a.value != "")&&(b.value !="")){
    c.addEventListener("mouseenter",function(){
        c.style.backgroundColor="#D3D3D3";
    });
    c.addEventListener("mouseleave",function(){
        c.style.backgroundColor=orignn;
    });
}
function colorchange2(){
    if(a.value === ""|| b.value ===""){
        c.style.color='#D3D3D3';
        c.style.backgroundColor ="white";
        c.style.borderColor='#D3D3D3';
    }
}

