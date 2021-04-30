const mainTitle = document.getElementById("bg_title");
const panels = document.querySelectorAll(".panel");
const iButtons = document.querySelectorAll(".index_button");

let focus_index = 0;
let angle = 270;
const es = panels.length;
const unit = 360 / es;
const width_per = 0.3;
let x_axis;
let z_axis;
let main_fSize;
let title_fSize;
let text_fSize;

setTimeout(()=>{
    document.querySelectorAll(".panel *").forEach(e => e.style.transitionDuration = ".5s")
}, 1000);
sync();

window.addEventListener("resize", () => sync());

function move(dir){
    angle -= dir * unit;
    if(dir == 1) post_i();
    else if(dir == -1) pre_i();
    sync();
}

function goto(pos){
    angle = 270 - pos*unit;
    focus_index = pos;
    sync();
}

function toRadian(theta)
{
    return theta * Math.PI / 180;
}

function post_i(){
    if(focus_index === es-1) focus_index = 0;
    else focus_index++;
}
function pre_i(){
    if(focus_index === 0) focus_index = es-1;
    else focus_index--;
}

function rotate_objs(object){
    let comm = "";
    let x_coord = Math.cos(toRadian(angle)) * x_axis;
    let z_coord = (-Math.sin(toRadian(angle)) - 1) * z_axis;
    comm += "translateX("+x_coord+"px)"+ " translateZ("+z_coord+"px)";
    angle += unit;
    return comm;
}

function style_objs(){
    for(let i = 0; i < es; i++)
    {
        if(i === focus_index){
            panels[i].style.backgroundColor = "#28D0F3";
            panels[i].style.transform = rotate_objs(panels[i]);
            panels[i].style.filter = "blur(0px)";
            panels[i].firstElementChild.firstElementChild.style.color = "#2B3240";
            panels[i].firstElementChild.lastElementChild.childNodes.forEach(e => {
                if(e.nodeName == "DIV") e.firstElementChild.style.color = "#2B3240";
            });

        }
        else 
        {
            panels[i].style.backgroundColor = "#2B3240";
            panels[i].style.transform = rotate_objs(panels[i]);
            panels[i].style.filter = "blur(5px)";
            panels[i].firstElementChild.firstElementChild.style.color = "#28D0F3";
            panels[i].firstElementChild.lastElementChild.childNodes.forEach(e => {
                if(e.nodeName == "DIV") e.firstElementChild.style.color = "#28D0F3";
            });
        }
        iButtons.forEach(e => e.style.backgroundColor = "#2b324080");
        iButtons[focus_index].style.backgroundColor = "#28D0F3";
        mainTitle.style.fontSize = main_fSize + "px";
        panels[i].firstElementChild.firstElementChild.style.fontSize = title_fSize + "px";
        panels[i].firstElementChild.lastElementChild.style.fontSize = text_fSize + "px";
    }
    angle %= 360;
}

function sync(){
    x_axis = window.innerWidth * width_per;
    z_axis = 30;
    main_fSize = panels[es - 1 - focus_index].getBoundingClientRect().width / 10;
    title_fSize = panels[es - 1 - focus_index].getBoundingClientRect().width / 12;
    text_fSize = panels[es - 1 - focus_index].getBoundingClientRect().width / 28;
    style_objs();
}