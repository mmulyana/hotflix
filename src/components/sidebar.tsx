import { BookmarkIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className='w-16 h-full fixed top-0 -left-20 lg:left-0 bg-[#1c1c25] z-20'>
      <div className='flex flex-col gap-6 h-full justify-center pl-4 sidebar-wrapper'>
        <div className='sidebar-item'>
          <StarIcon className='w-5 h-5 sidebar-icon'/>
          <Link href='/profile/favorite' className='sidebar-link'>Favorite</Link>
        </div>
        <div className='sidebar-item'>
          <BookmarkIcon className='w-5 h-5 sidebar-icon'/>
          <Link href='/profile/wishlist' className='sidebar-link'>Wishlist</Link>
        </div>
        <div className='sidebar-item'>
          <ClockIcon className='w-5 h-5 sidebar-icon'/>
          <Link href='/profile/wishlist' className='sidebar-link'>History watch</Link>
        </div>
      </div>
    </div>
  )
}
