const Chung = require('./m_index');

class DangNhap extends Chung {

    /**
     * can
     */
    findPassRoleID(email) {
        var queue = `select password, role, account_id from accounts where email = '${email}'`
        console.log(queue)
        return new Promise((resolve, reject) => {
            this.connection.query(queue, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) {
                    console.log(err);
                    return reject("lỗi truy xuất email");
                }
                if (!rows.length) return reject('Tài khoản chưa được cấp');
                if (rows[0].password[0] != '$') return reject('Tài khoản chưa được cấp');
                else return resolve(rows); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    /*
    can
     */
    setPassword(name, email, pass) {
        return new Promise((resolve, reject) => { //trả về promise 
            var queue = "INSERT INTO accounts (name, email, password) " +
                `VALUES ('${name}', '${email}', '${pass}');`
            console.log(queue)
            this.connection.query(queue, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve("thành công");
            });
        });
    }
}

module.exports = new DangNhap();