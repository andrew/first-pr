function getLogin(){
  return window.location.hash.slice(1)
}

var missingTemplate = $('#missing-template').html();
var foundTemplate = $('#found-template').html();
var errorTemplate = $('#error-template').html();
Mustache.parse(foundTemplate);
Mustache.parse(errorTemplate);
Mustache.parse(missingTemplate);

function render(template, params) {
  $('#main').html(Mustache.render(template, params))
}

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
    }).error(function(){
      render(errorTemplate, {login: login})
      flappyPanel()
    })
  }
}

function renderData(pullRequestData){
  if(pullRequestData){
    render(foundTemplate, pullRequestData)
    $('.moment-date').each(function (index, dateElem) {
      var $dateElem = $(dateElem)
      var formatted = moment( $dateElem.html() ).format('MMMM Do YYYY, h:mm a')
      $dateElem.html(formatted)
    });
  } else {
    render(missingTemplate, {login: getLogin()})
  }
  flappyPanel()
}

function renderError(message){
  $('#main').html("<p>"+message+"</p>")
  flappyPanel()
}

function flappyPanel(){
  $('#login').val(getLogin()).blur()
  $('#main').removeClass('hidden').addClass('expanded')
}

$(window).on('hashchange',function(){
  loadData(getLogin(), renderData)
});

$('#user-form').submit(function(){
  window.location.hash = $('#login')[0].value
  return false
})

loadData(getLogin(), renderData)
