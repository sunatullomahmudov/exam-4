import { PageTitle } from '../components/Ui';
import { Collections } from '../components/Marketing';
export default function CollectionsPage() {
  return (
    <>
      <PageTitle title="Наши подборки" />
      <Collections all showTitle={false} />
    </>
  );
}
