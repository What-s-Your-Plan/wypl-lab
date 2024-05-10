type TextProps = {
  content: string;
};

function Text({ content }: TextProps) {
  return (
    <div className="w-full">
      {content.split('\n').map((line, index) => {
        return (
          <span key={index} className="break-all w-full">
            {line}
            <br />
          </span>
        );
      })}
    </div>
  );
}

export default Text;
