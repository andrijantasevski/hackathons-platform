import type { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import DashboardLayout from "@/layouts/DashboardLayout";

const DashboardAcademy: NextPageWithLayout = () => {
  return <div>Academy</div>;
};

DashboardAcademy.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardAcademy;
