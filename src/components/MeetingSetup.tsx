import React, { useEffect } from 'react'
import { Button } from './ui/button' 
import {
    DeviceSettings,
    VideoPreview,
    useCall,
    useCallStateHooks,
  } from '@stream-io/video-react-sdk';

  
const MeetingSetup = () => {

    const [isMicCamEnabled, setIsMicCamEnabled] = React.useState(true)

    const call = useCall();

    if(!call){
        throw new Error('useCall must be used within a StremCall Component')
    }

    useEffect(() => {
        if(!isMicCamEnabled){
            call?.camera.disable();
            call?.microphone.disable();
        }
        else{
            call?.camera.enable();
            call?.microphone.enable();
        }
        
    } , [isMicCamEnabled, call?.camera , call?.microphone]);
  return ( 
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>Setup</h1>
        <VideoPreview />

        <div className='flex h-16 items-center justify-center gap-3'>
            <label className='flex items-center justify-center gap-2 font-medium'>
                <input
                    type='checkbox'
                    checked = {isMicCamEnabled}
                    onChange={(e) => setIsMicCamEnabled(e.target.checked)}

                />
                Join with Mic and Camera On
            </label>
        <DeviceSettings />
        </div>
        <Button className="rounded-md bg-green-500 px-4 py-2.5" onClick={() => {
            call?.join();
        }}>
            Join Meeting
        </Button>
    </div>
  )
}

export default MeetingSetup;