import CardData from '@/components/CardData';
import { DataTable } from '@/components/DataTable';
import { ChartPie } from '@/components/PieCharts';
import Layout from '@/layout';
import React, { useEffect } from 'react';
import useHome from '../store';
import { detailColumn } from './components/column';

const Detail = () => {
  const { dataWorklog, getWorklog } = useHome();

  useEffect(() => {
    getWorklog();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-5">
        <CardData
          title="10"
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
