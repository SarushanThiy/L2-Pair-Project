const navLinks = document.querySelectorAll('a.navlink');
const main = document.querySelector('main');

window.addEventListener('hashchange', updateContent);

function updateNav(hash) {
    const updateLink = link => {
        link.classList = (link.textContent == 'Your Post' && hash.includes('new') || hash.includes(link.textContent)) ? ['navlink', 'current'] : ['navlink']
    };
    navLinks.forEach(updateLink)
}

function updateMain(hash) {
    main.innerHTML = '';
    if (hash) {
        let [posts, id] = hash.split('/');
        id ? loadModalFor(posts, id) : loadIndexFor(post)
    } else {
        const header = document.createElement('h1');
        header.className = 'title';
        header.textContent = "Welcome to Cablegram";
        main.appendChild(header);
    }
}

async function loadIndexFor(posts){
    modal.style.display = 'none';
    const data = await getAll(posts);
    data.forEach(a => renderCard(a, posts));
}

function renderCard(data){
    let link = document.createElement('a');
    let card = document.createElement('div');
    card.className = 'card';
    link.href = `#posts/${data.id}` 
    card.textContent = data.pname || data.title;
    link.appendChild(card);
    main.appendChild(link);
}

function updateContent(){
    let hash = window.location.hash.substring(1);
    updateNav(hash);
    updateMain(hash);
}
