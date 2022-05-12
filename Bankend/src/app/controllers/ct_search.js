var m_search = require('../model/m_search');
const Index = require('./ct_index');

class Data {

    /**
     * tìm kiếm
     * get | 127.0.0.1:3000/search/
     * req:
     * key: từ khóa cần tìm
     * 
     * res: danh sách bản ghi
     * [
     * {"list_id": id của bản ghi,
     * "name":tên,
     * "description": mô tả,
     * "date": ngày tạo,
     * "image": hình ảnh (có thể null),
     * "view": lượt xem,
     * "download": lượt tải,
     * "author": tên tác giả}
     * ]
     */
    search(req, res) {
        var key = req.query.key
        m_search.search(key)
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }

    /**
     * lấy danh sách thể loại từ server
     * get | 127.0.0.1:3000/search/type
     * 
     * res: danh sách
     * [
     * {"type_id": id thể loại,
     * "name": tên thể loại,
     * "description":mô tả}
     * ]
     */
    getTypes(req, res) {
        m_search.getTypes()
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }
}

module.exports = new Data;