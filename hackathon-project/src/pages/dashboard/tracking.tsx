import type { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import DashboardLayout from "@/layouts/DashboardLayout";

const DashboardTracking: NextPageWithLayout = () => {
  return <div>Tracking</div>;
};

DashboardTracking.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardTracking;
