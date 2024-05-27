import React from "react";
import PageLayout from "@/layouts/page-layout";
import PropertiesClient from "@/components/properties/properties-client";

interface PropertiesProps {}

const Properties: React.FC<PropertiesProps> = ({}) => {
  return (
    <PageLayout>
      <PropertiesClient />
    </PageLayout>
  );
};

export default Properties;
