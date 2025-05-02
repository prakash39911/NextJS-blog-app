import React from "react";

interface HtmlRendererProps {
  htmlString: string;
}

const HtmlRenderer: React.FC<HtmlRendererProps> = ({ htmlString }) => {
  return (
    <div
      className="blog-content animate-fade-in"
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
};

export default HtmlRenderer;
