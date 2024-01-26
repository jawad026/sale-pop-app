import {

  Page,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";


export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page narrowWidth>
      <TitleBar title={t("HomePage.title")} primaryAction={null} />
      <div>
        <h1 className="bg-blue-500 text-orange-400 text-9xl rounded-lg text-center">SalePoP</h1>
        
      </div>
    </Page>
  );
}
s