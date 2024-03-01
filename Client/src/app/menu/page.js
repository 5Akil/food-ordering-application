'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useFetch } from "@/helper/customHook/useFetch";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const fetch = useFetch()
  const fetchCategories = async () => {
    const res = await fetch.get('/categories')
    if (res) {
      setCategories(res)
    }
  }
  const fetchMenuItems = async () => {
    const res = await fetch.get(`/menu_items`)
    if (res) {
      setMenuItems(res)
    }
  }
  useEffect(() => {
    fetchCategories()
    fetchMenuItems()
  }, [fetchCategories, fetchMenuItems]);
  return (
    <section className="mt-8">
      {categories?.length > 0 && categories.map(c => (
        <div key={c._id}>
          <div className="text-center">
            <SectionHeaders mainHeader={c.name} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
            {menuItems.filter(item => item.category === c._id).map(item => (
              <MenuItem key={item._id} {...item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}