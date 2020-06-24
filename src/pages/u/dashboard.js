import Head from "~components/Navigation/Head";
import withAuthentication from "~containers/App/withAuthentication";
import { wrapper } from "~store";

const Dashboard = () => (
  <>
    <Head title="Dashboard" url="u/dashboard" />
    <h1>Dashboard</h1>
  </>
);

export const getServerSideProps = wrapper.getServerSideProps(async ctx => ({
  props: {
    ...(await withAuthentication.getServerSideProps(ctx))
  }
}));

export default withAuthentication(Dashboard);
