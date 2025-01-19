import { DataTable } from "@/components/DataTable";
import Layout from "@/layout";
import React, { useEffect, useState } from "react";
import { projectColumn } from "./components/column";
import useHome from "@/pages/store";
import { AddProjects } from "./components/addProjects";
import useProjects from "./store";
import { HashLoader } from "react-spinners";
import useAlertDialog from "@/components/Alert/store";

const Project = () => {
  const { dataProjectOriginal, getProjectOriginal } = useHome();
  const { deleteProjects } = useProjects();
  const { showAlert } = useAlertDialog();

  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataDetail, setDataDetail] = useState<any>([]);

  const getData = async () => {
    setLoading(true);
    await getProjectOriginal();
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    showAlert({
      title: "Apakah anda yakin?",
      subTitle: "Anda akan menghapus data ini",
      buttonConfirm: (
        <button
          onClick={async () => {
            await deleteProjects(id);
            await getProjectOriginal();
            useAlertDialog.getState().closeDialog(); // Close the dialog
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      ),
    });
  };

  const handleEdit = (data: any) => {
    setDataDetail(data);
    setIsOpenModal(true);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center ">
        <HashLoader size={100} color="#3b82f6" />
      </div>
    );
  }

  return (
    <div>
      <DataTable
        columns={projectColumn(handleEdit, handleDelete)}
        data={dataProjectOriginal || []}
        onAddProject={() => {
          setIsOpenModal(true);
          setDataDetail([]);
        }}
        title="Projects"
      />
      <AddProjects
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        data={dataDetail}
      />
    </div>
  );
};

export default Project;

Project.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
