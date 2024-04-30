interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Widget {
  type: string;
  layout: Layout[];
}
