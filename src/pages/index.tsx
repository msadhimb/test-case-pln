import { DataTable } from '@/components/DataTable';
import { userColumn } from './components/column';
import useHome from './store';
import { useEffect } from 'react';
import Layout from '@/layout';
import { useNavigate } from '@/hooks/useNavigate';

export default function Home() {
  const { dataUser, getDataUser } = useHome();
  const { navigateWithData } = useNavigate();

  useEffect(() => {
    getDataUser();
  }, []);
  return (
    <div className="h-full flex flex-col">
      <DataTable columns={userColumn(navigateWithData)} data={dataUser} />
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
