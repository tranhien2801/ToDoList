const Chung = require('./m_index');

class DanhSach extends Chung {

    set_list(data, id) {
        var query = "INSERT INTO todolists (name, description, image, author_id, type_id) " +
        `VALUES ('${data.name}', '${data.description}', '${data.image}', '${id}', '${data.type_id}');`
       
        for (let i = 0; i < data.step.length; i++) {
            var step = data.step[i]
            query += 'INSERT INTO steps (name, description, time, number, list_id)' +
            `VALUES ('${step.name}', '${step.description}', '${step.time}', '${i}', (SELECT max(list_id) from todolists));`
            
            for (let j =0; j < step.substep.length; j++) {
                var substep = step.substep[j]
                query += 'INSERT INTO sub_steps (name, description, time, step_id)' +
                `VALUES ('${substep.name}', '${substep.description}', '${substep.time}', (SELECT max(step_id) from steps));`
            }
        }

        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve("Them danh sach thanh cong");
            });
        });
    }

    getList(id) {
        var query = `SELECT * FROM todolists WHERE list_id = '${id}'`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                resolve(rows[0]); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    getSteps(list_id) {
        var query = `SELECT * FROM steps WHERE list_id = '${list_id}'`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                resolve(rows); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    getSubsteps(step_id) {
        var query = `SELECT * FROM sub_steps WHERE step_id = '${step_id}'`
        console.log(query)
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                resolve(rows); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    getAuthor(author_id) {
        var query = `SELECT * FROM accounts WHERE account_id = '${author_id}'`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                resolve(rows[0]); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    getComments(list_id) {
        var query = `SELECT * FROM comments WHERE list_id = '${list_id}'`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                resolve(rows); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    getVote(list_id) {
        var query = `SELECT AVG(score) avg FROM votes WHERE list_id = '${list_id}'`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                resolve(rows[0]); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    makeComment(comment, list_id, user) {
        var query = `INSERT INTO comments(comment, account_id, list_id) VALUES ('${comment}','${user}','${list_id}')`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve("binh luan thanh cong");
            });
        });
    }

    makeVote(score, list_id, user) {
        var query = `INSERT INTO votes(score, account_id, list_id) VALUES ('${score}','${user}','${list_id}')`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve("danh gia thanh cong");
            });
        });
    }

    increaseView(list_id) {
        var query = `UPDATE todolists SET view = view + 1 WHERE list_id = ${list_id};`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve("thanh cong");
            });
        });
    }

    increaseDownload(list_id) {
        var query = `UPDATE todolists SET download = download + 1 WHERE list_id = ${list_id};`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve("tang luot tai thanh cong");
            });
        });
    }
}

module.exports = new DanhSach();