document.addEventListener('DOMContentLoaded', e =>{
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => {
        data.forEach(pup => {
            let dogBar = document.querySelector('#dog-bar')
            let span = document.createElement('span')
            span.innerHTML = pup.name
            dogBar.appendChild(span)

            span.addEventListener('click', e => {
                let dogInfo = document.querySelector('#dog-info')
                let div = document.createElement('div');
                dogInfo.innerHTML = '';
                if(pup.isGoodDog === true){
                    div.innerHTML = `
                    <img src=${pup.image} />
                    <h2>${pup.name}</h2>
                    <button class="btn">Good Dog!</button>
                    `
                } else {
                    div.innerHTML = `
                    <img src=${pup.image} />
                    <h2>${pup.name}</h2>
                    <button class="btn">Bad Dog!</button>
                    `
                }
                dogInfo.appendChild(div)

                let btn = document.querySelector('.btn')
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    if(btn.textContent === "Good Dog!"){
                        btn.textContent = "Bad Dog!";
                        updaterBad(pup);
                    } else {
                        btn.textContent = "Good Dog!"
                        updaterGood(pup);
                    }
                })
            })  
        })
    })
})

document.addEventListener('DOMContentLoaded', () => {
    let filter = document.querySelector('#good-dog-filter')
    filter.addEventListener('click', () => {
        if(filter.textContent === "Filter good dogs: OFF"){
            filter.textContent === "Filter good dogs: ON"
        } else {
            filter.textContent === "Filter good dogs: OFF"
        }
    })

})

function updaterBad(pup){
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "isGoodDog": false
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

function updaterGood(pup){
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           "isGoodDog": true 
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
}