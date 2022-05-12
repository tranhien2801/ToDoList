const Chung = require('./m_index');

class Search extends Chung {

    getTypes() {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM types", (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }

    search(key) {
        var query = "SELECT list_id, name, description, date, image, view, download, "+
                "(SELECT name FROM accounts a WHERE a.account_id = t.author_id) author" +
                ` FROM todolists t WHERE name LIKE '%${key}%';`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }

    searchByType(type_id) {
        var query = "SELECT list_id, name, description, date, image, view, dowload, "+
                "(SELECT name FROM accounts a WHERE a.account_id = t.author_id) author" +
                `FROM todolists t WHERE type = '${type_id}';`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }
}

module.exports = new Search();