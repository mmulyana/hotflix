import { ArrowTopRightOnSquareIcon, ArrowUpRightIcon, LinkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className='mt-8 pb-10'>
      <div className='container mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-[1fr_1fr_3fr] px-4'>
        <div className='text-white flex flex-col gap-2'>
          <p className='mb-3 font-medium'>About</p>
          <Link href='/help' className='text-sm opacity-20 hover:opacity-100'>
            Help center
          </Link>
          <Link
            href='/privacy'
            className='text-sm opacity-20 hover:opacity-100'
          >
            Privacy
          </Link>
        </div>
        <div className='text-white flex flex-col gap-2'>
          <p className='mb-3 font-medium'>Language</p>
          <Link href='#' className='text-sm opacity-20 hover:opacity-100'>
            English
          </Link>
          <Link href='#' className='text-sm opacity-20 hover:opacity-100'>
            Indonesia
          </Link>
        </div>
        <div className='mt-10 md:mt-0 flex justify-items-start md:justify-end col-span-2 md:col-span-1'>
          <div className='text-white flex flex-col gap-2'>
            <p className='mb-3 font-medium'>View Source Code</p>
            <Link href='#' className='text-sm opacity-20 hover:opacity-100 flex items-center gap-1'>
              <span>Github</span>
              <LinkIcon className='w-4 h-4 text-center'/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
