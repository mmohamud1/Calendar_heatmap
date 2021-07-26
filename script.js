anychart.onDocumentReady(function() {
    anychart.data.loadJsonFile(
      'data.json',
      function(data) {
        var dataset = anychart.data.set(data);
        var mapping = dataset.mapAs({
          x: 'date',
          value: 'count'
        });
        var chart = anychart.calendar(mapping);

        chart.background('#f3f4f6');

        chart.months()
          .stroke(false)
          .noDataStroke(false);

        chart.days()
          .spacing(5)
          .stroke(false)
          .noDataStroke(false)
          .noDataFill('#e0e0e0')
          .noDataHatchFill(false);

        chart.colorRange(true);

        var customColorScale = anychart.scales.ordinalColor();
        customColorScale.ranges([
          {less: 2, color: '#23d684'},
          {from: 2,to: 5, color: '#b4d73b'},
          {from: 5,to: 7, color: '#d2c21a'},
          {from: 7,to: 10, color: '#f08b1c'},
          {from: 10,to: 13, color: '#f06b2e'},
          {greater: 13, color: '#e84a40'}
        ]);

        // Set color scale.
        chart.colorScale(customColorScale);

        chart.tooltip()
            .useHtml(true)
            .format(tooltipFormatter);

        chart.listen('chartDraw', function() {
          document.getElementById('container').style.height = chart.getActualHeight() + 'px';
        });

        chart.container('container');
        chart.draw();
      }
    );
});

function tooltipFormatter(ctx) {
    var events = ctx.getData('events');
    var tooltip = document.createElement('div');
    var table = document.createElement('table');
    var thead = table.createTHead();
    thead.style.fontWeight = 'bold';
    var tr = thead.insertRow();
    var cell = tr.insertCell();
    cell.textContent = 'Name';
    cell = tr.insertCell();
    cell.textContent = 'Result';
    cell = tr.insertCell();
    cell.textContent = 'Environment';
    cell = tr.insertCell();
    cell.textContent = 'Time';
    cell = tr.insertCell();
    cell.textContent = 'Weighting';
    var tbody = table.createTBody();
    for (var i = 0; i < events.length; i++) {
      var row = tbody.insertRow();
      Object.values(events[i]).forEach(function(value) {
        cell = row.insertCell();
        cell.textContent = value;
      });
    }
    tooltip.appendChild(table);
    return tooltip.innerHTML;
 }