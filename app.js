function getLogin(){
  return window.location.hash.slice(1)
}

var foundTemplate = $('#template').html();
Mustache.parse(foundTemplate);

function loadData(login, cb){
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
    }).error(function() { renderError(getLogin()+" isn't a valid GitHub login") })
  }
}

function renderData(pullRequestData){
  if(pullRequestData){
    $('#main').html(Mustache.render(foundTemplate, pullRequestData))
    $('#login').val(getLogin()).blur();
    $('.moment-date').each(function (index, dateElem) {
      var $dateElem = $(dateElem);
      var formatted = moment( $dateElem.html() ).format('MMMM Do YYYY, h:mm a');
      $dateElem.html(formatted);
    });
  } else {
    renderError('It doesn\'t look like '+getLogin()+' has sent a pull request yet.')
  }
}

function renderError(message){
  $('#main').html("<p>"+message+"</p>")
}

$(window).on('hashchange',function(){
  loadData(getLogin(), renderData)
});

$('#user-form').submit(function(){
  window.location.hash = $('#login')[0].value
  return false
})

loadData(getLogin(), renderData)
