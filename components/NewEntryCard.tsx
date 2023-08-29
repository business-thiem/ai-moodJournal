'use client';

import { createNewEntry } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NewEntryCard = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleOnClick = async () => {
    setLoading(true);
    const data = await createNewEntry();
    setLoading(false);
    router.push(`/journal/${data.id}`);
  };
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
      {loading && <div>creating your new entry...loading</div>}
      <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  );
};

export default NewEntryCard;
