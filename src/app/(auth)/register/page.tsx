'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { handleRegister } from '@/service/auth'
import { createUser } from '@/service/user'

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
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>username</label>
          <input {...register('username')} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label>email</label>
          <input {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>password</label>
          <input {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label>confirm password</label>
          <input {...register('confirm')} />
        </div>
        <button className='mt-2' type='submit'>
          {errors.confirm && <p>{errors.confirm.message}</p>}
          Register
        </button>
      </form>
    </div>
  )
}
