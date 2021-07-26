anychart.onDocumentReady(function() {
    anychart.data.loadJsonFile(
      'https://cdn.anychart.com/samples/calendar-chart/github-contributions/data.json',
      function(data) {
        var dataset = anychart.data.set(data);
        var mapping = dataset.mapAs({
          x: 'date',
          value: 'level'
        });
        var chart = anychart.calendar(mapping);

        chart.background('#22282D');

        chart.months()
          .stroke(false)
          .noDataStroke(false);

        chart.days()
          .spacing(5)
          .stroke(false)
          .noDataStroke(false)
          .noDataFill('#2d333b')
          .noDataHatchFill(false);

        chart.colorRange(false);

        var customColorScale = anychart.scales.ordinalColor();
        customColorScale.ranges([
          {equal: 1, color: '#0D4428'},
          {equal: 2, color: '#006D31'},
          {equal: 3, color: '#37AB4B'},
          {equal: 4, color: '#39D353'}
        ]);

        // Set color scale.
        chart.colorScale(customColorScale);

        chart.tooltip()
          .format('{%count} contributions');

        chart.listen('chartDraw', function() {
          document.getElementById('container').style.height = chart.getActualHeight() + 'px';
        });

        chart.container('container');
        chart.draw();
      }
    );
  });