import CallList from '@/components/CallList'
import React from 'react'

type Props = {}

const upcoming = (props: Props) => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="gtext-3xl font-bold">Upcoming</h1>
      <CallList type="upcoming"/>
    </section>
  )
}

export default upcoming