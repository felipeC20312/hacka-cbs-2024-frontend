import CustomForm from '@/components/CustomForm/CustomForm';
import { images } from '@/assets/utils/getImgs';
import { useTranslation } from 'react-i18next';

const FirstPage = () => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col p-3 w-dvw min-h-dvh items-center justify-center bg-background'>
      <div className='bg-white rounded-[20px] overflow-hidden max-w-[660px] min-w-[350px]'>
        <div
          className='flex flex-col box-border bg-main h-[333px] p-4'
          style={{
            backgroundImage: `url(${images.img_background_decor})`, // Usando a variável de caminho da imagem
            backgroundRepeat: 'norepeat',
            backgroundPosition: 'top',
            backgroundSize: 'cover',
          }}>
          <div className='flex w-full gap-4 justify-center text-white text-[30px] font-light mt-[60px] mb-[40px]'>
            <div className='aspect-square w-[40px]'>
              <img src={images.img_logo_base} alt='' />
            </div>
            <p>{t('brand.name')}</p>
          </div>
          <div className='text-white text-[35px] self-start font-medium'>
            <p>{t('firstPage.title')}</p>
          </div>
        </div>
        <CustomForm />
      </div>
    </div>
  );
};

export default FirstPage;
