
exports.home = function(req, res)
{
  content = '' + 
    '<h1><b>歡迎來到Shout2Play Online遊戲</b></h1>' + 
    '<p style="width:70%"><font size="4">Shout2Play是一個藉由聲音來控制角色移動、攻擊的射擊遊戲。<br>' + 
    '快來挑戰你的反應、咬字發音吧！！！！！</font></p>' +
    '<h3 class="bg-success"><b>遊戲說明</b></h3>' +
    '<p>' +
    '遊戲開始後，玩家透過聲控的方式來操作胖虎移動，遊戲中玩家藉由閃躲隕石和擊出棒球的方式來躲避攻擊,以獲得高分' +
    '</p>' +
    '<p>' +
      '<ul>' + 
        '<li type="disc"><img src="img/bird.jpg" width="60px"></img>：若以棒球擊中目標，即可獲得一分</li>' +
        '<li type="disc"><img src="img/rock.jpg" width="60px"></img>：無法以棒球擊碎</li>' +
      '</ul>' +
    '</p>' +

    '<h3 class="bg-success"><b>How To Play?</b></h3>' +
    '<p>' +
      '<ul>' + 
        '<li type="disc">當你喊出<b class="bg-info"><font size="4">POP</font></b>時,角色會往<b class="bg-info"><font size="4">上方</font></b>移動</li>' +
        '<li type="disc">當你喊出<b class="bg-info"><font size="4">PUSH</font></b>時,角色會往<b class="bg-info"><font size="4">下方</font></b>移動</li>' +
        '<li type="disc">當你喊出<b class="bg-info"><font size="4">SHOOT、SHOO~</font></b>時,角色會<b class="bg-info"><font size="4">發射棒球</font></b></li>' +
        '<li type="disc">當你喊出<b class="bg-info"><font size="4">BOOM</font></b>時,角色會<b class="bg-info"><font size="4">使用大招</font></b>消滅所有物體</li>' +
      '</ul>' + 
    '</p>';
      

  res.send(content);
};
