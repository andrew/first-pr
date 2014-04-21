function getQueryVariable(variable){
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
   }
   return(false);
 }

var login = getQueryVariable('login')
var foundTemplate = $('#template').html();
Mustache.parse(foundTemplate);

var loadData = function(login, cb){
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

var renderData = function(pullRequestData){
  if(pullRequestData){
    var output = Mustache.render(foundTemplate, pullRequestData)
  } else {
    var output = '<p>It doesn\'t look like you\'ve sent a pull request yet.</p>'
  }
  $('#main').html(output)
}

if(login){ loadData(login, renderData) }
