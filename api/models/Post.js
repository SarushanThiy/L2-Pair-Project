const db = require('../dbConfig/init');

class Post {
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.name = data.name
        this.body = data.body
    }

    static get all(){
        return new Promise(async (resolve, reject) => {
            try {
                const result = await db.query(`SELECT * FROM posts`);
                const posts = result.rows.map(r => new Post(r))
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

    static create(title, name, body){
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.query(`INSERT INTO posts (title, name, body) VALUES ($1, $2, $3), RETURNING *;`, [title, name, body]);
                resolve(post);
            } catch (err){
                reject ('Post could not be created');
            };
        });
    };
}

module.exports = Post;
