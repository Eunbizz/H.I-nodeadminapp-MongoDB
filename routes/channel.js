// 채팅방 정보 관리 라우팅 기능

// 라우터의 기본주소는
// http://localhost:3000/channel/~

var express = require('express');
var router = express.Router();

const moment = require('moment');

const Channel = require('../schemas/channel');

router.get('/list', async(req, res, next)=>{

  const channel_list = {
    community_id: "",
    categoty_code:"",
    channel_name:"",
    user_limit:"",
    channel_desc:"",
    channel_state:"",
    reg_date:"",
    reg_member_id:""
  }

  const channels = await Channel.find({});
  
  res.render('channel/list.ejs',{channel_list, channels, moment});
});

router.post('/list', async(req, res, next)=> {

  var channel = {
    channel_state: req.body.channelState,
    channel_name: req.body.channelName,
    categoty_code: req.body.categotyCode
  };

  const channels = await Channel.find(channel);

  res.render('channel/list', {channels})

})


// 신규 채널 등록
router.get('/create', async(req, res)=>{
  res.render('channel/create.ejs')
})

// 신규 채널 등록
router.post('/create', async(req, res)=>{

  var regMemberId = req.body.regMemberId;

  var channel = {
    community_id:1,
    categoty_code: req.body.categotyCode,
    channel_name: req.body.channelName,
    channel_desc: req.body.channelDesc,
    channel_state: req.body.channelState,
    reg_date: Date.now(),
    reg_member_id: 1,
    user_limit: req.body.userLimit,
    edit_date: Date.now(),
    edit_member_id: 1,
  }

  const channels = await Channel.create(channel)

  res.redirect('/channel/list');
})


// 채널삭제
router.get('/delete', async(req, res)=>{

  var channelId = req.query.id;

  const result = await Channel.deleteOne({channel_id: channelId})

  res.redirect('/channel/list')
})

// 채널수정페이지
router.get('/modify/:id', async(req, res)=>{
  
  var channelId = req.params.id;

  var channels = await Channel.find({channel_id: channelId})

  var channel = null;
  if (channels.length > 0 ){
    channel = channels[0]
  }

  res.render('channel/modify.ejs', {channels, channel, moment})
})

// 채널수정페이지 정보수정
router.post('/modify/:id', async(req, res)=>{

  var channelId = req.params.id;

  var channel = {
    community_id:1,
    categoty_code: req.body.categotyCode,
    channel_name: req.body.channelName,
    channel_desc: req.body.channelDesc,
    channel_state: req.body.channelState,
    user_limit: req.body.userLimit,
    edit_date: Date.now(),
    edit_member_id: 1,
  }
  const result = await Channel.updateOne({channel_id: channelId}, channel);

  res.redirect('/channel/list')
})


module.exports = router;