'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useFetch } from "@/helper/customHook/useFetch";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  const fetch = useFetch()
  useLayoutEffect(() => {
    fetch.get(`/menu_items`).then(menuItems => {
      setBestSellers(menuItems.slice(-3));  
    });
  }, [fetch]);
  return (
    bestSellers &&
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={'/sallad1.png'} width={109} height={189} alt={'sallad'} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={'/sallad2.png'} width={107} height={195} alt={'sallad'} />
        </div>
      </div>
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={'check out'}
          mainHeader={'Our Best Sellers'} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers?.length > 0 && bestSellers.map(item => (
          <>
            <MenuItem key={item._id} {...item} />
          </>
        ))}
      </div>
    </section>
  );
}