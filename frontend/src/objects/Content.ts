abstract class Content {
  blockType: ReviewType;
  isDraggable: boolean;

  constructor(blockType: ReviewType) {
    this.blockType = blockType;
    this.isDraggable = true;
  }
}

class TextContent extends Content {
  text: string;

  constructor(text: string) {
    super('text');
    this.text = text;
  }
}

class PictureContent extends Content {
  path: string;

  constructor(path: string) {
    super('picture');
    this.path = path;
  }
}

class EmotionContent extends Content {
  emoji: string;
  description: string;

  constructor(emoji: string, description: string) {
    super('emotion');
    this.emoji = emoji;
    this.description = description;
  }
}

class WeatherContent extends Content {
  weather: string;
  description: string;

  constructor(weather: string, description: string) {
    super('weather');
    this.weather = weather;
    this.description = description;
  }
}

class KPTContent extends Content {
  keepStr: string;
  problemStr: string;
  tryStr: string;

  constructor(keepStr: string, problemStr: string, tryStr: string) {
    super('kpt');
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

  constructor(facts: string, feeling: string, finding: string, future: string) {
    super('4f');
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
