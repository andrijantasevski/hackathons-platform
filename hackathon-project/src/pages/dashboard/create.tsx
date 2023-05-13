import type { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import DashboardLayout from "@/layouts/DashboardLayout";

const DashboardCreate: NextPageWithLayout = () => {
  return <div>Create</div>;
};

DashboardCreate.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardCreate;
