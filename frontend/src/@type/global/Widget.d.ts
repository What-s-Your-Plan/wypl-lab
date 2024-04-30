interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Widget {
  widgetType: string;
  layout: Layout;
}
