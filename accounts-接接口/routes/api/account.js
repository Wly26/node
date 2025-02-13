var express = require("express");
var router = express.Router();

//导入 moment
const moment = require("moment");
const AccountModel = require("../../models/AccountModel");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// 查-所有
router.get("/account", function (req, res, next) {
  //读取集合信息
  AccountModel.find()
    .sort({ time: -1 })
    .exec((err, data) => {
      if (err) {
        // res.status(500).send("读取失败~~~");
        res.json({
            code: "1001",
            msg: "读取失败~~",
            data: null,
        });
        return;
      }
      //响应成功的提示
      // res.render("list", { accounts: accounts });
      // res.render("list", { accounts: data, moment: moment });
      res.json({
        //响应编号
        code: "0000",
        //响应的信息
        msg: "读取成功",
        //响应的数据
        data: data,
      });
    });
});

// 增
router.post("/account", (req, res) => {
  console.log(req.body);
  // 写入
  // 修改time的值
  // req.body.time = moment(req.body.time).toDate();
  //插入数据库
  AccountModel.create(
    {
      ...req.body,
      //修改 time 属性的值
      time: moment(req.body.time).toDate(),
    },
    (err, data) => {
    //   if (err) {
    //     res.status(500).send("插入失败~~");
    //     return;
    //   }
    //   //成功提醒
    //   res.render("success", { msg: "添加成功哦~~~", url: "/account" });
        if (err) {
          res.json({
            code: "1002",
            msg: "创建失败~~",
            data: null,
          });
          return;
        }
        //成功提醒
        res.json({
          code: "0000",
          msg: "创建成功",
          data: data,
        });
    }
  );
});

// 删
router.delete("/account/:id", (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    // if (err) {
    //   res.status(500).send("删除失败~");
    //   return;
    // }
    // //提醒
    // res.render("success", { msg: "删除成功~~~", url: "/account" });
    if (err) {
      res.json({
        code: "1003",
        msg: "删除账单失败",
        data: null,
      });
      return;
    }
    //提醒
    res.json({
      code: "0000",
      msg: "删除成功",
      data: {},
    });
  });
});

//查-单个
router.get('/account/:id', (req, res) => {
  //获取 id 参数
  let {id} = req.params;
  //查询数据库
  AccountModel.findById(id, (err, data) => {
    if(err){
      return res.json({
        code: '1004',
        msg: '读取失败~~',
        data: null
      })
    }
    //成功响应
    res.json({
      code: '0000',
      msg: '读取成功',
      data: data  
    })
  })
});

//改-单个
router.patch('/account/:id', (req, res) => {
  //获取 id 参数值
  let {id} = req.params;
  //更新数据库
  AccountModel.updateOne({_id: id}, req.body, (err, data) => {
    if(err){
      return res.json({
        code: '1005',
        msg: '更新失败~~',
        data: null
      })
    }
    //再次查询数据库 获取单条数据
    AccountModel.findById(id, (err, data) => {
      if(err){
        return res.json({
          code: '1004',
          msg: '读取失败~~',
          data: null
        })
      }
      //成功响应
      res.json({
        code: '0000',
        msg: '更新成功',
        data: data  
      })
    })
    
  });
});

module.exports = router;
