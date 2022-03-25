let a = document.getElementById('input1');
let b = document.getElementById('input2');
let c = document.getElementById('go');

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

