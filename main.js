const template = document.querySelector("template").content;
const main = document.querySelector("main");
const catLink = "http://kea-alt-del.dk/t5/api/categories";
const pListLink = "http://kea-alt-del.dk/t5/api/productlist";
const imgLink = "http://kea-alt-del.dk/t5/site/imgs/";


fetch(catLink).then(result => result.json()).then(data => createCatContainers(data));

function createCatContainers(categories) {
    categories.forEach(category => {
        const section = document.createElement("section");
        const h2 = document.createElement("h2");
        section.id = category;
        h2.textContent = category;
        section.appendChild(h2);
        main.appendChild(section);
    });

    fetch(pListLink).then(result => result.json()).then(data => showProducts(data));
}

function showProducts(data) {
    data.forEach(elem => {
        const section = document.querySelector("#" + elem.category);
        const clone = template.cloneNode(true);
        clone.querySelector("img").src = "http://kea-alt-del.dk/t5/site/imgs/small/" + elem.image + "-sm.jpg";
        clone.querySelector("h2").textContent = elem.name;
        clone.querySelector("p").textContent = elem.shortdescription;
        clone.querySelector(".price span").textContent = elem.price;

        if (elem.discount) {
            const newPrice = Math.ceil(elem.price - elem.price * elem.discount / 100);
            clone.querySelector(".discountprice span").textContent = newPrice;
            clone.querySelector(".discountprice.hide").classList.remove("hide");
            clone.querySelector(".price").classList.add("strike");
        }

        if (elem.alcohol) {
            const newImage = document.createElement("img")
        }
        section.appendChild(clone);
    })
}





//modal
/*let modal = document.getElementById("ringbread-modal");
let btn = document.getElementById("ringbread-btn");
let span = document.getElementsByClassName("close")[0];
let modal2 = document.getElementById("cabanossi-modal");
let btn2 = document.getElementById("cabanossi-btn");
let modal3 = document.getElementById("caviar-modal");
let btn3 = document.getElementById("caviar-btn");

//ringbread modal
btn.onclick = function () {
    console.log("working");
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//cabanossi modal
btn2.onclick = function () {
    console.log("working");
    modal2.style.display = "block";
}


window.onclick = function (event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}

//caviar bruschetta modal

btn3.onclick = function () {
    console.log("working");
    modal3.style.display = "block";
}


window.onclick = function (event) {
    if (event.target == modal3) {
        modal3.style.display = "none";
    }
}
*/
