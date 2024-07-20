'use client';

import React from 'react'
import Image from 'next/image'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from '@/components/MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { Description } from '@radix-ui/react-dialog';
import { link } from 'fs';
import { useToast } from "@/components/ui/use-toast"


const MeetingTypeList = () => {
    const { toast } = useToast()
    const router = useRouter();
    const [meetingState, setMeetingState] = React.useState<'isScheduledMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    
    const {user} = useUser();
    const client = useStreamVideoClient();

    const [values , setValues] = React.useState({
        dateTime: new Date(),
        description: '',
        link: '',
    })

    const [callDetails, setCallDetails] = React.useState<Call>();
    const createMeeting = async () => {
        if(!client || !user) return;

        try {

            if(!values.dateTime){
                toast({
                    title: "Please select a Date and Time",
                  })
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if(!call) throw new Error('Failed to create a call');
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    }
                }
            })

            setCallDetails(call);

            if(!values.description){
                router.push(`meeting/${call.id}`)
            }

            toast({
                title: "Creating Meeting...",
              })
        } catch (error) {
            console.error(error);
            toast({
                title: "Failed to create meeting",
              })
        }
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