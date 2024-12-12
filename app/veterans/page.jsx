import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Image from 'next/image';

async function getHggsp_veterans() {
    return directus.request(
        readItems('hggsp_veterans', {
            fields: ['slug', 'name', 'description','publish_date', {image: ['id', 'description']}, {redacteur: ['name']}],
            filter: {status: {_eq: "published",}}
        })
    );
}

function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
}

export default async function DynamicPage() {
    const hggsp_veterans = await getHggsp_veterans();
    return (
        <section className='py-8 md:py-12 fade-in'>
            <div className="mx-auto max-w-5xl">
                <h1 className="text-5xl  text-gray-800 ">
                    <span>Vétérans</span>
                </h1>
                <p className='pt-4'>
                    Description de la page vétérans, histoire, pourquoi, comment, dans quel but...
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {hggsp_veterans.map((hggsp_veteran) => (
                        <li key={hggsp_veteran.slug} className="border bg-accent/30 rounded-lg border-gray-200 p-4 hover:bg-accent/75 transition-all">
                            <div  className="flex flex-col justify-between h-full">
                                <div className='mb-auto'>
                                    <div className='h-48 w-full overflow-hidden relative rounded-md border flex items-center justify-center'>
                                        <Image className='w-full object-cover' src={`https://dir3.databeam.eu/assets/${hggsp_veteran.image.id}`} alt='Image du Vétéran' width={400} height={200} /> 
                                    </div>
                                    <h2 className="text-xl pt-4 font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200">
                                        <a href={`/veterans/${hggsp_veteran.slug}`}>{hggsp_veteran.name}</a>
                                    </h2>
                                    <p className="pt-4 text-sm text-slate-600 leading-4">
                                        {truncateText(hggsp_veteran.description, 12)}
                                    </p>   
                                </div>
                                <div className=' mt-auto pt-4'>
                                    <hr/>
                                    <div className='grid grid-flow-col '>
                                        <div className="text-start text-gray-500 text-sm mt-2">
                                            {hggsp_veteran.redacteur.name}
                                        </div>
                                        <div className="text-end text-gray-500 text-sm mt-2">
                                            {new Date(hggsp_veteran.publish_date).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            
                        </li>
                    ))}
                </ul>
            </div>
        </section>
        
    );
}
