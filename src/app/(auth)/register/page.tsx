'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { handleRegister } from '@/service/auth'
import { createUser } from '@/service/user'
import Link from 'next/link'

type formType = {
  username: string
  email: string
  password: string
  confirm: string
}

// prettier-ignore
const RegisterSchema = z.object({
    username: z.string({ required_error: 'username is required' }).min(1),
    email: z.string({ required_error: 'email is required' }).email(),
    password: z.string({ required_error: 'password is required' }).min(8),
    confirm: z.string({ required_error: 'confirm password is required' }).min(8),
  })
  .refine((data) => data.password === data.confirm, {
    message: "password doesn't match",
    path: ['confirm'],
  })

export default function Page() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirm: '',
    },
  })

  const onSubmit: SubmitHandler<formType> = async (data) => {
    try {
      const { id } = await handleRegister(data.email, data.password)
      const user = await createUser(id, data.email, data.username)
      if (user) {
        router.push('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1 className='text-lg text-center text-white'>Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mt-4 flex flex-col gap-4'
      >
        <div className='relative h-fit'>
          <label className='block text-sm text-white/80 capitalize'>
            username
          </label>
          <input
            className='w-full mt-0.5 rounded py-2 px-2.5 bg-[#33333e] outline-none text-white'
            {...register('username')}
          />
          {errors.username && (
            <p className='absolute text-xs text-red-500 -bottom-5'>
              {errors.username.message}
            </p>
          )}
        </div>
        <div className='relative h-fit mt-2.5'>
          <label className='block text-sm text-white/80 capitalize'>
            email
          </label>
          <input
            className='w-full mt-0.5 rounded py-2 px-2.5 bg-[#33333e] outline-none text-white'
            {...register('email')}
          />
          {errors.email && (
            <p className='absolute text-xs text-red-500 -bottom-5'>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className='relative h-fit mt-2.5'>
          <label className='block text-sm text-white/80 capitalize'>
            password
          </label>
          <input
            className='w-full mt-0.5 rounded py-2 px-2.5 bg-[#33333e] outline-none text-white'
            {...register('password')}
          />
          {errors.password && (
            <p className='absolute text-xs text-red-500 -bottom-5'>
              {errors.password.message}
            </p>
          )}
        </div>
        <div className='relative h-fit mt-2.5'>
          <label className='block text-sm text-white/80 capitalize'>
            confirm password
          </label>
          <input
            className='w-full mt-0.5 rounded py-2 px-2.5 bg-[#33333e] outline-none text-white'
            {...register('confirm')}
          />
          {errors.confirm && (
            <p className='absolute text-xs text-red-500 -bottom-5'>
              {errors.confirm.message}
            </p>
          )}
        </div>
        <button
          type='submit'
          className='mt-8 w-full py-2.5 rounded bg-red-600 text-white'
        >
          Register
        </button>
      </form>
      <p className='mt-8 text-center text-white text-sm'>
        Already have an account?{' '}
        <Link href='/login' className='text-red-500'>
          Login
        </Link>
      </p>
    </>
  )
}
