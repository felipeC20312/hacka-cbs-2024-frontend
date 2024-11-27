import { images } from '@/assets/utils/getImgs';
import CustomForm from '@/components/CustomForm';
import { useTranslation } from 'react-i18next';

const FirstPage = () => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col p-3 w-dvw min-h-dvh items-center bg-[#1F1F1F]'>
      <div className='flex w-full my-[50px] gap-4 items-center justify-center text-white text-[31px]'>
        <img src={images.img_logo} alt='' />
        <p>{t('brand.name')}</p>
      </div>
      <div className='self-start w-[60%] text-white text-[35px] font-medium'>
        <p>{t('firstPage.title')}</p>
      </div>
      <div className='flex flex-col w-full self-start mt-10 gap-[16px] text-white text-[20px] text-left font-normal'>
        <p>{t('firstPage.subtitle')}</p>
        <CustomForm />
      </div>
    </div>
  );
};

export default FirstPage;
