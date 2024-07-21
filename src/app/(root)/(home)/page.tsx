'use client';

import MeetingTypeList from '@/components/MeetingTypeList';
import { useEffect, useState } from 'react';

const Home = () => {

  const now = new Date();
  const [time, setTime] = useState(now);

  const date = (new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(now));

  useEffect(() => {
    const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);
    
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
    <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
      <div className='flex flex-col gap-2'>
        <h1 className='text-4xl font-extrabold lg:text-7xl'>
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'})}
        </h1>
        <p>
          {date}
        </p>
      </div>
    </div>
      </div>
    
    <MeetingTypeList/>
    </section>
  )
}

export default Home