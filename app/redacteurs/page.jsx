import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

async function getHggsp_redacteurs() {
    return directus.request(
        readItems('hggsp_redacteurs', {
            fields: ['slug', 'name', 'description','sign_in_date','role', {image: ['id', 'description']}],
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
    const hggsp_redacteurs = await getHggsp_redacteurs();
    return (
        <section className='py-8 md:py-12 fade-in'>
            <div className="mx-auto max-w-5xl">
                <h1 className="text-5xl  text-gray-800 ">
                    <span>Rédacteurs</span>
                </h1>
                <p className='pt-4'>
                Description de la page rédacteurs, histoire, pourquoi, comment, dans quel but...
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {hggsp_redacteurs.map((hggsp_redacteur) => (
                        <li key={hggsp_redacteur.slug} className="border bg-accent/30 rounded-lg border-gray-200 p-4 hover:bg-accent/75 transition-all">
                            <div  className="flex flex-col justify-between h-full">
                                <div className='mb-auto'>
                                    <div className='h-48 w-full overflow-hidden relative rounded-md border flex items-center justify-center'>
                                        <img className='w-full object-cover' src={`https://dir3.databeam.eu/assets/${hggsp_redacteur.image.id}`} alt='Image décrivant le rédacteur' width={400} height={200} /> 
                                    </div>
                                    <h2 className="text-xl pt-4 font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200">
                                        <a href={`/redacteurs/${hggsp_redacteur.slug}`}>{hggsp_redacteur.name}</a>
                                    </h2>
                                    <p className="pt-4 text-sm text-slate-600 leading-4 ">
                                        {truncateText(hggsp_redacteur.description, 12)}
                                    </p>   
                                </div>
                                <div className=' mt-auto pt-4'>
                                    <hr/>
                                    <div className='grid grid-flow-col '>
                                        <div className="text-start text-gray-500 text-sm mt-2">
                                            {hggsp_redacteur.role}
                                        </div>
                                        <div className="text-end text-gray-500 text-sm mt-2">
                                            {new Date(hggsp_redacteur.sign_in_date).toLocaleDateString()}
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
