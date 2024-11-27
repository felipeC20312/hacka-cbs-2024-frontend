import { ReactElement } from 'react';

interface CustomCardProps {
  icon: ReactElement | string;
  title: string;
  description: string;
}

const CustomCard: React.FC<CustomCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className='flex w-full min-h-[95px] p-[12px] gap-[12px] bg-[#282828] rounded-[28px] text-white'>
      <div className='flex items-center justify-center shrink-0 w-[73px] aspect-square max-h-[73px] bg-[#242424] rounded-[22px] border-2 border-[#333333]'>
        {typeof icon === 'string' ? (
          <img className='size-8' src={icon.toString()}></img>
        ) : (
          icon
        )}
      </div>
      <div className='flex flex-col text-left'>
        <h2 className='text-[18px]'>{title}</h2>
        <h3 className='text-[14px] text-[#A9A9A9] font-light'>{description}</h3>
      </div>
    </div>
  );
};

export default CustomCard;
