import CardData from '@/components/CardData';
import { DataTable } from '@/components/DataTable';
import { ChartPie } from '@/components/PieCharts';
import Layout from '@/layout';
import React, { useEffect, useState } from 'react';
import useHome from '../../store';
import { detailColumn } from './components/column';
import { useNavigate } from '@/hooks/useNavigate';

const Detail = () => {
  const { dataWorklog, getWorklog, dataProjects, getProjects } = useHome();
  const { readSecureData } = useNavigate();
  const data = readSecureData('detail');

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await getWorklog({
      user_id: data?.id,
    });
    await getProjects({
      user_id: data?.id,
      type: 'projects',
    });

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-5">
        <CardData
          title={dataProjects?.length || 0}
          subTitle="Projects"
          description="Yang Dikerjakan"
        />
        <CardData />
        <CardData title="10x" subTitle="Tidak Hadir" description="Absen" />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <ChartPie />
        <ChartPie />
      </div>

      <DataTable columns={detailColumn()} data={dataWorklog} title="Worklog" />
    </div>
  );
};

export default Detail;

Detail.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
