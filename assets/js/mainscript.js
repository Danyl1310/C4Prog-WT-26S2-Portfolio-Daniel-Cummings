// Javascript
let dom = document

//get all api checkboxes

const checkboxes = dom.querySelectorAll(`.api-checkbox`)
console.log(checkboxes)

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener(`change`, function() {
        if (this.checked) {
            checkboxes.forEach((othercheckbox) => {
                if (othercheckbox !== this) {
                    othercheckbox.checked = false;
                }
            })
        }
    })
})