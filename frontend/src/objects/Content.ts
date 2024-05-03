abstract class Content {
  blockType: ReviewType;
  isDraggable: boolean;

  constructor(index: number, blockType: ReviewType) {
    this.blockType = blockType;
    this.isDraggable = true;
  }
}

class TextContent extends Content {
  text: string;

  constructor(index: number, text: string) {
    super(index, 'text');
    this.text = text;
  }
}

class PictureContent extends Content {
  path: string;

  constructor(index: number, path: string) {
    super(index, 'picture');
    this.path = path;
  }
}

class EmotionContent extends Content {
  emoji: string;
  description: string;

  constructor(index: number, emoji: string, description: string) {
    super(index, 'emotion');
    this.emoji = emoji;
    this.description = description;
  }
}

class WeatherContent extends Content {
  weather: string;
  description: string;

  constructor(index: number, weather: string, description: string) {
    super(index, 'weather');
    this.weather = weather;
    this.description = description;
  }
}

class KPTContent extends Content {
  keepStr: string;
  problemStr: string;
  tryStr: string;

  constructor(
    index: number,
    keepStr: string,
    problemStr: string,
    tryStr: string,
  ) {
    super(index, 'kpt');
    this.keepStr = keepStr;
    this.problemStr = problemStr;
    this.tryStr = tryStr;
  }
}

class FourFContent extends Content {
  facts: string;
  feeling: string;
  finding: string;
  future: string;

  constructor(
    index: number,
    facts: string,
    feeling: string,
    finding: string,
    future: string,
  ) {
    super(index, '4f');
    this.facts = facts;
    this.feeling = feeling;
    this.finding = finding;
    this.future = future;
  }
}

export {
  Content,
  TextContent,
  PictureContent,
  EmotionContent,
  WeatherContent,
  KPTContent,
  FourFContent,
};
