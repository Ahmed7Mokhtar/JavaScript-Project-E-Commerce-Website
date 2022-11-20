
let title = document.getElementById('title');
let price = document.getElementById('price');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

//mode change from create to update
let mood = 'create';
let temp;

// get total
function getTotal() {
    // console.log('done');
    if (price.value != '') {
        let result = +price.value - +discount.value;
        total.innerHTML = result;
        total.style.background = '#090';
    }
    else {
        total.style.background = '#a00d02';
    }
}

// delete , save in localstorage.
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);

} else {
    dataPro = [];
}

// create product 
submit.onclick = function () {
    let obj = {
        title: title.value,
        price: price.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    //create one or more product depend on count you intered 
    if (title.value != '' && price.value != '' && discount.value != '' && count.value != '' && category.value != ''
        && obj.count < 100) {
        if (mood == 'create') {
            if (obj.count > 1) {
                for (let i = 0; i < obj.count; i++) {
                    dataPro.push(obj);
                }
            } else {
                dataPro.push(obj);
            }
        } else {
            dataPro[temp] = obj;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block'
        }
        clearData();
    }
    //save data in localstorage
    localStorage.setItem('product', JSON.stringify(dataPro));
    // console.log(dataPro);

    showData()
}


// clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// read-Show data
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `<tr>
    <td>${i + 1}</td>
   <td>${dataPro[i].title}</td>
   <td>${dataPro[i].price}</td>
   <td>${dataPro[i].discount}</td>
   <td>${dataPro[i].total}</td>
   <td>${dataPro[i].category}</td>
   <td><button onclick="updateData(${i})" id="update">Update</button></td>
   <td><button onclick="deleteData(${i})" id="delete">Delete</button></td> 
</tr>`;

        // console.log(table);
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');

    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All Product (${dataPro.length})</button>`
    } else {
        btnDelete.innerHTML = '';
    }
}
showData()


// delete index
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
    // console.log(i);
}


//delete All
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();

}

// update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update'
    mood = 'update'
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })

    // console.log(i);
}

