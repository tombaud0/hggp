import directus from '@/lib/directus';
import { readItem } from '@directus/sdk';
import { notFound } from 'next/navigation';
import { CalendarIcon } from "lucide-react"
import parse, { domToReact } from 'html-react-parser';
import CTA from '@/components/cta_footer';

import Image from 'next/image';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

async function getHggsp_veterans(slug) {
    try {
        const hggsp_veteran = await directus.request(
            readItem('hggsp_veterans', slug, {
                fields: ['*', { image: ['id', 'description'], redacteur: ['name', 'description','sign_in_date', {image: ['id']}]} ],
            })
        );
        
        return hggsp_veteran;
    } catch (error) {
        console.error('Error fetching HGGSP veterans:', error);
        notFound();
    }
}


export default async function DynamicPage({ params }) {
    const { slug } = await params; // Attendez `params` avant de déstructurer `slug`
    const hggsp_veteran = await getHggsp_veterans(slug);
    
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
            return <img className="w-full rounded-lg bg-primary" alt='Blog Photo'>{domToReact(node.children)}</img>;
        }
        if (node.type === 'tag' && node.name === 'video') {
            return <video className="w-full rounded-lg bg-primary">{domToReact(node.children)}</video>;
        }
        if (node.type === 'tag' && node.name === 'iframe') {
            return <iframe className="w-full rounded-lg bg-primary">{domToReact(node.children)}</iframe>;
        }
        if (node.type === 'tag' && node.name === 'pre') {
            return <pre className="w-full rounded-lg block p-2 border">{domToReact(node.children)}</pre>;
        }
        
        return node;
    };

    return (
        <section className='py-8 md:py-12 fade-in'>
            <div className=" mx-auto max-w-5xl  ">
                <h1 className="text-5xl  text-gray-800 mb-6 "><span>{hggsp_veteran.name}</span></h1>
                
            
                <div className='flex justify-between items-center gap-4 text-sm mb-4 '>
                    <h5 className='text-slate-600 font-normal'>Publié le {hggsp_veteran.publish_date} par 
                    <span>
                        <a>
                           <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant="link" className='p-0 ps-1'> @{hggsp_veteran.redacteur.name}</Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                                <div className="flex justify-between space-x-4">
                                <Avatar>
                                    <AvatarImage src={`https://dir3.databeam.eu/assets/${hggsp_veteran.redacteur.image.id}`} />
                                    <AvatarFallback>VC</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">@{hggsp_veteran.redacteur.name}</h4>
                                    <p className="text-sm">
                                    {hggsp_veteran.redacteur.description}
                                    </p>
                                    <div className="flex items-center pt-2">
                                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                                    <span className="text-xs text-muted-foreground">
                                        Rejoins le {hggsp_veteran.redacteur.sign_in_date}
                                    </span>
                                    </div>
                                </div>
                                </div>
                            </HoverCardContent>
                            </HoverCard>   
                        </a>
                        
                    </span> 
                    
                    </h5>
                    
                      
                    <a className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground not-prose'>{hggsp_veteran.tag}</a>
                    
                </div>
                
                
                <div className='h-96 my-12 md:h-[560px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25'  >
                    <Image className='w-full' src={`https://dir3.databeam.eu/assets/${hggsp_veteran.image.id}`} alt='Images des vétérans' width={1100} height={400} /> 
                </div>
                <div className='text-lg w-full '>{parse(hggsp_veteran.article, { replace: transform })}</div>
                <CTA/>
                
                
                
            </div>
        </section>
    );

    
    
}

