import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

async function getContact() {
  return directus.request(readItems('contact', {
    fields: ['*', { image: ['id', 'description'], directeur: ['name' , 'slug','email', 'telephone', {image: ['id', 'description' ]}]  } ],
    }),
  );
}

export default async function ContactPage() {
  const contact = await getContact();
  return(
    
    <section className='py-8 md:py-12 fade-in '>

      <div className='align-items-center '>
        <h1 className='text-6xl md:text-6xl text-gray-800 '>{contact.titre}</h1>
        <p className='py-6'>{contact.description}</p>

        
        <div className='flex  space-x-4 mt-8  border bg-accent/30 rounded-lg border-gray-200 p-3 hover:bg-accent/75 transition-all'>
            <Avatar>
                <AvatarImage src={`https://dir3.databeam.eu/assets/${contact.directeur.image.id}`} />
                <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className='space-y-1'>
                <a href={`/redacteurs/${contact.directeur.slug}`}>
                    <h4 className="text-md font-semibold pb-1">{contact.directeur.name}</h4>
                </a>
                <div>Mail : 
                <a
                    href={`mailto:${contact.directeur.email}`}
                    className=" hover:underline hover:underline-offset-2 transition-all ps-1"
                >
                    {contact.directeur.email}
                </a> 
                </div>
                <div>Telephone : 
                  <a
                    href={`tel:${contact.directeur.telephone}`}
                    className=" hover:underline hover:underline-offset-2 transition-all ps-1"
                >
                     {contact.directeur.telephone}
                </a>
                </div>
                 
                
            </div>
           
        </div>
       
        
      </div>
      

    </section>
    
  );
}