import Link from 'next/link';
import { Button } from "@/components/ui/button"
import Image from 'next/image';

export default function Footer() {
  return (
    <section className='py-8 md:py-12 fade-in'>
       <div className='mx-auto max-w-5xl p-6 sm:p-8 grid md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-12'>
            <div className='flex flex-col gap-6 not-prose'>
              <Link href="/">
                <Image alt="Logo" loading="lazy" width={80} height={27.27} decoding="async" className="dark:invert hover:opacity-75 transition-all" src="/logo.jpg"/>
              </Link>

              <p className='inline-block'>
                <span className='text-inherit text-balance'>Début du Footer, il est a développer. + Changer le logo si besoin...</span>
              </p>
            </div>
            <div className='flex flex-col gap-2 text-sm'>
              <h5 className='font-medium text-base'>Le site</h5>
              <Link href="/" className='hover:underline underline-offset-4'>Apropos</Link>
              <Link href="/veterans" className='hover:underline underline-offset-4'>Vétérans</Link>
              <Link href="/redacteurs" className='hover:underline underline-offset-4'>Rédacteurs</Link>
            </div>
            <div className='flex flex-col gap-2 text-sm'>
              <h5 className='font-medium text-base'>Mes sites</h5>
              <a 
                className='hover:underline underline-offset-4' 
                href="https://tombaudry.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                tombaudry.com
              </a>
              <a 
                className='hover:underline underline-offset-4' 
                href="https://tombaudry.com/immobilier/fceecf35-a559-4186-ada7-3f151b4a6f58/data_immobilier" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                seinebnb.com
              </a>
              <a 
                className='hover:underline underline-offset-4' 
                href="https://tombaudry.com/services/43433532-566c-4473-ba51-de15fe660d4a/data_services/haras" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Haras National du Pin
              </a>
            </div>
        </div> 
        <div className='mx-auto max-w-5xl p-6 sm:p-8 border-t not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center'>
            <Link href="https://tombaudry.com" className='ps-4'><Button variant="outline">tombaudry.com</Button></Link>
            <p>© bdr. Tous droits réservés. 2024</p>
        </div>
    </section>
    
  );
}