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
    $.getJSON('https://api.airtable.com/v0/app0DTErYuJT7Yv4J/Table%201 \
    -H "Authorization: Bearer keyFARPhuKuM0vln2',
      function(airtable){
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var hotel = record.fields['Hotels'];
          var price = record.fields['Price'];
          var attachment = record.fields['Attachments'];
          var hotellocation = record.fields['Hotel Locations'];
          var descriptions = record.fileds['Descriptions'];
          var touristAttractions = record.fields['Tourist Attractions'];
          var touristAttachments = record.fields['Tourist Attractions Attachment'];
          var triplocation = record.fields['Trip Locations'];
          var tripDescriptions = record.fields['Trip Descriptions'];
          html.push(listView(id, hotel, price, attachment, hotellocation, descriptions, touristAttractions,
                             touristAttachments, triplocation, tripDescriptions));
        });
        $('.list-view').append(html);
      }
    );
  }

  var listView = function(id, picture, jobTitle, avgRate) {
    return `
      <div class="card border-dark" style="width: 18rem;">
      ${picture ? `<img src="${picture[0].url}">` : ``}
      <div class="card-body">
        <h2 class="card-title"><a href="index.html?id=${id}">${jobTitle}</h2></a>
        <p class="card-text"><u>Average Annual Salary:</u><p> $${toCommas(avgRate*24)}</p>
        </div>
      </div>
    `;
  }