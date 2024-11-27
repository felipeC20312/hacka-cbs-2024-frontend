import { useEffect, useState } from 'react';

import mock from '../utils/data/data.json';
import CustomInsigth from '@/components/CustomInsigth';

interface DataSet {
  label: string;
  data: number[];
}

interface GraphData {
  labels: string[];
  datasets: DataSet[];
}

interface WeatherForecast {
  analysis_type: string;
  graph_data: GraphData;
  insights: string;
}

const HomePage = () => {
  const [data, setData] = useState<WeatherForecast[]>();

  const getData = () => {
    setData(mock);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='flex flex-col w-dvw h-dvh items-center justify-center border-red-500 border-2'>
      <div className='flex flex-col min-w-[350px] min-h-[450px] p-4 border-orange-500 border-2 rounded-[20px]'>
        {data?.map((item) => {
          return (
            <div key={item.analysis_type} className='flex flex-col'>
              {item.analysis_type}
              <CustomInsigth graphData={item.graph_data} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
