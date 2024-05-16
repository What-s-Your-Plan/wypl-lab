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

type Weather = {
  city: string;
  weather_id: number;
  temp: number;
  min_temp: number;
  max_temp: number;
  update_time: string;
  main: string;
  desc: string;
  is_sunrise: boolean;
};
