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

interface DataSet {
  label: string;
  data: number[];
}

interface GraphData {
  labels: string[];
  datasets: DataSet[];
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
      graphData.datasets.forEach((dataset) => {
        dataPoint[dataset.label] = dataset.data[index];
      });
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
              <div>Analise hidrica</div>
              <div className='h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray='1 1' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {insight.graph_data.datasets.map((dataset) => (
                      <Line
                        key={dataset.label}
                        type='monotone'
                        dataKey={dataset.label}
                        stroke='#3f75ff'
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>Tendencida de aumento de custo hidrico</div>
              <div />
              <div>
                <div></div>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Commodi et, accusantium nam debitis natus porro praesentium?
                  Voluptatem dolor a sapiente reprehenderit accusamus culpa? Id
                  nesciunt at, eaque tempora modi maiores?
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
