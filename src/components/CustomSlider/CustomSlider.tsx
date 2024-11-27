import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import DayTag from '../DayTag';

import 'swiper/css';
import './CustomSlider.css';
import React, { SetStateAction, useEffect, useState } from 'react';

import dataJson from '@/utils/data/gynData.json';
import CustomIconsLucid from '../CustomIconsLucid';

interface Dica {
  title: string;
  icon: string;
  description: string;
}

interface Day {
  icon: string;
  data: string;
  status: string;
  duracao: string;
  dicks: Dica[];
}

interface CustomSliderProps {
  setFocusDay: React.Dispatch<React.SetStateAction<string>>;
  data: SetStateAction<Day[]> | Day[] | undefined;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ setFocusDay, data }) => {
  const [dayData, setDays] = useState<Day[]>([]);

  // const handleSetDays = () => {
  //   if (data) {
  //     setDays(data);
  //   }
  // };

  const handleSetDays = () => {
    setDays(dataJson.days);
  };

  const handleSlideChange = (index: number) => {
    const activeDay = dayData[index];
    if (activeDay) {
      setFocusDay(activeDay.data);
    }
  };

  useEffect(() => {
    handleSetDays();
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        loop={true}
        spaceBetween={16}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className='w-[100%] h-[100%]'
        onSlideChange={(swiper) => handleSlideChange(swiper.realIndex)}>
        {dayData &&
          dayData.map((dayItem, index) => (
            <SwiperSlide
              key={index}
              className='flex items-center justify-center'>
              {({ isActive }) => (
                <DayTag
                  day={dayItem.data}
                  icon={<CustomIconsLucid iconName={dayItem.icon} />}
                  activeFlag={isActive}
                />
              )}
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default CustomSlider;
