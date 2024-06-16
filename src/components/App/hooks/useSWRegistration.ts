import {useRef, useEffect} from 'react'

const url = "./sw.js";

export const useSWRegistration = () => {
  const swManagerRef = useRef<ServiceWorkerRegistration | null>(null);

  useEffect( () => {

    if (swManagerRef.current) return;

    const registerSW = async () => {
      try {
        if (await navigator.serviceWorker?.getRegistration(url)){
          console.log('has registration');

          return;
        }

        swManagerRef.current = await navigator.serviceWorker.register(url, {
          type: "module",
          updateViaCache: "all",
          scope: "/",
        })
      } catch(e) {
        console.log({
          e
        });
      }

    };

    registerSW();
  }, []);
}
