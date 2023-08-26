'use client';

import { updateEntry } from '@/utils/api';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';

// _value is used instead of value bc it is guaranteed to be current. Otherwise variable would be a few cycles behind
const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [analysis, setAnalysis] = useState(entry.analysis);
  const [isLoading, setIsLoading] = useState(false);

  const { mood, summary, color, subject, negative } = analysis;
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative Emotions', value: negative ? 'Yes' : 'No' },
  ];

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const data = await updateEntry(entry.id, _value);
      setAnalysis(data.analysis);
      setIsLoading(false);
    },
  });

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
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
            Content auto saves every 2 seconds after user interaction
          </div>
        </div>

        <textarea
          className="w-full h-full p-8 text-xl outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="border-l border-black/10 col-span-1">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
