import directus from '@/lib/directus';
import { readItem } from '@directus/sdk';
import { notFound } from 'next/navigation';
import parse, { domToReact } from 'html-react-parser';
import Image from 'next/image';




async function getHggsp_redacteurs(slug) {
    try {
        const hggsp_redacteur = await directus.request(
            readItem('hggsp_redacteurs', slug, {
                fields: ['*', { image: ['id', 'description']}],
            })
        );
        
        return hggsp_redacteur;
    } catch (error) {
        console.error('Error fetching HGGSP redacteurs:', error);
        notFound();
    }
}


export default async function DynamicPage({ params }) {
    const { slug } = await params; // Attendez `params` avant de déstructurer `slug`
    const hggsp_redacteur = await getHggsp_redacteurs(slug);

    const transform = (node) => {
        if (node.type === 'tag' && node.name === 'h1') {
            return <h1 className="text-5xl  text-gray-800 mb-6">{domToReact(node.children)}</h1>;
        }
        if (node.type === 'tag' && node.name === 'h2') {
            return <h2 className="text-2xl font-semibold text-left mt-6 mb-3">{domToReact(node.children)}</h2>;
        }
        if (node.type === 'tag' && node.name === 'h3') {
            return <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">{domToReact(node.children)}</h3>;
        }
        if (node.type === 'tag' && node.name === 'p') {
            // Vérifier si le paragraphe contient une image
            const hasImage = node.children.some(child => child.type === 'tag' && child.name === 'img');

            if (hasImage) {
                // Style pour un paragraphe contenant une image
                return <div className='h-96 my-12 md:h-[560px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25'><p className="">{domToReact(node.children)}</p></div>;
            } else {
                // Style pour un paragraphe contenant uniquement du texte
                return <p className="leading-7 [&:not(:first-child)]:mt-6">{domToReact(node.children)}</p>;
            }
        }
        if (node.type === 'tag' && node.name === 'blockquote') {
            return <blockquote className="mt-6 border-l-2 pl-6 italic">{domToReact(node.children)}</blockquote>;
        }
        if (node.type === 'tag' && node.name === 'ol') {
            return <ol className="my-6 ml-6 list-disc [&>li]:mt-2">{domToReact(node.children)}</ol>;
        }
        if (node.type === 'tag' && node.name === 'ul') {
            return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{domToReact(node.children)}</ul>;
        }
        if (node.type === 'tag' && node.name === 'li') {
            return <li className="">{domToReact(node.children)}</li>;
        }
        if (node.type === 'tag' && node.name === 'a') {
            return <a className="font-medium text-primary underline underline-offset-4">{domToReact(node.children)}</a>;
        }
        if (node.type === 'tag' && node.name === 'img') {
            return <img className="w-full rounded-lg bg-primary" alt='redac photo'>{domToReact(node.children)}</img>;
        }
        
        return node;
    };
    

    return (
        <section className='py-8 md:py-12 fade-in'>
            <div className=" mx-auto max-w-5xl  ">
                <h1 className="text-5xl  text-gray-800 mb-6 "><span>{hggsp_redacteur.name}</span></h1>
                
            
                <div className='flex justify-between items-center gap-4 text-sm mb-4 '>
                    <h5 className='text-slate-600 font-normal'>Utilisateur créer le {hggsp_redacteur.sign_in_date}.
                    
                    </h5>
                    
                      
                    <a className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground not-prose'>{hggsp_redacteur.role}</a>
                    
                </div>
                
                
                <div className='h-96 my-12 md:h-[560px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25'  >
                    <Image className='w-full' src={`https://dir3.databeam.eu/assets/${hggsp_redacteur.image.id}`} alt='Image décrivant le rédacteur' width={1100} height={400}/> 
                </div>

                <div className='text-lg w-full lg:max-w-3xl'>{parse(hggsp_redacteur.article, { replace: transform })}</div>

                
                
            </div>
        </section>
    );

    
    
}

