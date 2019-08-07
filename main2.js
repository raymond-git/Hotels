function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

var getAllRecords = function(){
  $.getJSON('https://api.airtable.com/v0/app0DTErYuJT7Yv4J/Table%201?api_key=keyFARPhuKuM0vln2',
      function(airtable){
        var html = [];
        $.each(airtable.records, function(index, record) {
            var id = record.id;
            var touristAttractions = record.fields['Tourist Attractions'];
            var touristPhotos = record.fields['Tourist Photos'];
            var tripdescriptions = record.fields['Trip Descriptions'];
           
            
          
         
          html.push(listView(id, touristAttractions, touristPhotos, tripdescriptions));
        });
        $('.list-view').append(html);
      }
    );
  }




  var listView = function(id, touristPhotos, touristAttractions, tripdescriptions ) {
    return `

    <div class="card">
  <div class="card">
  ${touristPhotos ? `<img src="${touristPhotos[0].url}">` : ``}
    <div class="card-body">
      <h5 class="card-title">${touristAttractions}</h5>
      <p>${tripdescriptions}</p>
    </div>
  </div>
  </div>
    `;
  }
    
    


  var getOneRecord = function(id) {
    $.getJSON(`https://api.airtable.com/v0/app0DTErYuJT7Yv4J/Table%202/${id}?api_key=keyFARPhuKuM0vln2`,
      function(record){
        var html = [];
        var touristAttractions = record.fields['Tourist Attractions'];
        var touristPhotos = record.fields['Tourist Photos'];
        var tripLocations = record.fields['Trip Locations'];
        var tripDescriptions = record.fields['Trip Descriptions'];
        
        
        
        html.push(detailView( touristAttractions, touristPhotos, tripLocations, tripDescriptions));
        $('.detail-view').append(html);
      }
    );
  }


  var detailView = function(touristPhotos, touristAttractions, tripDescriptions, tripLocations) {
    return `
    
    <div class="card-deck">
      <div class="card border-dark" style="width: 18rem;">
        ${touristPhotos ? `<img src="${touristPhotos[0].url}">` : ``}
        <div class="card-body">
            <h2 class="card-title">${touristAttractions}</h2> 
           
          </div> 
      </div>
      
       <div class="card border-dark" style="width: 18rem;">
        <div class="card-body">
          <h2 class="card-title">Job Description</h2> 
          <p class="card-text">${tripDescriptions}</p>
        </div>
       </div>    

       <div class="card border-dark" style="width: 18rem;">
        <div class="card-body">
          <h2 class="card-title">Job Description</h2> 
          <p class="card-text">${tripLocations}</p>
        </div>
       </div>   
      
     </div>   
    </div>  
      <div class="back">
      <p><button type="button"><a href="index.html">Back</button></a>
      </div> 
      `
    }
    
  var id = getParameterByName('id');
  if (id) {
    getOneRecord(id);
  } else {
    getAllRecords();
  }