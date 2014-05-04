function getLogin(){
  return window.location.hash.slice(1)
}

var foundTemplate = $('#template').html();
Mustache.parse(foundTemplate);

var loadData = function(login, cb){
  if(login){
    var searchURL = 'https://api.github.com/search/issues?q=type:pr+author:'+login+'&sort=created&order=asc&per_page=1'
    $.getJSON(searchURL, function(data){
      if(data.items.length > 0){
        $.getJSON(data.items[0].pull_request.url, function(data){
          cb(data)
        })
      } else {
        cb(null)
      }
    })
  }
}

var renderData = function(pullRequestData){
  console.log(pullRequestData)
  if(pullRequestData){
    var output = Mustache.render(foundTemplate, pullRequestData)
  } else {
    var output = '<p>It doesn\'t look like '+getLogin()+' has sent a pull request yet.</p>'
  }
  $('#main').html(output)
}

$(window).on('hashchange',function(){
  loadData(getLogin(), renderData)
});

$('#user-form').submit(function(){
  window.location.hash = $('#login')[0].value
  $('#login')[0].value = ""
  return false
})

loadData(getLogin(), renderData)
