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
                let result = await db.query(`SELECT * FROM posts`);
                let posts = result.rows.map(r => new Post(r))
                resolve(posts)
            } catch (err){
                reject(`Error retrieving posts: ${err}`)
            }
        })
    }
}
