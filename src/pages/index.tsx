import { DataTable } from '@/components/DataTable';
import { userColumn } from './components/column';
import useHome from './store';
import { useEffect, useState } from 'react';
import Layout from '@/layout';
import { useNavigate } from '@/hooks/useNavigate';
import { AddUser } from './components/addUser';

export default function Home() {
  const { dataUser, getDataUser } = useHome();
  const { navigateWithData } = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    getDataUser();
  }, []);
  return (
    <div className="h-full flex flex-col">
      <DataTable
        columns={userColumn(navigateWithData)}
        data={dataUser}
        addProject
        onAddProject={() => setIsOpenModal(true)}
      />
      <AddUser isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
