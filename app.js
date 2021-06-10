const {
    db
} = lsdb("database1")

db.collection(['restaurants'])



function printList() {
    let restaurantsList = db.get("restaurants");

    document.getElementById("list").innerHTML = ''

    restaurantsList.forEach(element => {
        document.getElementById("list").innerHTML += `
        <li>
            <p class="title-name" id="title-name2">${element.title}</p>
            <div class="button-box">
                <button class="btn-edit">Edit</button>
                <button class="btn-save" data-id="${element._id}">Save</button>
                <button class="btn-remove">x</button>
            </div>
        </li>
    `;
    })

    const btnEdit = document.querySelectorAll(".edit")
    const btnRemove = document.querySelectorAll(".remove")
    const btnSave = document.querySelectorAll(".save")


    Array.from(btnEdit).forEach(btn => {
        btn.addEventListener('click', function ({
            target
        }) {
            const title = target.parentElement.parentElement.querySelector('.title-name')
            title.setAttribute('contenteditable', true)
        })
    })
    Array.from(btnSave).forEach(btn => {
        btn.addEventListener('click', function ({
            target
        }) {
            const _id = Number(target.getAttribute('data-id'))
            const title = target.parentElement.parentElement.querySelector('.title-name').textContent;
            db.update("restaurants", { _id }, { title });
        })
    })
    Array.from(btnRemove).forEach(btn => {
        btn.addEventListener('click', function ({
            target
        }) {
            const theName = target.parentElement.parentElement.querySelector('.title-name').textContent
            db.remove("restaurants", {
                title: theName
            });
            printList();
        })
    })
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