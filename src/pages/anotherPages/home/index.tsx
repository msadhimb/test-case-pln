'use client';

import { DataTable } from '@/components/DataTable';
import { useEffect, useState } from 'react';
import Layout from '@/layout';
import { useNavigate } from '@/hooks/useNavigate';
import AddUser from './components/addUser';
import { HashLoader } from 'react-spinners';
import useAlertDialog from '@/components/Alert/store';
import { userColumn } from '@/components/Column/column';
import useHome from '@/hooks/useHome';

export default function Home() {
  const { dataUser, getDataUser, deleteUserData } = useHome();
  const { navigateWithData } = useNavigate();
  const { showAlert } = useAlertDialog();

  const [dataDetail, setDataDetail] = useState<any>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await getDataUser();
    setLoading(false);
  };

  const handleEdit = (data: any) => {
    setDataDetail(data);
    setIsOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    showAlert({
      title: 'Apakah anda yakin?',
      subTitle: 'Anda akan menghapus data ini',
      buttonConfirm: (
        <button
          onClick={async () => {
            await deleteUserData(id);
            await getDataUser();
            useAlertDialog.getState().closeDialog(); // Close the dialog
          }}
          className="px-4 py-2 bg-red-500 text-white rounded border-0"
        >
          Delete
        </button>
      ),
    });
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center ">
        <HashLoader size={100} color="#10375C" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <DataTable
        columns={userColumn(navigateWithData, handleEdit, handleDelete)}
        data={dataUser}
        addProject
        onAddProject={() => setIsOpenModal(true)}
        title="Users Data"
      />
      <AddUser
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
          setDataDetail([]);
        }}
        data={dataDetail}
      />
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
