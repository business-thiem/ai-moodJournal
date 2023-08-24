'use client';

import { updateEntry } from '@/utils/api';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';

// _value is used instead of value bc it is guaranteed to be current. Otherwise variable would be a few cycles behind
const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const updated = await updateEntry(entry.id, _value);
      setIsLoading(false);
    },
  });

  return (
    <div className="w-full h-full">
      <div className="flex ">
        <div className="">Save Status</div>
        <div
          className={`rounded-full h-4 w-4 m-1 ${
            isLoading ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          &nbsp;
        </div>
        <div className="text-xs text-gray-400/80 p-1">
          Note is set to auto save every 2 seconds after user interaction
        </div>
      </div>
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Editor;
