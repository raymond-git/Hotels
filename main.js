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
          var attachment = record.fields['Attachments'];
          var hotel = record.fields['Hotels'];
          var price = record.fields['Price'];
          var description = record.fields['Descriptions'];
         
          html.push(listView(id, attachment, hotel, price, description));
        });
        $('.list-view').append(html);
      }
    );
  }

  var listView = function(id, attachment, hotel, price ) {
    return `
    
    <div class="card">
  <div class="card">
  ${attachment ? `<img src="${attachment[0].url}">` : ``}
    <div class="card-body">
      <h5 class="card-title">${hotel}</h5>
      <p class="card-text">Price: $${price}</p>
      <p> <a href="Hotel.html?id=${id}"> Click here for more information </a></p>
    </div>
  </div>
    `;
  }


  var getOneRecord = function(id) {
    $.getJSON(`https://api.airtable.com/v0/app0DTErYuJT7Yv4J/Table%201/${id}?api_key=keyFARPhuKuM0vln2`,
      function(record){
        var html = [];
        var attachment = record.fields['Attachments'];
        var hotel = record.fields['Hotels'];
        var description = record.fields['Descriptions'];
        var hotellocation = record.fields['Hotel Locations'];
        
        
        html.push(detailView(attachment, hotel, description, hotellocation ));
        $('.detail-view').append(html);
      }
    );
  }


  var detailView = function( attachment, description, hotellocation) {
    return `

    
<div class="Bord">

<div class="card bg-dark text-white" style="height: 500px; width: 320px;">
<div class="card-img-overlay">
  <h5 class="card-title">${description}</h5>
  <p class="card-text" style="width: 280px; text-align: justify; ">${hotellocation}</p>
</div>
</div>
</div>
       `;
    }
    
    
  var id = getParameterByName('id');
  if (id) {
    getOneRecord(id);
  } else {
    getAllRecords();
  }