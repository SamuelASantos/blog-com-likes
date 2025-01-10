async function getPosts() {
    try {
        let url = 'https://jsonplaceholder.typicode.com/posts';
        let res = await fetch(url);
        let posts = await res.json();
        
        let sectionPosts = document.querySelector('.posts');

        for (const post of posts) {
            let h2 = document.createElement('h2');
            h2.innerHTML = post.title;

            let p = document.createElement('p');
            p.innerHTML = post.body;

            let button = document.createElement('button');
            button.innerHTML = 'Like';
            button.addEventListener('click', () => {
                addLike(post.id);
                let likeCount = getLikesFromId(post.id);
                let articleElement = document.querySelector('#post_' + post.id);
                articleElement.querySelector('small').innerHTML = likeCount + ' likes';
            })

            let small = document.createElement('small');
            let likeCount = getLikesFromId(post.id);
            small.innerHTML = likeCount + ' likes';

            let article = document.createElement('article');
            article.setAttribute('id', 'post_' + post.id);
            article.appendChild(h2);
            article.appendChild(p);
            article.appendChild(button);
            article.appendChild(small);

            sectionPosts.appendChild(article);
        }
        
    } catch (error) {
        alert('Erro inesperado.')
        console.log(error);
    }
}

function getLikesFromId(id) {
    let likesString = localStorage.getItem('likes');
    if (!likesString) return 0;

    let likes = JSON.parse(likesString);
    let postLike = likes.find(item => item.id === id);
    if (!postLike) return 0;

    return postLike.count;
}

function addLike(id) {
    let likesString = localStorage.getItem('likes');
    if (!likesString) {
        likesString = "[]";
    }

    let likes = JSON.parse(likesString);
    let index = likes.findIndex(item => item.id === id);

    if (index > -1) {
        likes[index].count++;
    } else {
        likes.push({id: id, count: 1});
    }

    localStorage.setItem('likes', JSON.stringify(likes));
}

getPosts();