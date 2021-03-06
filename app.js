'use strict';

$(document).ready (function(){
  eventListen();
});

//retreives API data
function retrieveAPIData(searchTerm){
  const query = {
    q: searchTerm, 
    part: 'snippet',
    key: 'AIzaSyBR1d0lPmG_VxIFD-U7iEFl20oyg5WslXU',
    maxResults: 6,
  };
  $.getJSON('https://www.googleapis.com/youtube/v3/search', query, function(data) {
    // console.log(data.items);
    displayAPIData(data);
  });
}

//creates  object to attach to html
function displayAPIData(data) {
  const results = data.items.map(function(value, index) {
    const videoID = value.id['videoId']; 
    const medThumbURL = value.snippet.thumbnails.medium.url;
    const vidTitle = value.snippet.title;
    return {
      videoID: videoID,
      medThumbURL: medThumbURL,
      vidTitle: vidTitle
    };
  });
  generateTemplate(results);
}

//transforms object datadata to string
function generateTemplate(results){
  const template = results.map(function(value){
    return `
    <li class="result-content">
      <div class="displayed-video">
        <div class="youtubeText"><span>${value.vidTitle}</span></div>
        <div><iframe width="400" height="300" src="https://www.youtube.com/embed/${value.videoID}" frameborder="0" align="middle" allowfullscreen></iframe></div>        
      </div>
  
    </li>
    `;
  }).join(''); 
  $('.search-results-ul').html(template);
}
// thumbnails clickable to new tab with youtube video:
//<div class="thumbnail"><a href="https://www.youtube.com/embed/${value.videoID}" target="_blank"><img src="${value.medThumbURL}" alt=""></div>


//event listener that grabs search term and returns as callback to event handler
function eventListen() {
  $('.search-form').on('submit', function(e){
    e.preventDefault();
    const searchClear = $('.search-form').find('.search-query');
    const searchTerm = searchClear.val();
    searchClear.val('');
    retrieveAPIData(searchTerm);  
  });
}

