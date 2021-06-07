const {
    db
} = lsdb("database1")

db.collection(['restaurants'])

let isEditable = false;

function printList() {
    const restaurantsList = db.get("restaurants");

    document.getElementById("list").innerHTML = ''

    restaurantsList.forEach(element => {
        document.getElementById("list").innerHTML += `
        <li>
            <p class="title-name">${element.title}</p>
            <div id="button-box">
            <button class="edit">Edit</button>
            <button class="remove">x</button>
            </div>
        </li>
    `;
    })

    const btnEdit = document.querySelectorAll(".edit")
    const btnRemove = document.querySelectorAll(".remove")


    Array.from(btnEdit).forEach(btn => {
        btn.addEventListener('click', function ({
            target
        }) {
            const title = target.parentElement.parentElement.querySelector('.title-name')
            title.setAttribute('contenteditable', true)
        })
    })
    // Array.from(btnRemove).forEach(btn => {
    //     btn.addEventListener('click', function () {
    //         db.remove("restaurants", {
    //             id: newObj.id
    //         });
    //     })
    // })
}

document.onload = printList()

// console.log(db.get('restaurants'))

function create() {

    const form = document.forms['restaurantsForm']
    window.newObj = {};
    if (form.checkValidity() === false) {
        alert('All inputs are required!')
        return
    }

    Array.from(form.elements).forEach(element => {
        if (element.hasAttribute('name')) {
            newObj[element.getAttribute('name')] = element.value
        }
    });
    db.insert("restaurants", {
        data: {
            ...newObj
        }
    });

    printList()

    form.reset()
}

function remove() {
    
}
