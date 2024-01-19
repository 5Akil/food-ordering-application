'use client';
import { CartContext } from "@/components/AppContext";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useFetch } from "../../helper/customHook/useFetch"

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { data: session } = useSession()
  const router = useRouter();
  const { setUserName } = useContext(CartContext);
  const fetch = useFetch()

  // useEffect(() => {
  //   if (session?.user) {
  //     router.push("/");
  //   }
  // }, [session]);


  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const res = await fetch.post(`/auth/login`, { email, password });
    console.log(res, 'response');

    if (res) {
      setUserName(res.email)
      localStorage.setItem('user', JSON.stringify(res))
      router.push('/')
    } else {
      console.log(res?.error);
    }
    // const result = await signIn('credentials', { redirect: false, email, password });
    // if (res?.error) {
    // } else {
    // router.push('/')
    // }

  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Login
      </h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" name="email" placeholder="email" value={email}
          onChange={ev => setEmail(ev.target.value)} />
        <input type="password" name="password" placeholder="password" value={password}
          onChange={ev => setPassword(ev.target.value)} />
        <button type="submit">Login</button>
        {/* <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button type="button" onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex gap-4 justify-center">
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login with google
        </button> */}
      </form>
    </section>
  );
}