'use client';
import { CartContext } from "@/components/AppContext";
import Bars2 from "@/components/icons/Bars2";
import ShoppingCart from "@/components/icons/ShoppingCart";
// import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

function AuthLinks({ isLoading, userName ,setUserName}) {
  const router = useRouter()
  const logoutClickHandler = () => {
    localStorage.removeItem('user');
    setUserName(null)
    router.push('/login')
  }

  return (
    isLoading ? (
      "Loading"
    ) :
      userName ?
        <>
          <div className="text-center">
            <Link href={'/profile'} className="whitespace-nowrap">
              Hello, <br />{userName}
            </Link>
          </div>
          <button
            onClick={logoutClickHandler}
            className="bg-primary rounded-full text-white px-8 py-2">
            Logout
          </button>
        </>
        :
        <>
          <Link href={'/login'}>Login</Link>
          <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
            Register
          </Link>
        </>
  )
}

export default function Header() {
  // const session = useSession();
  // const status = session?.status;
  // const userData = session.data?.user;
  // let userName = userData?.name || userData?.email;
  let { cartProducts, userName , setUserName } = useContext(CartContext);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (userName !== undefined) {
      setLoading(false)
    }
  }, [userName, loading])
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // const logoutClickHandler = () => {
  //   signOut();
  //   router.push('/login')
  // }
  return (
    <header>
      <div className="flex items-center md:hidden justify-between">
        <Link className="text-primary font-semibold text-2xl" href={'/'}>
          SK PIZZA
        </Link>
        <div className="flex gap-8 items-center">
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className="p-1 border"
            onClick={() => setMobileNavOpen(prev => !prev)}>
            <Bars2 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
          <AuthLinks isLoading={loading} userName={userName} setUserName={setUserName}/>
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href={'/'}>
            SK PIZZA
          </Link>
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
        </nav>
        <nav className="flex  items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks isLoading={loading} userName={userName} setUserName={setUserName} />

          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}