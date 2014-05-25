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
    ga('send', 'event', 'login', 'search', login);
    var searchURL = 'https://api.github.com/search/issues?q=type:pr+author:"'+login+'"&sort=created&order=asc&per_page=1'
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
      flappyBoard()
    })
  }
}

function renderData(pullRequestData){
  if(pullRequestData){
    render(foundTemplate, pullRequestData)
    twttr.widgets.load();
    $('.moment-date').each(function (index, dateElem) {
      var $dateElem = $(dateElem);
      var time = moment( $dateElem.attr('datetime') )
      $dateElem.attr('title', $dateElem.text() + " on " + time.format('MMMM Do YYYY, h:mm a'));
      if($dateElem.hasClass('sent')){
        $dateElem.text(time.fromNow())
      }
    });
  } else {
    render(missingTemplate, {login: getLogin()})
  }
  flappyBoard()
}

function renderError(message){
  $('#main').html("<p>"+message+"</p>")
  flappyBoard()
}

function flappyBoard(){
  $('#login').val(getLogin()).blur()
  imagesLoaded( '.result', function() {
    $('.result').removeClass('hidden').addClass('expanded')
    setTimeout(function(){
      $('.spinner').addClass('hide')
    }, 500)
  })
}

$(window).on('hashchange',function(){
  loadData(getLogin(), renderData)
});

$('#user-form').submit(function(){
  $('.spinner').removeClass('hide')
  window.location.hash = ''
  window.location.hash = $('#login')[0].value
  return false
})

loadData(getLogin(), renderData)
