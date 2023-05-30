import { useState } from "react";

import { Button, Input } from "@geist-ui/core";
import { Github } from "@geist-ui/icons";

const SearchComponent: React.FC = () => {
  const [text, setText] = useState("");

  const checkText = () => {
    console.log(text);
  };

  return (
    <div className="flex-col">
      <Input
        icon={<Github />}
        placeholder="GitHub"
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <Button onClick={checkText}>CheckText</Button>
      </div>
    </div>
  );
};

export default SearchComponent;
