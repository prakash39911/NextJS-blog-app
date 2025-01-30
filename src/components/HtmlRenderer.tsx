import React from "react";

const HtmlRenderer = ({ htmlString }: { htmlString: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default HtmlRenderer;
