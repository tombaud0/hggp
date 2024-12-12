import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Image from 'next/image';
async function getHggsp_homepage() {
  return directus.request(readItems('hggsp_homepage', {
    fields: ['*', { image: ['id', 'description'] }],
    })
  );
}

export default async function HomePage() {
  const hggsp_homepage = await getHggsp_homepage();
  return(
    
    <section className='py-8 md:py-12 fade-in'>

      <div className='align-items-center'>
        <h1 className='text-6xl md:text-6xl text-gray-800'>{hggsp_homepage.titre}</h1>
        <p className='py-6'> {hggsp_homepage.description}</p>
      </div>
      <div className='h-100 w-full overflow-hidden relative rounded-md border flex items-center justify-center group'>
        <Image className='w-full object-cover transition duration-300 group-hover:brightness-75' src={'/home2.jpeg'} alt='image provisoire' width={1100} height={400} /> 
        <button className='absolute opacity-0 group-hover:opacity-100 transition duration-300 bg-black text-white px-4 py-2 rounded-lg shadow-md'>
          En savoir plus
        </button>
      </div>

    </section>
    
  );
}