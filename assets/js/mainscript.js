// Variables
let dom = document
const key = "luUqnISIHulfDWycfWcOUNToVSr8iSsTzar0qUfn"

//get elements
const checkboxes = dom.querySelectorAll(`.api-checkbox`)
const user_input = dom.querySelector(`.text-input`)
const submit = dom.querySelector(`.submit-button`)
const results = dom.querySelector(`.results`)

console.log(checkboxes)
console.log(user_input)

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener(`change`, function() {
        if (this.checked) {
            checkboxes.forEach((othercheckbox) => {
                if (othercheckbox !== this) {
                    othercheckbox.checked = false;
                    user_input.value = ``;
                }
            })
        }
    })
});

submit.addEventListener(`click`, function(event) {
    event.preventDefault()
    console.log(`button clicked.`)
    call_qr_api(user_input.value).then(data => {
        const new_image = dom.createElement("img")
        new_image.src = data
        new_image.alt = "Generated Image"
        results.appendChild(new_image)

    }).catch(function (error) {
        console.warn(error)
    })
});

//Call API function
async function call_qr_api(input, format="png") {
    try {
            const response = await fetch(`https://api.api-ninjas.com/v1/qrcode?data=${input}&format=${format}`, {
                method: 'GET',
                headers: { 'X-Api-Key' : `${key}` },
                contentType: 'application/json',
            })
            if (!response.ok) {
                throw new Error(`Response Status: ${response.status}`)
            }
            const reader = new FileReader();
            reader.onloadend = function() {
                const base64ImageUrl = reader.result;
                console.log(base64ImageUrl)
            }
            const blob = await response.blob()
            console.log(blob)
            const data = reader.readAsDataURL(blob)
            console.log(data)
            return data
    } catch (error) {
        console.warn(error)
    }
}