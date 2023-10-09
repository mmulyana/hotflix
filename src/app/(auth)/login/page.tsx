'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { setUser } from '@/redux/reducers/auth'
import { useAppDispatch } from '@/redux'
import { getUser } from '@/service/user'
import { User } from '@/model/auth'

import { handleLogin } from '@/service/auth'
import { toast } from 'react-toastify'
import Link from 'next/link'

type formType = {
  email: string
  password: string
}

const LoginSchema = z.object({
  email: z.string({ required_error: 'email is required' }).email(),
  password: z.string({ required_error: 'password is required' }).min(8),
})

export default function Page() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<formType> = async (data) => {
    try {
      const { id } = await handleLogin(data.email, data.password)
      const user = await getUser(id)
      if (user) {
        const payload: User = {
          uid: id,
          email: user.email,
          username: user.username,
        }
        dispatch(setUser(payload))
        router.replace('/profile?tab=favorite')
      }
    } catch (error) {
      toast.error('Email not found. Please check your email or sign up for a new account.')
    }
  }

  return (
    <>
      <h1 className='text-lg text-center text-white'>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-4 flex flex-col gap-4'>
        <div className='relative h-fit'>
          <label className='block text-sm text-white/80 capitalize'>email</label>
          <input className='w-full mt-0.5 rounded py-2 px-2.5 bg-[#33333e] outline-none text-white' {...register('email')} />
          {errors.email && <p className='absolute text-xs text-red-500 -bottom-5'>*{errors.email.message}</p>}
        </div>
        <div className='relative h-fit mt-2.5'>
          <label className='block text-sm text-white/80 capitalize'>password</label>
          <input className='w-full mt-0.5 rounded py-2 px-2.5 bg-[#33333e] outline-none text-white' {...register('password')} />
          {errors.password && <p className='absolute text-xs text-red-500 -bottom-5'>*{errors.password.message}</p>}
        </div>
        <button className='mt-8 w-full py-2.5 rounded bg-red-600 text-white' type='submit'>
          Login
        </button>
      </form>
      <p className='mt-8 text-center text-white text-sm'>Doesn&apos;t have an account? <Link href='/register' className='text-red-500'>Create an Account</Link></p>
    </>
  )
}
