let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;
//get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) -
            +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = 'brown';
    }
}



//create product
let datePro;
if (localStorage.product != null) {
    datePro = JSON.parse(localStorage.product)
} else {
    datePro = [];
}

submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && category.valueQ != '' && count.value < 100) {
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    datePro.push(newPro)
                }

            } else {
                datePro.push(newPro)
            }
        } else {

            datePro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        clearInput()

    }




    //save localStorage

    localStorage.setItem('product', JSON.stringify(datePro))

    showDate()
}

// clear input

function clearInput() {
    title.value = '',
        price.value = '',
        taxes.value = '',
        ads.value = '',
        discount.value = '',
        total.innerHTML = '',
        count.value = '',
        category.value = ''
}

//read

function showDate() {
    getTotal()
    let table = '';
    for (i = 0; i < datePro.length; i++) {
        table += `
          <tr>
          <td>${i+1}</td>
          <td>${datePro[i].title}</td>
          <td>${datePro[i].price}</td>
          <td>${datePro[i].taxes}</td>
          <td>${datePro[i].ads}</td>
          <td>${datePro[i].discount}</td>
          <td>${datePro[i].total}</td>
          <td>${datePro[i].category}</td>
          <td><button onclick ="updateDate(   ${i}   )" id="update">update</button></td>
          <td><button onclick ="deleteDate(   ${i}   )" id="delete">delete</button></td>
          </tr>
          `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll')
    if (datePro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${datePro.length})</button>        
        `
    } else {
        btnDelete.innerHTML = '';
    }


}
showDate()

//delete

function deleteDate(i) {
    if (confirm('Are you sure you want to delete this item?')) {
        datePro.splice(i, 1);
        localStorage.product = JSON.stringify(datePro);
        showDate();
    }
}


function deleteAll() {
    localStorage.clear()
    datePro.splice(0)
    showDate()


}

//updateDate

function updateDate(i) {
    title.value = datePro[i].title;
    price.value = datePro[i].price;
    taxes.value = datePro[i].taxes;
    ads.value = datePro[i].ads;
    discount.value = datePro[i].discount;
    getTotal()
    category.value = datePro[i].category;
    count.style.display = "none";
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}

//search

let searchmood = 'title';

function getsearch(id) {
    let search = document.getElementById('search')
    if (id == 'searchtitle') {
        searchmood = 'title';
        search.placeholder = 'Search By Title'
    } else {
        searchmood = 'category';
        search.placeholder = 'Search By Category'
    }
    search.focus();
    search.value = '';
    showDate();
}

function searchdata(value) {
    let table = '';
    let key;

    if (searchmood === 'title') {
        key = 'title';
    } else {
        key = 'category';
    }

    for (let i = 0; i < datePro.length; i++) {
        if (datePro[i][key].includes(value.toLowerCase())) {
            table += `
            <tr>
                <td>${i}</td>
                <td>${datePro[i].title}</td>
                <td>${datePro[i].price}</td>
                <td>${datePro[i].taxes}</td>
                <td>${datePro[i].ads}</td>
                <td>${datePro[i].discount}</td>
                <td>${datePro[i].total}</td>
                <td>${datePro[i].category}</td>
                <td><button onclick="updateDate(${i})" id="update">update</button></td>
                <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
            </tr>`;
        }
    }

    document.getElementById('tbody').innerHTML = table;
}












const inputs = document.querySelectorAll('.inputs input');

document.addEventListener('keydown', function (event) {
    const activeElement = document.activeElement; // العنصر النشط حاليًا
    if (!activeElement || activeElement.tagName !== 'INPUT') return; // تأكد أن العنصر المدخل

    const currentIndex = Array.from(inputs).indexOf(activeElement); // العثور على فهرس العنصر الحالي
    if (event.key === 'ArrowDown') {
        // الانتقال إلى العنصر التالي
        const nextIndex = (currentIndex + 1) % inputs.length; // يسمح بالدوران
        inputs[nextIndex].focus();
    } else if (event.key === 'ArrowUp') {
        // الانتقال إلى العنصر السابق
        const prevIndex = (currentIndex - 1 + inputs.length) % inputs.length; // يسمح بالدوران
        inputs[prevIndex].focus();
    }
});