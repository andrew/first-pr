function timeAgo(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var rtf = new Intl.RelativeTimeFormat('en', {numeric: 'auto'});
  var intervals = [
    {unit: 'year', seconds: 31536000},
    {unit: 'month', seconds: 2592000},
    {unit: 'day', seconds: 86400},
    {unit: 'hour', seconds: 3600},
    {unit: 'minute', seconds: 60},
    {unit: 'second', seconds: 1}
  ];
  for (var i = 0; i < intervals.length; i++) {
    var count = Math.floor(seconds / intervals[i].seconds);
    if (count >= 1) return rtf.format(-count, intervals[i].unit);
  }
  return rtf.format(0, 'second');
}

function getLogin(){
  return normaliseLogin(window.location.hash.slice(1));
}

// normalize user input so we accept either a bare login or a
// full github.com profile URL.  If the value looks like a URL we
// strip everything except the username part.
function normaliseLogin(input) {
  input = (input || '').trim();
  var m = input.match(/github\.com\/([^\/?#\s]+)/i);
  return m ? m[1] : input;
}

var main = document.getElementById('main');

function renderFound(d) {
  var state;
  if (d.merged) {
    state = '<time class="state merged moment-date" datetime="' + d.merged_at + '" is="relative-time" title="' + d.merged_at + '">Merged</time>';
  } else if (d.closed_at) {
    state = '<time class="state closed moment-date" datetime="' + d.closed_at + '" is="relative-time" title="' + d.closed_at + '">Closed</time>';
  } else {
    state = '<span class="state open">Open</span>';
  }

  return '<div class="results-wrapper">' +
    '<div class="result hidden found cf">' +
      '<h2 id="pr-title">' +
        '<a href="' + d.html_url + '" id="title" target="_blank">' + d.title + '</a> <span class="pr-number">#' + d.number + '</span><br>' +
        '<small>to <a href="' + d.base.repo.html_url + '" target="_blank">' + d.base.repo.full_name + '</a></small>' +
      '</h2>' +
      '<div class="user-media">' +
        '<a class="avatar" href="' + d.user.html_url + '" target="_blank">' +
          '<img src="' + d.user.avatar_url + '" width="48" height="48" />' +
        '</a>' +
        '<div class="pr-dates">' +
          '<p class="sent-on">' +
            '<a href="' + d.user.html_url + '">' + d.user.login + '</a> sent this pull request ' +
            '<time class="moment-date sent" datetime="' + d.created_at + '" is="relative-time" title="' + d.created_at + '">' + d.created_at + '</time>' +
          '</p>' +
          '<p>' + state + '</p>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>' +
  '<div id="all-results">' +
    '<a href="https://github.com/search?q=author%3A' + d.user.login + '&type=pullrequests&s=created&o=asc" target="_blank">See every pull request</a> by <a href="' + d.user.html_url + '">' + d.user.login + '</a>' +
    ' &bull; <button id="copy-link-btn" type="button">Copy profile link</button>' +
  '</div>';
}

function renderMissing(login) {
  return '<div class="results-wrapper">' +
    '<div class="result hidden missing">' +
      '<h2>It doesn\'t look like <a href="https://github.com/' + login + '">' + login + '</a> has sent a pull request yet.</h2>' +
      '<p><strong>Need help sending your first pull request?</strong> Check out <a href="https://opensource.guide/how-to-contribute/">this handy guide.</a></p>' +
    '</div>' +
  '</div>';
}

function renderError(login) {
  return '<div class="results-wrapper">' +
    '<div class="result hidden error">' +
      '<h2><b>' + login + '</b> doesn\'t appear to be on GitHub at all.</h2>' +
    '</div>' +
  '</div>';
}

function renderRequestError() {
  return '<div class="results-wrapper">' +
    '<div class="result hidden error">' +
      '<h2>There\'s been a problem getting the information from <b>GitHub</b>. Please try again later.</h2>' +
    '</div>' +
  '</div>';
}

function loadData(login, cb){
  if(login){
    var searchURL = 'https://api.github.com/search/issues?q=type:pr+author:"'+login+'"+-user:"'+login+'"&sort=created&order=asc&per_page=1';
    fetch(searchURL).then(function(r){ return r.json(); }).then(function(data){
      if(data.items.length > 0){
        fetch(data.items[0].pull_request.url).then(function(r){ return r.json(); }).then(function(data){
          cb(data);
        }).catch(function(){
          main.innerHTML = renderRequestError();
          flappyBoard();
        });
      } else {
        cb(null);
      }
    }).catch(function(){
      main.innerHTML = renderError(login);
      flappyBoard();
    });
  }
}

function renderData(pullRequestData){
  if(pullRequestData){
    main.innerHTML = renderFound(pullRequestData);
    document.getElementById('copy-link-btn').addEventListener('click', function() {
      navigator.clipboard.writeText(window.location.href);
      this.textContent = 'Copied!';
      var btn = this;
      setTimeout(function(){ btn.textContent = 'Copy profile link'; }, 2000);
    });
    document.querySelectorAll('.moment-date').forEach(function(dateElem){
      var time = new Date(dateElem.getAttribute('datetime'));
      var formatted = time.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'});
      dateElem.setAttribute('title', dateElem.textContent + ' on ' + formatted);
      if(dateElem.classList.contains('sent')){
        dateElem.setAttribute('title', formatted);
        dateElem.textContent = timeAgo(time);
      }
    });
  } else {
    main.innerHTML = renderMissing(getLogin());
  }
  flappyBoard();
}

function flappyBoard(){
  var login = document.getElementById('login');
  login.value = getLogin();
  login.blur();
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      document.querySelectorAll('.result').forEach(function(el){
        el.classList.remove('hidden');
        el.classList.add('expanded');
      });
      setTimeout(function(){
        document.querySelectorAll('.spinner').forEach(function(el){
          el.classList.add('hide');
        });
      }, 500);
    });
  });
}

document.addEventListener('DOMContentLoaded', function(){
  window.addEventListener('hashchange', function(){
    loadData(getLogin(), renderData);
  });

  document.getElementById('user-form').addEventListener('submit', function(e){
    e.preventDefault();
    document.querySelector('.spinner').classList.remove('hide');
    window.location.hash = '';
    // normalise in case the user pasted a full profile URL
    window.location.hash = normaliseLogin(document.getElementById('login').value);
  });

  loadData(getLogin(), renderData);
});
