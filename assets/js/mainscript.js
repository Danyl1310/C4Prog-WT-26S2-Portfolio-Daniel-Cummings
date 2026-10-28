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
        user_input.disabled = false;
        results.replaceChildren();
        user_input.value = ``;
        if (this.checked) {
            checkboxes.forEach((othercheckbox) => {
                if (othercheckbox !== this) {
                    othercheckbox.checked = false;
                }
                })
            if (this.id === "joke_api") {
                user_input.disabled = true;
            }
            else if (this.id === "barcode_api") {
                user_input.placeholder = "Enter a Text or URL"
            }
        }
        else {
            user_input.placeholder = "Choose an API first!"
        }
    })
});

submit.addEventListener(`click`, function(event) {
    event.preventDefault()
    console.log(`button clicked.`)
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked === true) {
            if (checkbox.id === "joke_api") {
                results.replaceChildren();
                call_joke_api().then(jokes => {
                    for (const item of jokes){
                        const new_joke = dom.createElement("p")
                        new_joke.textContent = item.joke
                        results.appendChild(new_joke)
                    }
                })
            }
            else if (checkbox.id === "barcode_api") {
                results.replaceChildren();
                call_qr_api(user_input.value).then(base64 => {
                    const new_image = dom.createElement("img")
                    new_image.src = "data:image/png;base64," + base64;
                    new_image.alt = "QR Code"
                    results.appendChild(new_image)
                }).catch(function (error) {
                    console.warn(error)
                })
            }
            else {
                results.replaceChildren();
                const p = dom.createElement("p")
                p.textContent = "No API Selected!"
                results.appendChild(p)
            }
        }
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
        const base64 = (await response.text()).trim();
        return base64
    } catch (err) {
        console.warn(err)
        results.replaceChildren()
        const p = dom.createElement("p")
        p.textContent = err
        results.appendChild
    }
}

async function call_joke_api() {
        try {
        const response = await fetch(`https://api.api-ninjas.com/v1/jokes?limit=`, {
            headers: { 'X-Api-Key' : `${key}` },
        })
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`)
        }
        const jokes = await response.json();
        console.log(jokes)
        return jokes
    } catch (err) {
        console.warn(err)
        results.replaceChildren()
        const p = dom.createElement("p")
        p.textContent = err
        results.appendChild
    }
}