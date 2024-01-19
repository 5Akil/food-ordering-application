'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFetch } from "../../helper/customHook/useFetch"
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function UsersPage() {

  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();
  const fetch = useFetch()
  useEffect(() => {
    fetch.get('/user/list').then(users => {
      if (users.length != 0) setUsers(users);
    });
  }, []);

  if (loading) {
    return 'Loading user info...';
  }

  if (!data.isAdmin) {
    return 'Not an admin';
  }

  return (
    <section className="max-w-4xl mx-auto mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 ? users.map(user => (
          <div
            key={user._id}
            className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
              <div className="text-gray-900">
                {!!user.name && (<span>{user.name}</span>)}
                {!user.name && (<span className="italic">No name</span>)}
              </div>
              <span className="text-gray-500">{user.email}</span>
            </div>
            <div>
              <Link className="button" href={'/users/' + user._id}>
                Edit
              </Link>
            </div>
          </div>
        )) :
          <>
            <section className="mt-8 text-center">
              <SectionHeaders mainHeader="Users" />
              <p className="mt-4">There is no any registered users 😔</p>
            </section>
          </>

        }
      </div>
    </section>
  );
}