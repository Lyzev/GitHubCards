const cache = new Map()

const repocards = document.getElementsByTagName('gh-repocards')
for (let i = 0; i < repocards.length; i++) {
    const url = 'https://api.github.com/users/' + repocards[i].getAttribute('user') + '/repos'
    const request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    const data = JSON.parse(request.responseText)
    for (let i = 0; i < data.length; i++) {
        cache.set(data[i].full_name.toUpperCase(), data[i])
    }
    shuffle(data)
    for (let j = 0; j < Math.min(parseInt(repocards[i].getAttribute("amount")), data.length); j++) {
        const repocard = document.createElement('gh-repocard')
        repocard.setAttribute('user', repocards[i].getAttribute('user'))
        repocard.setAttribute('repo', data[j].name)
        repocards[i].appendChild(repocard)
    }
}

const repocard = document.getElementsByTagName('gh-repocard')
for (let i = 0; i < repocard.length; i++) {
    generateRepocard(repocard[i].getAttribute("user"), repocard[i].getAttribute("repo"), repocard[i])
}

async function generateRepocard(user, repo, container) {
    let data = cache.get((user + "/" + repo).toUpperCase())
    if (data == null) {
        const url = 'https://api.github.com/repos/' + user + '/' + repo
        const request = new XMLHttpRequest()
        request.open("GET", url, false)
        request.send()
        data = JSON.parse(request.responseText)
    }

    const card = document.createElement('div')
    card.style.height = 'fit-content'
    card.style.width = 'fit-content'
    card.style.display = 'flex'
    card.classList.add('gh-repocard-card')

    const imgContainer = document.createElement('div')
    imgContainer.classList.add('gh-repocard-img-container')

    const img = document.createElement('img')
    img.src = data.owner.avatar_url
    img.classList.add('gh-repocard-img')
    imgContainer.appendChild(img)

    const dataContainer = document.createElement('div')
    dataContainer.style.marginLeft = '10px'
    dataContainer.style.display = 'flex'
    dataContainer.style.flexDirection = 'column'
    dataContainer.style.alignItems = 'flex-start'

    const name = document.createElement('a')
    name.classList.add('gh-repocard-title')
    name.target = '_blank'
    name.href = data.html_url
    name.innerHTML = data.full_name

    const desc = document.createElement('p')
    desc.classList.add('gh-repocard-label')
    desc.innerHTML = data.description

    const statsContainer = document.createElement('div')
    statsContainer.style.display = 'flex'

    const statsContainer1 = createContainerWithContent()
    statsContainer1.firstChild.href = data.html_url + '/network/members'
    statsContainer1.firstChild.innerHTML = data.forks_count
    statsContainer1.lastChild.innerHTML = 'Forks'

    const statsContainer2 = createContainerWithContent()
    statsContainer2.firstChild.href = data.html_url + '/stargazers'
    statsContainer2.firstChild.innerHTML = data.stargazers_count
    statsContainer2.lastChild.innerHTML = 'Stars'

    let statsContainer3 = null
    if (data.language != null) {
        statsContainer3 = createContainerWithContent()
        statsContainer3.firstChild.href = data.html_url + '/search?l=' + data.language
        statsContainer3.firstChild.innerHTML = data.language
        statsContainer3.lastChild.innerHTML = 'Language'
    }

    statsContainer.appendChild(statsContainer1)
    statsContainer.appendChild(statsContainer2)
    if (statsContainer3 != null)
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
    container.classList.add('gh-repocard-stats')
    const anchor = document.createElement('a')
    anchor.classList.add('gh-repocard-stats-a')
    anchor.target = '_blank'
    const label = document.createElement('p')
    label.classList.add('gh-repocard-label')
    container.appendChild(anchor)
    container.appendChild(label)
    return container
}

function shuffle(sourceArray) {
    for (let i = 0; i < sourceArray.length - 1; i++) {
        const j = i + Math.floor(Math.random() * (sourceArray.length - i))

        const temp = sourceArray[j]
        sourceArray[j] = sourceArray[i]
        sourceArray[i] = temp
    }
    return sourceArray
}