'use client'
import MultiverseScene from '../components/MultiverseScene';
import { projectData } from '../lib/projectData';

console.log('hereeeeeeeee',projectData);
export default function Home() {
  return (
    <main className="w-full">      
      <header className="h-16 flex items-center justify-center bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">My Multiverse Portfolio</h1>
      </header>

      <section id="about" className="py-20 flex flex-col items-center justify-center bg-gray-50 text-center">
        <h2 className="text-3xl font-semibold mb-4">Sobre</h2>
        <p className="max-w-2xl text-gray-700">
          Lorem ipsom 
        </p>
      </section>

      <section id="multiverse" className="py-20 flex flex-col items-center justify-center bg-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Knowledge tree</h2>
        <div className="border-2 border-gray-300 rounded-lg p-4">          
          <div className="w-[600px] h-[400px] flex items-center justify-center">
            <MultiverseScene data={projectData} />
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 flex flex-col items-center justify-center bg-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Habilidades</h2>
        <p className="max-w-2xl text-gray-700">
          skils here
        </p>
      </section>

      <section id="contact" className="py-20 flex flex-col items-center justify-center bg-gray-50 text-center">
        <h2 className="text-3xl font-semibold mb-4">Contato</h2>
        <p className="max-w-2xl text-gray-700">
          contact here
        </p>
      </section>

      <section id="blog" className="py-20 flex flex-col items-center justify-center bg-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Blog</h2>
        <p className="max-w-2xl text-gray-700">
          blog here
        </p>
      </section>
    </main>
  );
}
