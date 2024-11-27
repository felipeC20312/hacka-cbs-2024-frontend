import { useEffect, useState, ReactNode } from 'react';
import './DeviceVerifier.css';
import { images } from '@/assets/utils/getImgs';
import CustomIconsLucid from '../CustomIconsLucid';
import CustomCard from '../CustomCard';

interface DeviceVerifierProps {
  children: ReactNode;
}

const DeviceVerifier: React.FC<DeviceVerifierProps> = ({ children }) => {
  const [deviceType, setDeviceType] = useState<string>('');

  const checkDeviceType = () => {
    const windowSize = window.innerWidth;
    if (windowSize <= 475) {
      setDeviceType('Mobile');
    } else {
      setDeviceType('Desktop');
    }
  };

  useEffect(() => {
    checkDeviceType();

    window.addEventListener('resize', checkDeviceType);

    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  return (
    <>
      {deviceType === 'Desktop' ? (
        <div className='relative overflow-hidden flex flex-col w-screen h-screen box-border p-5 items-center justify-center gap-5 bg-[#1F1F1F]'>
          {/* Background animated shapes */}
          <div className='absolute top-[-600px] left-[-350px] w-[821px] aspect-square rounded-full bg-gradient-to-b from-[#00c3ff30] to-[#DCF730] blur-[50px] rotate-[175deg] rotating-moving-div'></div>
          <div className='absolute bottom-[-600px] right-[-200px] w-[821px] aspect-square rounded-full bg-gradient-to-b from-[#00c3ff30] to-[#DCF730] blur-[50px] rotate-[90deg] rotating-moving-div'></div>

          {/* Content */}
          <div className='flex flex-col z-[1] w-full max-w-[900px] px-4'>
            {/* Header */}
            <div className='flex w-full my-[80px] gap-4 items-center justify-center text-white text-[31px]'>
              <img
                src={images.img_logo}
                alt='Orus logo'
                className='w-[50px] h-auto'
              />
              <p>Orus</p>
            </div>

            {/* Main content */}
            <div className='flex flex-col items-center text-center'>
              {/* Title */}
              <div className='flex gap-2 text-[40px] font-medium'>
                <p className='text-white'>
                  Optimized for Mobile{' '}
                  <span className='text-[#DCF730]'>Devices</span>
                </p>
              </div>

              {/* Subtitle */}
              <div className='flex mb-[40px] w-full max-w-[540px]'>
                <p className='text-[20px] text-white'>
                  For the best experience, this page has been specially designed
                  to be accessed on smartphones.
                </p>
              </div>

              {/* Icon + Description */}
              <div className='flex items-center gap-2 mb-8'>
                <CustomIconsLucid
                  iconName='TabletSmartphone'
                  color='#DCF730'
                  size={18}
                />
                <p className='text-[23px] text-[#DCF730] font-thin'>
                  Available on mobile:
                </p>
              </div>

              {/* Custom Cards */}
              <div className='flex flex-col w-full max-w-[370px] gap-4'>
                <CustomCard
                  icon={<CustomIconsLucid iconName='Tornado' color='#DCF730' />}
                  title='Weather events'
                  description='Receive alerts about events that may impact your region and crops.'
                />
                <CustomCard
                  icon={<CustomIconsLucid iconName='Sprout' color='#DCF730' />}
                  title='Prevent crop losses'
                  description='Know exactly what to do to prevent losses in your crops.'
                />
                <CustomCard
                  icon={
                    <img
                      className='size-8'
                      src={images.img_logo}
                      alt='Orus AI logo'
                    />
                  }
                  title='AI-powered instructions'
                  description='Receive detailed instructions from our artificial intelligence.'
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default DeviceVerifier;
