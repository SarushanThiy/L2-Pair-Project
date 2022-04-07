const db = require('../dbConfig/init')

class Post {
    constructor(data){
        this.id = data.id,
        this.title = data.title,
        this.pname  = data.pname,
        this.body = data.body;
    };

    static get all(){
        return new Promise(async (resolve, reject) => {
            try {
                const post = await db.query(`SELECT * FROM posts`);
                const posts = post.rows.map(r => ({ id: r.id, title: r.title, pname: r.pname, body: r.body}))
                resolve(posts);
            } catch (err){
                reject(`Error retrieving posts: ${err}`)
            };
        });
    };

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.query(`SELECT * FROM posts WHERE id = $1;`, [ id ]);
                let post = new Post(postData.rows[0]);
                resolve(post);
            } catch (err) {
                reject('Post not found');
            };
        });
    };

    static create(postData1){
        return new Promise (async (resolve, reject) => {
            try {
                const {title, pname, body} = postData1
                let postData = await db.query('INSERT INTO posts (title, pname, body) VALUES ($1, $2, $3) RETURNING *;', [ title, pname, body]);
                let post = await new Post(postData.rows[0]);
                resolve (post);
            } catch (err) {
                reject('Post could not be created');
            };
        });
    };
}

module.exports = Post;
