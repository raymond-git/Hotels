function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  var getAllRecords = function() {
    $.getJSON('https://api.airtable.com/v0/app0DTErYuJT7Yv4J/Table%201?api_key=keyFARPhuKuM0vln2',
      function(airtable){
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var hotel = record.fields['Hotels'];
          var price = record.fields['Price'];
          var attachment = record.fields['Attachments'];
          var hotellocation = record.fields['Hotel Locations'];
          var description = record.fields['Descriptions'];
          var touristAttraction = record.fields['Tourist Attractions'];
          var touristAttachment = record.fields['Tourist Attractions Attachments'];
          var triplocation = record.fields['Trip Locations'];
          var tripDescription = record.fields['Trip Descriptions'];
          html.push(listView(id, hotel, price, attachment, hotellocation, description, touristAttraction,
                             touristAttachment, triplocation, tripDescription));
        });
        $('.list-view').append(html);
      }
    );
  }

  var listView = function(id) {
    return `
      <h1>${id}</h1>
    `;
  }

  
  var getOneRecord = function(id) {
    $.getJSON(`https://api.airtable.com/v0/app0DTErYuJT7Yv4J/Table%201/${id}?api_key=keyFARPhuKuM0vln2`,
      function(record){
        var html = [];
        var price = record.fields['Price'];
        
        html.push(detailView(price ));
        $('.detail-view').append(html);
      }
    );
  }


  var detailView = function(price) {
    return `
  <h1>${price}</h1>
    `;
  }
  
  var id = getParameterByName('id');
  if (id) {
    getOneRecord(id);
  } else {
    getAllRecords();
  }