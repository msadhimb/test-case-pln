"use client";

import CardData from "@/components/CardData";
import { DataTable } from "@/components/DataTable";
import { ChartPie } from "@/components/PieCharts";
import Layout from "@/layout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "@/hooks/useNavigate";
import AddWorklog from "./components/addWorklog";
import { HashLoader } from "react-spinners";
import useAlertDialog from "@/components/Alert/store";
import { Combobox } from "@/components/ui/combobox";
import { detailColumn } from "@/components/Column/column";
import useDetail from "@/hooks/useDetail";
import useHome from "@/hooks/useHome";

const Detail = () => {
  const { readSecureData } = useNavigate();
  const data = readSecureData("detail");
  const { dataWorklog, getWorklog } = useHome();
  const { showAlert } = useAlertDialog();
  const { deleteWorklogData, getDashboarData, dataDashboard } = useDetail();

  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [monthFilter, setMonthFilter] = useState({
    value:
      new Date().getMonth() + 1 < 10
        ? `0${new Date().getMonth() + 1}`
        : new Date().getMonth() + 1,
    label: new Date().toLocaleString("default", { month: "long" }),
  });

  const getData = async () => {
    setLoading(true);
    await getWorklog({
      user_id: data?.id,
      month: monthFilter.value,
    });

    await getDashboarData({
      user_id: data?.id,
      month: monthFilter.value,
    });

    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    showAlert({
      title: "Apakah anda yakin?",
      subTitle: "Anda akan menghapus data ini",
      buttonConfirm: (
        <button
          onClick={async () => {
            await deleteWorklogData(id);
            await getData();
            useAlertDialog.getState().closeDialog(); // Close the dialog
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      ),
    });
  };

  useEffect(() => {
    getData();
  }, [monthFilter]);

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center ">
        <HashLoader size={100} color="#10375C" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <div className="w-[15rem]">
          <Combobox
            value={monthFilter.value + ""}
            placeholder="Pilih Bulan"
            onChange={(value, label) => {
              setMonthFilter({
                value,
                label,
              } as any);
            }}
            options={
              [
                {
                  value: "01",
                  label: "Januari",
                },
                {
                  value: "02",
                  label: "Februari",
                },
                {
                  value: "03",
                  label: "Maret",
                },
                {
                  value: "04",
                  label: "April",
                },
                {
                  value: "05",
                  label: "Mei",
                },
                {
                  value: "06",
                  label: "Juni",
                },
                {
                  value: "07",
                  label: "Juli",
                },
                {
                  value: "08",
                  label: "Agustus",
                },
                {
                  value: "09",
                  label: "September",
                },
                {
                  value: "10",
                  label: "Oktober",
                },
                {
                  value: "11",
                  label: "November",
                },
                {
                  value: "12",
                  label: "Desember",
                },
              ] as any
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <CardData
          title={(dataDashboard as any)?.totalProjectsWorkedOn || 0}
          subTitle="Projects"
          description="Yang Dikerjakan/Bulan"
        />
        <CardData
          title={(dataDashboard as any)?.totalCompletedProjects || 0}
          subTitle="Project"
          description="Selesai/Bulan"
        />
        <CardData
          title={(dataDashboard as any)?.totalAbsentDays || 0}
          subTitle="Tidak Hadir"
          description="Absen/Bulan"
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <ChartPie
          title="Project Completion (%)"
          subTitle={monthFilter.label}
          data={[
            {
              label: "Complete",
              value: (dataDashboard as any)?.completionRate || 0,
              fill: "#10375C",
            },
            {
              label: "Incomplete",
              value: 100 - (dataDashboard as any)?.completionRate || 0,
              fill: "#F3C623",
            },
          ]}
          desc={`${
            Number((dataDashboard as any)?.completionRate).toFixed(2) || 0
          }% Project Selesai`}
        />
        <ChartPie
          title="Kehadiran (%)"
          subTitle={monthFilter.label}
          data={[
            {
              label: "Hadir",
              value: (dataDashboard as any)?.attendanceRate || 0,
              fill: "#10375C",
            },
            {
              label: "Tidak Hadir",
              value: 100 - (dataDashboard as any)?.attendanceRate || 0,
              fill: "#F3C623",
            },
          ]}
          desc={`${
            (dataDashboard as any)?.totalAbsentDays || 0
          } Hari Tidak Hadir`}
        />
        {/* <ChartPie /> */}
      </div>

      <DataTable
        columns={detailColumn(handleDelete)}
        data={dataWorklog}
        title="Worklog"
        onAddProject={() => setIsOpenModal(true)}
      />
      <AddWorklog
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        refreshData={getData}
        idUser={data?.id}
      />
    </div>
  );
};

export default Detail;

Detail.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
