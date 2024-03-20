import React, { FormEvent, useState } from "react";
import { MdDelete } from "react-icons/md";
type Pair = {
  key: string;
  value: string;
};

interface Props {
  parameters: Array<Pair>;
  selected:boolean;
  userId:string
}

const Parameters: React.FC<Props> = ({ parameters,selected, userId }) => {
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [pairs, setPairs] = useState<Pair[]>([...parameters]);

  const handleParameterRemove = (index: number) => {
    const newPairs = [...pairs];
    newPairs.splice(index, 1);
    setPairs(newPairs);
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setPairs([...pairs, { key, value }]);
    setKey("");
    setValue("");
  };

  return (
    <div>
      
      <ul>
      {pairs.map((pair, index) => (
          <li key={index}>
            {pair.key}: {pair.value}
            <button onClick={() => handleParameterRemove(index)}><MdDelete/></button>
          </li>
        ))}
      </ul> {selected && 
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Key"
          value={key}
          className="text-black"
          onChange={(e) => setKey(e.target.value)}
          />
        <input
          type="text"
          placeholder="Value"
          className="text-black"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          />
        <button type="submit">Submit</button>
      </form>
        }
    </div>
  );
};

export default Parameters;
