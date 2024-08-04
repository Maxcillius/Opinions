import Image from 'next/image'

export default function Post({title, content, image}: {title: string, content: string, image: string}) {
    return (
        <div className='flex flex-row justify-center max-h-fit'>
            <div className="flex flex-col justify-center bg-blue-100 rounded-lg w-96">
                <div className='flex flex-col justify-center m-4'>
                        <Image src={image} alt='image' className='object-fill' width={500} height={500}></Image>
                        <h3 className="text-center text-2xl font-bold text-[#03045e] p-2">{title}</h3>
                        <p className="text-center p-2">{content}</p>
                </div>
            </div>
        </div>
    )
}