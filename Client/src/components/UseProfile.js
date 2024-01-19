import { useFetch } from "@/helper/customHook/useFetch";
import { useEffect, useState } from "react";

export function useProfile() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const fetch = useFetch()
  useEffect(() => {
    setLoading(true);
    // fetch('/api/profile').then(response => {
    //   response.json().then(data => {
    //     setData(data);
    //     setLoading(false);
    //   });
    // })

    fetch.get('/user').then((res) => {
      console.log(res);
      if (res) {
        setData(res);
        setLoading(false);
      }
    })
  }, []);

  return { loading, data };
}