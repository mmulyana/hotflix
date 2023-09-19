'use client'

import { handleRegister } from '@/service/auth'
import { createUser } from '@/service/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

type formType = {
  email: string
  password: string
}

const LoginSchema = z.object({
  email: z.string({ required_error: 'email is required' }).email(),
  password: z.string({ required_error: 'password is required' }).min(8),
})

export default function page() {
  const { register, handleSubmit, formState: { errors } } = useForm<formType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<formType> = async (data) => {
    try {
      const { id } = await handleRegister(data.email, data.password)
      const user = await createUser(id, data.email, data.email)
      if (user) {
        // dispatch to store
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
