const modal = document.querySelector('#modal');
const modalHeader = modal.querySelector('h2');
const modalContent = modal.querySelector('article');
const modalExit = modal.querySelector('i a');
const {getAll, getItem, makePost} = require('/requests');

//no idea what any of the above mean

const fields = [
    { tag: 'input', attributes: { type: 'text', name: 'title', placeholder: 'Title' } },
    { tag: 'input', attributes: { type: 'text', name: 'name', placeholder: 'Name' } },
    { tag: 'textarea', attributes: { name: 'postContent', placeholder: 'content' } },
    { tag: 'input', attributes: { type: 'submit', value: 'Add Post' } }
]

async function loadModalFor() {
    modalContent.innerHTML = '';
    modal.style.display = 'block';
    if (id === 'new') { //don't quite get this
        renderNewBookForm();
    } else {
        const data = await getItem(category, id);
        category === 'books' ? renderBookModal(data) : renderAuthorModal(data);
    }
}

function renderPostModal(post) {
    modalHeader.textContent = `${post.title} - ${post.name}`;
    const nameLink = createItemLink(post.name);
    const postContent = document.createElement('p');
    postContent.textContent = post.postContent;
    modalContent.appendChild(nameLink);
    modalContent.appendChild(postContent);
    modalExit.href = `#posts`;
}


function renderNewPostForm(){
    modalHeader.textContent = 'Add a Post';
    const form = document.createElement('form');
    fields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => field.setAttribute(a, v))
        form.appendChild(field);
    })
    form.onsubmit = makePost; //this links to requests.js
    modalContent.appendChild(form);
    modalExit.href = `#posts`;
}

function createItemLink(data){
    console.log(data);
    const link = document.createElement('a');
    link.href = `#${data.path.substring(1)}`;
    link.textContent = data.name || data.title;
    return link;
}



