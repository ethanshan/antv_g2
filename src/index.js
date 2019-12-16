const { DataView } = DataSet;
const data = [
  { value: 2, type: '硬件设计', name: '结构 2 人' },
  { value: 2, type: '硬件设计', name: '原理图设计 2 人' },
  { value: 2, type: '硬件设计', name: 'PCB设计 2 人' },
  { value: 2, type: '软件开发', name: '系统开发 2 人' },
  { value: 1, type: '软件开发', name: '单片机 1 人' },
  { value: 1, type: '软件开发', name: 'Android开发 1 人' },
  { value: 3, type: '软件开发', name: '后台开发 3 人' },
  { value: 3, type: '技术支持', name: 'FAE 3 人' },
  { value: 1, type: '生产保障', name: 'QA 1 人' },
  { value: 2, type: '生产保障', name: '产线负责人 2 人' },
  { value: 2, type: '生产保障', name: '采购 2 人' },
  
  
];
// 通过 DataSet 计算百分比
const dv = new DataView();
dv.source(data).transform({
  type: 'percent',
  field: 'value',
  dimension: 'type',
  as: 'percent'
});
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: 0
});
chart.source(dv, {
  percent: {
    formatter: val => {
      val = (val * 100).toFixed(2) + '%';
      return val;
    }
  }
});
chart.coord('theta', {
  radius: 0.5
});
chart.tooltip({
  showTitle: false
});
chart.legend(false);
chart.intervalStack()
  .position('percent')
  .color('type')
  .label('type', {
    offset: -10
  })
  .tooltip('name*percent', (item, percent) => {
    percent = (percent * 100).toFixed(2) + '%';
    return {
      name: item,
      value: percent
    };
  })
  .select(false)
  .style({
    lineWidth: 1,
    stroke: '#fff'
  });

const outterView = chart.view();
const dv1 = new DataView();
dv1.source(data).transform({
  type: 'percent',
  field: 'value',
  dimension: 'name',
  as: 'percent'
});
outterView.source(dv1, {
  percent: {
    formatter: val => {
      val = (val * 100).toFixed(2) + '%';
      return val;
    }
  }
});
outterView.coord('theta', {
  innerRadius: 0.5 / 0.75,
  radius: 0.75
});
outterView.intervalStack()
  .position('percent')
  .color('name', [ '#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4' ])
  .label('name')
  .tooltip('name*percent', (item, percent) => {
    percent = (percent * 100).toFixed(2) + '%';
    return {
      name: item,
      value: percent
    };
  })
  .select(false)
  .style({
    lineWidth: 1,
    stroke: '#fff'
  });

chart.render();
