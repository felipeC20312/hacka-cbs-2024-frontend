import { images } from '@/assets/utils/getImgs';
import Dashboard from '@/components/Dashboard/Dashboard';
import { useEffect, useState } from 'react';
// import mock from '../utils/data/data.json'
import { api } from '@/core/api';

interface DataSet {
  label: string;
  data: number[];
}

interface GraphData {
  labels: string[];
  datasets: DataSet;
}

interface AnalysisData {
  analysis_type: string;
  graph_data: GraphData;
  insight_tip: string;
}

interface WeatherForecast {
  business_name: string;
  business_type: string;
  insights: AnalysisData[];
}

const HomePage = () => {
  const [data, setData] = useState<WeatherForecast | null>(null);
  const [isLoading, setLoading] = useState<boolean>();

  // const getData = () => {
  //   setData(mock);
  // };

  const getData = async () => {
    setLoading(true);
    try {
      const formRequest = localStorage.getItem('formData');
      // const formRequest = {
      //   analysis_type: [
      //     'Tendência do Custo Hídrico',
      //     'Eficiência Energética Solar',
      //     'Tendência de Risco Climático para Infraestruturas',
      //     'Previsão da Qualidade do Ar',
      //   ],
      //   business_name: 'Teste LTDA',
      //   business_type: 'têxtil',
      //   location: {
      //     latitude: -14.819536302850208,
      //     longitude: -57.457759772352226,
      //   },
      //   main_problems:
      //     'Escassez hídrica em períodos críticos e altos custos de energia elétrica.',
      //   search_objective:
      //     'Reduzir custos operacionais relacionados ao consumo de água e energia.',
      // };
      const response = await api.post(
        '/process_weather_forecasting',
        formRequest
      );
      setData(response.data);
    } catch (error) {
      console.log('ERROR:', error);
    } finally {
      setLoading(false);
      generateInstagramPost();
    }
  };

  const generateInstagramPost = async () => {
    await api.post('/generate_social_media_insigth', data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='flex flex-col p-3 mobile:p-0 w-dvw min-h-dvh items-center justify-center bg-background'>
      {isLoading ? (
        <div className='flex justify-center items-center'>Loading</div>
      ) : (
        <div className='bg-background-form rounded-[20px] mobile:rounded-none overflow-hidden max-w-[660px] w-full min-w-[350px]'>
          <div
            className='flex flex-col justify-center items-center box-border bg-main w-full h-[145px] p-4 rounded-b-[20px]'
            style={{
              backgroundImage: `url(${images.img_background_decor})`,
              backgroundRepeat: 'norepeat',
              backgroundPosition: 'top',
              backgroundSize: 'fill',
            }}>
            <div className='flex w-full h-[60px] rounded-full items-center bg-white text-text-main text-[30px] font-light gap-4 p-2 box-border'>
              <div className='left-2 flex w-12 h-12 bg-main rounded-full justify-center items-center'>
                <img className='w-8 h-8' src={images.img_logo_base} alt='' />
              </div>
              <div className='flex flex-col'>
                <p className='font-normal text-[12px]'>Meu Dashboard</p>
                <p className='font-semibold text-[14px]'>
                  {data?.business_name}
                </p>
              </div>
            </div>
          </div>
          {data ? <Dashboard insights={data.insights} title={''} /> : null}
        </div>
      )}
    </div>
  );
};

export default HomePage;
