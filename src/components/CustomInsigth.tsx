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

interface CustomInsigthProps {
  graphData: GraphData;
}

const CustomInsigth = ({ graphData }: CustomInsigthProps) => {
  // Preparando os dados para o gráfico (convertendo os dados para o formato que o Recharts espera)
  const chartData = graphData.labels.map((label, index) => {
    const dataPoint: any = { name: label };
    graphData.datasets.forEach((dataset) => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    return dataPoint;
  });

  return (
    <div className='border-orange-600 border-2 h-[300px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray='1 1' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          {graphData.datasets.map((dataset) => (
            <Line
              key={dataset.label}
              type='monotone'
              dataKey={dataset.label}
              stroke='#8884d8'
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomInsigth;
