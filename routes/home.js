
exports.home = function(req, res)
{
  content = '<div class="alert alert-info" style="width: 50%;">按下Enter鍵開始遊戲';
  res.send(content);
};
