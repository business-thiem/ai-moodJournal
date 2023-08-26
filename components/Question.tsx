'use client';

import { useState } from 'react';

const Question = () => {
  const [value, setValue] = useState('');
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-1">
        <input
          onChange={onChange}
          value={value}
          type="text"
          placeholder="Ask a question"
          className="w-1/2 border border-black/20 px-4 py-2 text-lg rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-400 px-4 py-2 text-lg rounded-lg"
        >
          Ask
        </button>
      </form>
    </div>
  );
};

export default Question;
