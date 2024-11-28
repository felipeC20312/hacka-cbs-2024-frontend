import { images } from '@/assets/utils/getImgs';
import Dashboard from '@/components/Dashboard/Dashboard';
import { useEffect, useState } from 'react';
import mock from '../utils/data/data.json';

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
  const [data, setData] = useState<WeatherForecast>();

  const getData = () => {
    setData(mock);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='flex flex-col p-3 w-dvw min-h-dvh items-center justify-center bg-background'>
      <div className='bg-white rounded-[20px] overflow-hidden max-w-[660px] w-full min-w-[350px]'>
        <div
          className='flex flex-col justify-center items-center box-border bg-main w-full h-[145px] p-4'
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
                Centro de pesquisa em...
              </p>
            </div>
          </div>
        </div>
        {data ? <Dashboard insights={data.insights} title={''} /> : null}
      </div>
    </div>
  );
};

export default HomePage;
