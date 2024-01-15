// 채팅 메시지 이력 정보 관리 라우팅 기능
// http://localhost:3000/message/~

var express = require('express');
var router = express.Router();

var moment = require('moment');
const channelMsg = require('../schemas/channelMessage');
const { nextTick } = require('process');

router.get('/list', async(req, res, next)=>{
  
  const message_list = {
    channel_id: "",
    member_id: "",
    nick_name: "",
    msg_type_code: "",
    connection_id: "",
    ip_address: "",
    msg_stage_code: "",
    msg_date: Date.now(),
    edit_date: Date.now(),
  }

  const messages = await channelMsg.find({});

  res.render('message/list.ejs',{message_list, messages, moment});
});


router.post('/list', async(req, res, next)=> {
  res.render('message/list')
})



// 메시지 생성 페이지 로드
router.get('/create', async(req, res)=>{
  res.render('message/create.ejs')
})

// 메시지 생성 페이지 저장
router.post('/create', async(req, res)=>{

  var message = {
    channel_id: 1,
    member_id: 1,
    nick_name: req.body.nickName,
    msg_type_code: req.body.msgTypeCode,
    connection_id: req.body.connectionId,
    message,
    ip_address: "111.111.222.111",
    msg_stage_code: 1,
    msg_date: Date.now(),
    edit_date: Date.now(),
  };

  var messages = await channelMsg.create(message)

  res.redirect('/message/list')
})



// 메시지 수정
router.get('/modify/:id', async(req, res)=>{
  
  var messageId = req.params.id;

  var message = await channelMsg.find({channel_msg_id:messageId})

  res.render('message/modify.ejs', {message, moment})
});

router.post('/modify/:id', async(req, res)=>{

  var messageId = req.params.id;

  var message = {
    channel_id: req.body.channelId,
    member_id: req.body.memberId,
    nick_name: req.body.nickName,
    msg_type_code: req.body.msgTypeCode,
    connection_id: req.body.connectionId,
    message,
    ip_address: "111.111.222.111",
    edit_date: Date.now(),
  };

  var result = await channelMsg.updateOne({channel_msg_id:messageId}, message)

  res.redirect('/message/list')
})



// 목록페이지 이동처리
router.get('/delete', async(req, res)=>{

  var messageId = req.query.id;

  res.redirect('/message/list')
})


module.exports = router;
