const template = document.querySelector("template").content;
const main = document.querySelector("main");
const nav = document.querySelector("#filter");
const modal = document.querySelector("#modal");
const catLink = "http://kea-alt-del.dk/t5/api/categories";
const pListLink = "http://kea-alt-del.dk/t5/api/productlist";
const pLink = "http://kea-alt-del.dk/t5/api/product?id=";
const imgLink = "http://kea-alt-del.dk/t5/site/imgs/";

modal.addEventListener("click", () => modal.classList.add("hide"))

fetch(catLink).then(result => result.json()).then(data => createCatContainers(data));

function createCatContainers(categories) {
    categories.unshift("menu");
    categories.forEach(category => {
        const section = document.createElement("section");
        const a = document.createElement("a");
        a.textContent = category;
        a.href = "#";
        a.addEventListener("click", function (event) {
            event.preventDefault()
            filter(category);
        });
        nav.appendChild(a);
        const h2 = document.createElement("h2");
        section.id = category;
        h2.textContent = category;
        section.appendChild(h2);
        main.appendChild(section);
    });
    fetch(pListLink).then(result => result.json()).then(data => showProducts(data));
}

function filter(myFilter) {
    console.log(myFilter);
    document.querySelectorAll("main section").forEach(section => {
        if (section.id == myFilter || myFilter == "menu") {
            section.classList.remove("hide");
        } else {
            section.classList.add("hide");
        }
    })


}

function showDetails(product) {
    console.log(product);
    modal.querySelector("h1").textContent = product.name;
    modal.querySelector("p").textContent = product.longdescription;
    modal.classList.remove("hide");
    modal.querySelector("img").src = imgLink + "medium/" + product.image + "-md.jpg";

}

function showProducts(data) {
    data.forEach(elem => {
        console.log(elem);
        const section = document.querySelector("#" + elem.category);
        const clone = template.cloneNode(true);
        clone.querySelector("img").src = "http://kea-alt-del.dk/t5/site/imgs/small/" + elem.image + "-sm.jpg";
        clone.querySelector("h2").textContent = elem.name;
        clone.querySelector("p").textContent = elem.shortdescription;
        clone.querySelector(".price span").textContent = elem.price;

        /* modal */
        clone.querySelector("button").addEventListener("click", () => {
            fetch(pLink + elem.id).then(result => result.json()).then(product => showDetails(product));

        })

        if (elem.discount) {
            const newPrice = Math.ceil(elem.price - elem.price * elem.discount / 100);
            clone.querySelector(".discountprice span").textContent = newPrice;
            clone.querySelector(".discountprice.hide").classList.remove("hide");
            clone.querySelector(".price").classList.add("strike");
        }

        if (elem.alcohol) {
            const newImage = document.createElement("img")
            newImage.setAttribute("src", "images/alcohol.png");
            newImage.setAttribute("alt", "Contains alcohol " + elem.alcohol + "%");
            newImage.setAttribute("title", "Contains alcohol " + elem.alcohol + "%");
            clone.querySelector(".icons").appendChild(newImage);
        }

        if (elem.vegetarian) {
            const newImage = document.createElement("img");
            newImage.setAttribute("src", "images/vegetarian.png");
            newImage.setAttribute("alt", "This dish is vegetarian");
            newImage.setAttribute("title", "This dish is vegetarian");
            clone.querySelector(".icons").appendChild(newImage)
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
