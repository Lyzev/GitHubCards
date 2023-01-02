const cards = document.getElementsByTagName('gh-profilecard')
for (let i = 0; i < cards.length; i++) {
    generateProfilecard(cards[i].getAttribute("user"), cards[i])
}

async function generateProfilecard(user, container) {
    const url = 'https://api.github.com/users/' + user
    const request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()

    const data = JSON.parse(request.responseText)

    let card = document.createElement('div')
    card.style.height = 'fit-content'
    card.style.width = 'fit-content'
    card.style.display = 'flex'
    card.classList.add('gh-profilecard-card')

    let imgContainer = document.createElement('div')
    imgContainer.classList.add("gh-profilecard-img-container")

    let img = document.createElement('img')
    img.src = data.avatar_url
    img.classList.add('gh-profilecard-img')
    imgContainer.appendChild(img)

    let dataContainer = document.createElement('div')
    dataContainer.style.marginLeft = '20px'
    dataContainer.style.display = 'flex'
    dataContainer.style.flexDirection = 'column'
    dataContainer.style.alignItems = 'flex-start'

    let name = document.createElement('a')
    name.classList.add('gh-profilecard-title')
    name.target = '_blank'
    name.href = data.html_url
    name.innerHTML = data.login

    let desc = document.createElement('p')
    desc.classList.add('gh-profilecard-label')
    desc.innerHTML = data.bio

    let statsContainer = document.createElement('div')
    statsContainer.style.display = 'flex'

    let statsContainer1 = createContainerWithContent()
    statsContainer1.firstChild.href = data.html_url + '?tab=followers'
    statsContainer1.firstChild.innerHTML = data.followers
    statsContainer1.lastChild.innerHTML = 'Followers'

    let statsContainer2 = createContainerWithContent()
    statsContainer2.firstChild.href = data.html_url + '?tab=following'
    statsContainer2.firstChild.innerHTML = data.following
    statsContainer2.lastChild.innerHTML = 'Following'

    let statsContainer3 = createContainerWithContent()
    statsContainer3.firstChild.href = data.html_url + '?tab=repositories'
    statsContainer3.firstChild.innerHTML = data.public_repos
    statsContainer3.lastChild.innerHTML = 'Repositories'

    statsContainer.appendChild(statsContainer1)
    statsContainer.appendChild(statsContainer2)
    statsContainer.appendChild(statsContainer3)

    dataContainer.appendChild(name)
    dataContainer.appendChild(desc)
    dataContainer.appendChild(statsContainer)

    card.appendChild(imgContainer)
    card.appendChild(dataContainer)

    container.appendChild(card)
}

function createContainerWithContent() {
    const container = document.createElement('div')
    container.classList.add('gh-profilecard-stats')
    const anchor = document.createElement('a')
    anchor.classList.add('gh-profilecard-stats-a')
    anchor.target = '_blank'
    const label = document.createElement('p')
    label.classList.add('gh-profilecard-label')
    container.appendChild(anchor)
    container.appendChild(label)
    return container
}