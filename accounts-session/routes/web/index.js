var express = require('express');
var router = express.Router();

//导入 moment
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

//导入中间件检测登录
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware');

//添加首页路由规则
router.get('/', (req, res) => {
  //重定向 /account
  res.redirect('/account');
})

//页面html
router.get("/account/create", checkLoginMiddleware,function (req, res, next) {
  res.render("create");
});

// 查 + 页面html
router.get("/account", checkLoginMiddleware,function (req, res, next) {
  //获取所有的账单信息
  // let accounts = db.get('accounts').value();
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

// 增
router.post("/account", checkLoginMiddleware,(req, res) => {
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
router.get("/account/:id",checkLoginMiddleware, (req, res) => {
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
