var express = require('express');
var router = express.Router();

//导入 lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname + '/../data/db.json');
//获取 db 对象
const db = low(adapter);
//导入shortid
const shortid = require('shortid');
//导入 moment
const moment = require('moment');
const AccountModel = require('../models/AccountModel');

//测试
console.log(moment('2023-02-24').toDate())
//格式化日期对象
// console.log(moment(new Date()).format('YYYY-MM-DD'));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 查
router.get("/account", function (req, res, next) {
  //  获取所有的账单信息
  // let accounts = db.get("accounts").value();
  // console.log(accounts);
  //读取集合信息
  AccountModel.find()
    .sort({ time: -1 })
    .exec((err, data) => {
      if (err) {
        res.status(500).send("读取失败~~~");
        return;
      }
      //响应成功的提示
      // res.render("list", { accounts: accounts });
      res.render("list", { accounts: data, moment: moment });
    });
});


router.get("/account/create", function (req, res, next) {
  res.render("create");
});


// 增
router.post("/account", (req, res) => {
  console.log(req.body);
  // 写入
  // let id = shortid.generate();
  // db.get("accounts")
  //   .unshift({ id: id, ...req.body })
  //   .write();
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
      if (err) {
        res.status(500).send("插入失败~~");
        return;
      }
      //成功提醒
      res.render("success", { msg: "添加成功哦~~~", url: "/account" });
    }
  );
});


// 删
router.get("/account/:id", (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send("删除失败~");
      return;
    }
    //提醒
    res.render("success", { msg: "删除成功~~~", url: "/account" });
  });
});

module.exports = router;
