import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-lg mx-auto space-y-4">
        <h1 className="text-6xl">How are you feeling today?</h1>
        <p className="text-2xl text-white/60">a.i. powered journaling app</p>
        <div>
          <Link href="/journal">
            <button className="bg-blue-600 px-4 py-3 rounded-lg text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
