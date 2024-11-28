import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import CustomIconsLucid from '../CustomIconsLucid';

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

interface DashboardProps {
  insights: AnalysisData[];
  title: string;
}

const Dashboard: React.FC<DashboardProps> = ({ insights, title }) => {
  // Função para transformar os dados
  const transformGraphData = (graphData: GraphData) => {
    return graphData.labels.map((label, index) => {
      const dataPoint: Record<string, any> = { name: label };
      dataPoint[graphData.datasets.label] = graphData.datasets.data[index];
      return dataPoint;
    });
  };

  return (
    <div className='w-full h-200px p-4 bg-white'>
      {insights.map((insight, insightIndex) => {
        // Transformando os dados no formato necessário para o LineChart
        const chartData = transformGraphData(insight.graph_data);

        return (
          <div key={insightIndex} className='flex flex-col mb-4'>
            <div>{title}</div>
            <div className='border-border border-[1px] rounded-[16px] p-3 h-fit w-full'>
              <div className='flex mb-5 gap-2 items-center'>
                <div className='flex items-center justify-center rounded-full w-8 h-8 bg-second'>
                  <CustomIconsLucid
                    iconName='Waves'
                    color='#ffffff'
                    size={18}
                  />
                </div>
                <p className='font-medium text-2 text-[16px]'>
                  {insight.analysis_type}
                </p>
              </div>
              <div className='h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray='1 1' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Line
                      key={insight.graph_data.datasets.label}
                      type='monotone'
                      dataKey={insight.graph_data.datasets.label}
                      stroke='#3f75ff'
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className='flex border-[1px] border-border rounded-full w-full h-[40px] items-center box-border p-1 gap-2'>
                <div className='flex h-full aspect-square bg-icon-second items-center justify-center rounded-full'>
                  <CustomIconsLucid iconName='Info' color='#ffffff' size={18} />
                </div>
                {insight.graph_data.datasets.label}
              </div>
              <div className='border-b-[1px] my-4 border-border' />
              <div>
                <p className='text-[16px] font-medium mb-1'>@Copernico</p>
                <div className='flex gap-1 mb-2'>
                  <CustomIconsLucid
                    iconName='CalendarDays'
                    color='var(--color-text-second)'
                    size={20}
                  />
                  <div className='flex text-text-second'>
                    <p>Atualizado em</p>
                    {Date.now()}
                  </div>
                </div>
                <p>{insight.insight_tip}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
