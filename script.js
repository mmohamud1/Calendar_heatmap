anychart.onDocumentReady(function() {
    anychart.data.loadJsonFile(
      'data.json',
      function(data) {
        var dataset = anychart.data.set(data);
        var mapping = dataset.mapAs({
          x: 'date',
          value: 'level'
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