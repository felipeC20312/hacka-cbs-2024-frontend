import { helix } from 'ldrs';
import { toast } from 'sonner';
import { api } from '@/core/api';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { images } from '@/assets/utils/getImgs';
import { Button } from '@/components/ui/button';
import CustomCard from '@/components/CustomCard';
import dataJson from '@/utils/data/gynData.json';
import { formatDateRange } from '@/utils/functions';
import CustomButton from '@/components/CustomButton';
import CustomSlider from '@/components/CustomSlider/CustomSlider';
import CustomIconsLucid, { toPascalCase } from '@/components/CustomIconsLucid';

helix.register();

interface Tips {
  title: string;
  icon: string;
  description: string;
}

interface Day {
  icon: string;
  data: string;
  status: string;
  duracao: string;
  dicks: Tips[];
}

interface AgriculturaPrevisao {
  state: string;
  plantation: string | undefined;
  days: Day[];
}

const HomePage = () => {
  const { t } = useTranslation();

  const [data, setData] = useState<AgriculturaPrevisao | undefined>(undefined);
  const [diaEspecifico, setDiaEspecifico] = useState<Day | undefined>(
    undefined
  );
  const [focusDay, setFocusDay] = useState<string>('');

  const getData = () => {
    setData(dataJson);
  };

  const [loading, setLoading] = useState<boolean>(false); // Estado para controle de carregamento

  // const getData = async () => {
  //   setLoading(true);
  //   try {
  //     const formRequest = localStorage.getItem('formData');
  //     const response = await api.post(
  //       '/process_agricultural_forecasting',
  //       formRequest
  //     );
  //     setData(response.data);
  //   } catch (error) {
  //     console.log('ERROR:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRedirect = () => {
    window.open(
      'https://demonasa-10cafe.streamlit.app/',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const callInfoToast = () => {
    toast.success(
      <div className='relative flex flex-col rounded-[25px] p-3 gap-3 bg-[#282828] border-2 border-[#333333]'>
        <button
          className='absolute right-4 top-4'
          onClick={() => toast.dismiss()}>
          <CustomIconsLucid iconName='X' color='#DCF730' />
        </button>
        <p className='text-[20px] text-center text-white font-semibold'>
          {t('toastMensage.title')}
        </p>
        <p className='text-[18px] text-center text-white'>
          {t('toastMensage.text')}
        </p>
        <button
          onClick={handleRedirect}
          className='p-3 rounded-[15px] text-[18px] text-[#282828] font-normal shadow-[0_0_15px_5px_rgba(220,247,48,0.5)] hover:shadow-[0_0_25px_10px_rgba(220,247,48,0.8)] bg-gradient-to-r from-[#DCF730] via-[#b8e600] to-[#DCF730]'>
          {t('toastMensage.button')}
        </button>
      </div>,
      {
        unstyled: true,
        duration: Infinity, // Toast permanecerá até que o usuário interaja
      }
    );
  };

  useEffect(() => {
    callInfoToast();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      const day = data.days.find((day) => day.data === focusDay);
      setDiaEspecifico(day);
    }
  }, [focusDay, data]);

  return (
    <div className='flex flex-col min-h-dvh max-h-fit box-border p-3 items-center bg-[#1F1F1F]'>
      {loading ? (
        <div className='flex flex-col w-full min-h-dvh items-center justify-center gap-8'>
          <l-helix size='120' speed='2.5' color='#DCF730'></l-helix>
          <div>
            <p className='text-[14px] font-light text-white'>
              Generating AI Insigths
            </p>
          </div>
        </div>
      ) : (
        <>
          <img
            src={images.img_event_cloudy}
            alt={t('imagesAltText.eventImg')}
            className='absolute z-[0] top-0 left-0 w-full h-auto object-cover opacity-[28%]'
          />
          <div className='absolute w-full h-[130px] top-[170px] bg-gradient-to-b from-transparent to-[#1f1f1f]'></div>
          <div className='flex w-full z-[1] box-border gap-3 mt-[30px]'>
            <img src={images.img_logo} alt={t('imagesAltText.orusLogo')} />
            <div className='flex w-full h-fit pl-[40px] py-[10px] bg-[#00000020] border-2 border-[#282828] rounded-full'>
              <div className='flex w-full justify-between pr-3'>
                <div>
                  <p className='text-[20px] text-[#A5A5A5]'>Orus AI</p>
                  <p className='text-[24px] text-white'>
                    {/* {toPascalCase(data?.plantation)} */}
                    Insigths
                  </p>
                </div>
                <div className='flex w-[70px] h-[70px] shrink-0 items-center justify-center rounded-full bg-[#242424] border-2 border-[#333333]'>
                  <button onClick={() => callInfoToast()}>
                    <CustomIconsLucid
                      iconName='Info'
                      size={24}
                      color={'#DCF730'}
                    />
                  </button>
                </div>
              </div>
              <CustomButton label='' width='[62px]' bgColor='#282828' />
            </div>
          </div>
          <div className='flex w-full h-fit mt-[170px] text-white'>
            <CustomSlider setFocusDay={setFocusDay} data={data?.days} />
          </div>
          <div className='flex flex-col'>
            <p className='mt-[24px] text-[#A5A5A5] text-[24px] text-center font-normal'>
              {diaEspecifico?.status}
            </p>
            <p className='text-[35px] text-white text-center font-light'>
              {/* {formatDateRange(diaEspecifico?.duracao)} */}
              {diaEspecifico?.duracao}
            </p>
          </div>
          <p className='text-white text-[36px] font-medium'>{t('')}</p>

          <div className='flex flex-col w-full mt-[40px] gap-[16px] text-white'>
            {diaEspecifico ? (
              diaEspecifico.dicks.map((tips) => {
                return (
                  <>
                    <CustomCard
                      key={tips.title + tips.icon}
                      icon={
                        <CustomIconsLucid
                          iconName={tips.icon}
                          color='#DCF730'
                        />
                      }
                      title={tips.title}
                      description={tips.description}
                    />
                  </>
                );
              })
            ) : (
              <p>No tips for the day.</p>
            )}
          </div>

          <div className='flex w-full min-h-[95px] mt-[16px] p-[12px] gap-[12px] bg-[#282828] rounded-[28px] text-white'>
            <div className='flex flex-col gap-[20px]'>
              <div className='flex gap-4 w-full justify-start items-center'>
                <div className='flex justify-center items-center w-fit h-fit p-[5px] border-2 border-[#333333] rounded-full'>
                  <img
                    src={images.img_logo}
                    alt={t('imagesAltText.orusLogo')}
                    className='w-[30px] h-[30px]'
                  />
                </div>
                <div>
                  <p className='text-[14px] font-light text-lime-300'>
                    AI Generated Curiosity
                  </p>
                  <p className='text-[18px]'>{t('brand.nameAlt')}</p>
                </div>
              </div>
              <div className='flex flex-col gap-2 text-[#A5A5A5]'>
                <p>
                  Prepare for Extreme Weather Events: With changing climate
                  patterns, extreme events like droughts, heavy rains, and
                  heatwaves are becoming more frequent and unpredictable. To
                  protect your crops, stay updated with Orus. We use climate
                  monitoring tools that can help you anticipate these events.
                  This way, you can adjust irrigation, planting, and even
                  harvesting schedules to better safeguard your production.
                </p>
                <p>
                  Optimize Water Use with Technology: With increasingly
                  unpredictable rainfall, it’s crucial to make the most of the
                  water you have. Investing in efficient irrigation systems,
                  like drip irrigation, and soil moisture sensors can make a big
                  difference. These technologies deliver the exact amount of
                  water your crops need, helping you avoid both waste and water
                  stress, and keeping your plants healthier.
                </p>
                <p>
                  Choose Resilient Plant Varieties: There are now seeds
                  specially developed to withstand harsher conditions like
                  intense heat and drought. Using these climate-resilient
                  varieties can help your crops thrive in challenging
                  conditions, maintaining productivity even when the weather is
                  tough. Talk to suppliers and look into these stronger
                  varieties to support a sustainable and profitable production.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
