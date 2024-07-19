'use client';

import React from 'react'
import Image from 'next/image'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from '@/components/MeetingModal';

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = React.useState<'isScheduledMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const createMeeting = () => {
        
    }
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        <HomeCard 
            img="/icons/add-meeting.svg"
            title="New Meeting"
            description="Start an instant meeting"
            handleClick={() => setMeetingState('isInstantMeeting')}
            className="bg-orange-1"
        />
        <HomeCard 
            img="/icons/schedule.svg"
            title="Schedule Meeting"
            description="Plan your meeting"
            handleClick={() => setMeetingState('isScheduledMeeting')}
            className="bg-blue-1"
        />
        <HomeCard 
            img="/icons/recordings.svg"
            title="View Recordings"
            description="Checkout your recordings"
            handleClick={() => router.push('/recordings')}
            className="bg-purple-1"
        />
        <HomeCard 
            img="/icons/join-meeting.svg"
            title="Join Meeting"
            description="Join an existing meeting"
            handleClick={() => setMeetingState('isJoiningMeeting')}
            className="bg-yellow-1"
        />

        <MeetingModal 
            isOpen={meetingState === 'isInstantMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Start an Instant Meeting"
            className="text-center"
            buttonText="Start Meeting"
            handleClick={createMeeting}
        />
    </section>
  )
}

export default MeetingTypeList