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

type formType = {
  email: string
  password: string
}

const LoginSchema = z.object({
  email: z.string({ required_error: 'email is required' }).email(),
  password: z.string({ required_error: 'password is required' }).min(8),
})

export default function page() {
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
        router.replace('/profile')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button className='mt-2' type='submit'>
          Login
        </button>
      </form>
    </div>
  )
}
