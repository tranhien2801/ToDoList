var m_todolist = require('../model/m_todolist'); //sử dụng csdl model chung tất cả các bảng (mỗi bảng 1 file js trong model)
const Index = require('./ct_index');

class Data {

    /**
     * tạo ra bản ghi công việc
     * post | 127.0.0.1:3000/list/
     * req:data dữ liệu dạng json
     * res:status: thành công/ thất bại
     */
    set_list(req, res) {
        console.log(req.body.data)
        m_todolist.set_list(JSON.parse(req.body.data), req.user)
        .then(s => res.json({status: s}))
    }

    /**
     * Lấy bản ghi công việc
     * get | 127.0.0.1:3000/list/get_list/
     * req
        "id": id của bản ghi cần lấy
     * 
     * res:
     *  "list_id": id của bản ghi,
        "name": tên của bản ghi,
        "description": "mô tả,
        "date": ngày tạo,
        "image": đường link dẫn đến hình ảnh (nếu có),
        "view": số lượt xem,
        "download": số lượt tải về,
        "author_id": id của tác giả,
        "type_id": id thể loại của bản ghi
     */
    get_list(req, res) {
        m_todolist.increaseView(req.query.id)
        .then(s => m_todolist.getList(req.query.id))
        .then(s => res.json({result: s}))
    }

    /**
     * Lấy thông tin của một bước
     * get | 127.0.0.1:3000/list/get_step/
     * 
     * req:
     * list_id: id của bản ghi
     * 
     * res: danh sách các bước
     * [
     *  "step_id": id của bước,
        "name": tên của bước,
        "description": mô tả,
        "time": thời gian thực hiện,
        "number": số thứ tự,
        "list_id": id của danh sách
     * ]
     * 
     */
    get_steps(req, res) {
        m_todolist.getSteps(req.query.list_id)
        .then(s => res.json({result: s}))
    }

    /**
     * Lấy thông tin của một bước con
     * get | 127.0.0.1:3000/list/get_substep/
     * 
     * req:
     * step_id : id của bước
     * 
     * res: danh sách các bước con
     * [
     *  "sub_step_id": id của bước con,
        "name": tên,
        "description": mô tả,
        "time": thời gian thực hiện,
        "step_id": id của bước cha
     ]
     */
    get_substeps(req, res) {
        m_todolist.getSubsteps(req.query.step_id)
        .then(s => res.json({result: s}))
    }

    /**
     * Lấy thông tin về tác giả của một bản ghi
     * get | 127.0.0.1:3000/list/get_author/
     * req:
     * author_id: id của tác giả
     * 
     * res:
     *  "account_id": id của tác giả,
        "name": tên,
        "register": ngày đăng ký,
        "role": quyền,
        "image": hình ảnh đại diện (nếu có),
        "password": mật khẩu (đã được mã hóa) (thật ra ẩn cái này đi cho bảo mật nhưng khi sửa sẽ rườm rà lên thôi),
        "email": email của tác giả (thật ra ẩn cái này đi cho bảo mật nhưng khi sửa sẽ rườm rà lên thôi)
     * 
     */
    get_author(req, res) {
        m_todolist.getAuthor(req.query.author_id)
        .then(s => res.json({result: s}))
    }

    /**
     * Lấy bình luận của một bản ghi
     * get | 127.0.0.1:3000/get_comment/
     * req:
     * list_id: id của bản ghi
     * 
     * res: danh sách các comment
     * [tất cả thông tin trong bảng comment -..-]
     * 
     */
    get_comments(req, res) {
        m_todolist.getComments(req.query.list_id)
        .then(s => res.json({result: s}))
    }

    /**
     * Lấy đánh giá trung bình của một bản ghi
     * get | 127.0.0.1:3000/list/get_vote/
     * req:
     * list_id: id của bản ghi
     * 
     * res: 
     * avg: số điểm trung bình (null nếu chưa có đánh giá nào)
     */
    get_vote(req, res) {
        m_todolist.getVote(req.query.list_id)
        .then(s => res.json({result: s}))
    }

    /**
     * Tạo bình luận cho một bản ghi
     * post | 127.0.0.1:3000/list/make_comment/
     * 
     * req:
     * comment: bình luận của người dùng
     * list_ld: bản ghi đang bình luận
     * 
     * res:
     * result: thành công/ thất bại
     */
    make_comment(req, res) {
        var comment = req.body.comment
        var list_id = req.body.list_id
        var user = req.user

        m_todolist.makeComment(comment, list_id, user)
        .then(s => res.json({result: s}))
    }

    /**
     * Tạo đánh giá cho một bản ghi
     * post | 127.0.0.1:3000/list/make_vote/
     * 
     * req:
     * score: điểm của người dùng đánh giá
     * list_id: bản ghi đang đánh giá
     * 
     * res:
     * result: thành công/ thất bại
     */
    make_vote(req, res) {
        var score = req.body.score
        var list_id = req.body.list_id
        var user = req.user

        m_todolist.makeVote(score, list_id, user)
        .then(s => res.json({result: s}))
    }

    /**
     * Tăng lượt tải
     * post | 127.0.0.1:3000/list/download/
     * req
     * list_id: bản ghi muốn tăng lượt tải
     * 
     * res
     * result thất bại/ thành công
     */
    increase_download(req, res) {
        m_todolist.increaseDownload(req.body.list_id)
        .then(s => res.json({result: s}))
    }
}

module.exports = new Data;